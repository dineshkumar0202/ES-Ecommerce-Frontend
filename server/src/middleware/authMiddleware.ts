import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/users/UserModel";
import Buyer from "../models/users/BuyerModel";
import Seller from "../models/users/SellerModel";
import Admin from "../models/users/AdminModel";

export interface IAuthRequest extends Request {
    user?: any; // User | Buyer | Seller | Admin
}

const protect = async (req: IAuthRequest, res: Response, next: NextFunction) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "default_secret");

            let user = null;
            if (decoded.role === 'Buyer') {
                user = await Buyer.findById(decoded.id).select("-password");
            } else if (decoded.role === 'Seller') {
                user = await Seller.findById(decoded.id).select("-password");
            } else if (decoded.role === 'Admin') {
                user = await Admin.findById(decoded.id).select("-password");
            } else {
                // Fallback for legacy tokens or undefined roles
                user = await User.findById(decoded.id).select("-password");
                if (!user) user = await Buyer.findById(decoded.id).select("-password");
                if (!user) user = await Seller.findById(decoded.id).select("-password");
                if (!user) user = await Admin.findById(decoded.id).select("-password");
            }

            if (user) {
                req.user = user;
                next();
            } else {
                res.status(401).json({ message: "User not found" });
            }
        } catch (error) {
            // console.error(error);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

const admin = (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.user && req.user.role === "Admin") {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as an admin" });
    }
};

const seller = (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.user && (req.user.role === "Seller" || req.user.role === "Admin")) {
        next();
    } else {
        res.status(401).json({ message: "Not authorized as a seller" });
    }
};

export { protect, admin, seller };

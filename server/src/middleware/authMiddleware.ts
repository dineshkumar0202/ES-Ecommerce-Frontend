import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/users/UserModel";

// I'm using .js imports in TS because I'll likely set "moduleResolution": "NodeNext" 
// or simple commonjs but modern guidelines recommend .js extension in imports for ESM.
// However, since "module": "commonjs" in tsconfig, I can omit extension or use .js if allowImportingTsExtensions is false.
// Let's stick to standard TS imports (no extension) which resolve to .js in output in typical setups,
// But wait, if I use `ts-node`, it might expect extensions if type: module in package.json.
// The package.json has "type": "module". So I MUST append .js extension to imports EVEN in TS source if target is ESM.
// But my tsconfig has "module": "commonjs". This is a conflict. 
// "ts-node" with "type": "module" requires "module": "NodeNext" in tsconfig usually.
// I'll stick to adding .js extensions in imports as it's safer for future ESM migration and current "type": "module".
// But TypeScript compiler might complain if I don't set "moduleResolution": "NodeNext".
// Let's assume standard "import ... from '../models/UserModel';" for now and ts-node handles it or I fix tsconfig.
// Actually, I'll update tsconfig to be more compatible. 

export interface IAuthRequest extends Request {
    user?: IUser;
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

            // We need to cast because finding by ID returns a Document, we know it's IUser
            const user = await User.findById(decoded.id).select("-password");
            if (user) {
                req.user = user as IUser;
                next();
            } else {
                res.status(401).json({ message: "User not found" });
            }
        } catch (error) {
            console.error(error);
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

export { protect, admin };

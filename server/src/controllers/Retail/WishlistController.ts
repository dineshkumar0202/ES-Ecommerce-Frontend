import { Request, Response } from 'express';
import WishlistService from '../../services/retail/WishlistService';

interface IAuthRequest extends Request {
    user?: any;
}

class WishlistController {
    async getWishlist(req: IAuthRequest, res: Response) {
        try {
            const wishlist = await WishlistService.getWishlist(req.user._id as string);
            res.json(wishlist);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async addToWishlist(req: IAuthRequest, res: Response) {
        try {
            if (!req.body.productId) {
                return res.status(400).json({ message: "Product ID is required" });
            }
            const type = req.body.type || 'retail';
            const wishlist = await WishlistService.addToWishlist(req.user._id as string, req.body.productId, type);
            res.json(wishlist);
        } catch (error: any) {
            if (error.message === "Product already in wishlist") {
                // console.log("Info: Product already in wishlist");
                return res.status(409).json({ message: error.message });
            }
            if (error.message === "Product not found") {
                return res.status(404).json({ message: error.message });
            }
            console.error("AddToWishlist Error:", error);
            res.status(500).json({ message: error.message });
        }
    }

    async removeFromWishlist(req: IAuthRequest, res: Response) {
        try {
            const wishlist = await WishlistService.removeFromWishlist(req.user._id as string, req.params.id as string);
            res.json(wishlist);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new WishlistController();

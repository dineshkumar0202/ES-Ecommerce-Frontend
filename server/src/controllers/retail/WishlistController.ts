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
            const wishlist = await WishlistService.addToWishlist(req.user._id as string, req.body.productId);
            res.json(wishlist);
        } catch (error: any) {
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

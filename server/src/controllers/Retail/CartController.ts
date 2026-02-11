import { Request, Response } from 'express';
import CartService from '../../services/retail/CartService';

interface IAuthRequest extends Request {
    user?: any;
}

class CartController {
    async getCart(req: IAuthRequest, res: Response) {
        try {
            const cart = await CartService.getCart(req.user._id as string);
            res.json(cart);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async addToCart(req: IAuthRequest, res: Response) {
        const { productId, quantity, type } = req.body;
        try {
            const cart = await CartService.addToCart(req.user._id as string, productId, quantity, type);
            res.json(cart);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async removeFromCart(req: IAuthRequest, res: Response) {
        try {
            const cart = await CartService.removeFromCart(req.user._id as string, req.params.productId as string);
            res.json(cart);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async updateCartItemQuantity(req: IAuthRequest, res: Response) {
        const { quantity } = req.body;
        try {
            const cart = await CartService.updateCartItemQuantity(req.user._id as string, req.params.productId as string, quantity);
            res.json(cart);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new CartController();

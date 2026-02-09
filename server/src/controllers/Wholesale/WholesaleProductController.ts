import { Request, Response } from 'express';
import WholesaleProductService from '../../services/Wholesale/WholesaleProductService';

class WholesaleProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const products = await WholesaleProductService.getAllWholesaleProducts();
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const product = await WholesaleProductService.getWholesaleProductById(req.params.id as string);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createProduct(req: Request, res: Response) {
        try {
            // Attach authenticated user as seller
            const userId = (req as any).user?._id;
            const productData = { ...req.body, seller: userId };
            const product = await WholesaleProductService.createWholesaleProduct(productData);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateProduct(req: Request, res: Response) {
        try {
            const product = await WholesaleProductService.getWholesaleProductById(req.params.id as string);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            const user = (req as any).user;
            // Provide update access if user is Admin OR user is the seller
            const isSeller = product.seller && (product.seller as any)._id.toString() === user._id.toString();
            if (!isSeller && user.role !== 'Admin') {
                res.status(401).json({ message: "Not authorized to update this product" });
                return;
            }

            const updatedProduct = await WholesaleProductService.updateWholesaleProduct(req.params.id as string, req.body);
            res.json(updatedProduct);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const product = await WholesaleProductService.getWholesaleProductById(req.params.id as string);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            const user = (req as any).user;
            const isSeller = product.seller && (product.seller as any)._id.toString() === user._id.toString();
            if (!isSeller && user.role !== 'Admin') {
                res.status(401).json({ message: "Not authorized to delete this product" });
                return;
            }

            await WholesaleProductService.deleteWholesaleProduct(req.params.id as string);
            res.json({ message: "Product removed" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new WholesaleProductController();

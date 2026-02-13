import { Request, Response } from 'express';
import ResaleProductService from '../../services/Resale/ResaleProductService';

class ResaleProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const products = await ResaleProductService.getAllResaleProducts();
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getMyProducts(req: Request, res: Response) {
        try {
            const userId = (req as any).user?._id;
            const products = await ResaleProductService.getResaleProductsBySeller(userId);
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const product = await ResaleProductService.getResaleProductById(req.params.id as string);
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
            // Assume user ID is attached to req.user by auth middleware
            // But we need to define Request with user property or use any
            const userId = (req as any).user?._id;
            const productData = { ...req.body, seller: userId };

            const product = await ResaleProductService.createResaleProduct(productData);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateProduct(req: Request, res: Response) {
        try {
            const product = await ResaleProductService.getResaleProductById(req.params.id as string);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            const user = (req as any).user;
            if (product.seller && (product.seller as any)._id.toString() !== user._id.toString() && user.role !== 'Admin') {
                res.status(401).json({ message: "Not authorized to update this product" });
                return;
            }

            const updatedProduct = await ResaleProductService.updateResaleProduct(req.params.id as string, req.body);
            res.json(updatedProduct);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const product = await ResaleProductService.getResaleProductById(req.params.id as string);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            const user = (req as any).user;
            if (product.seller && (product.seller as any)._id.toString() !== user._id.toString() && user.role !== 'Admin') {
                res.status(401).json({ message: "Not authorized to delete this product" });
                return;
            }

            await ResaleProductService.deleteResaleProduct(req.params.id as string);
            res.json({ message: "Product removed" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ResaleProductController();

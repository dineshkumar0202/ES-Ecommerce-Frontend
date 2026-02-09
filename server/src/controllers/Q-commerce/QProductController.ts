import { Request, Response } from 'express';
import QProductService from '../../services/q-commerce/QProductService';

class QProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const products = await QProductService.getAllQProducts();
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const product = await QProductService.getQProductById(req.params.id as string);
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
            const product = await QProductService.createQProduct(req.body);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
    async updateProduct(req: Request, res: Response) {
        try {
            const product = await QProductService.updateQProduct(req.params.id as string, req.body);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProduct(req: Request, res: Response) {
        try {
            const product = await QProductService.deleteQProduct(req.params.id as string);
            if (product) {
                res.json({ message: "Product removed" });
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new QProductController();

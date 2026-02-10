import { Request, Response } from 'express';
import { CreateProductDto } from '../../dtos/retail/ProductDto';
import ProductService from '../../services/retail/ProductService';

interface IAuthRequest extends Request {
    user?: any;
}

class ProductController {
    async getProducts(req: Request, res: Response) {
        try {
            const products = await ProductService.getProducts(req.query);
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getCategories(req: Request, res: Response) {
        try {
            const categories = await ProductService.getCategories();
            res.json(categories);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getBrands(req: Request, res: Response) {
        try {
            const brands = await ProductService.getBrands();
            res.json(brands);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getTopRatedProducts(req: Request, res: Response) {
        try {
            const products = await ProductService.getTopRatedProducts();
            res.json(products);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async getProductById(req: Request, res: Response) {
        try {
            const product = await ProductService.getProductById(req.params.id as string);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createProduct(req: IAuthRequest, res: Response) {
        const {
            title,
            description,
            price,
            category,
            images,
            stock,
            seller,
        } = req.body;

        try {
            const productData = {
                ...req.body,
                seller: seller || req.user._id,
                numReviews: 0,
                rating: 0
            };

            const createdProduct = await ProductService.createProduct(productData);
            res.status(201).json(createdProduct);
        } catch (error: any) {
            // console.error("Product Creation Error:", error);
            res.status(400).json({
                message: error.message,
                details: error.errors
            });
        }
    }

    async updateProduct(req: IAuthRequest, res: Response) {
        try {
            const updatedProduct = await ProductService.updateProduct(req.params.id as string, req.user, req.body);
            if (updatedProduct) {
                res.json(updatedProduct);
            } else {
                res.status(404).json({ message: "Product not found or not authorized" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }

    async createProductReview(req: IAuthRequest, res: Response) {
        try {
            const result = await ProductService.createProductReview(req.params.id as string, req.user, req.body);
            if (result) {
                res.status(201).json(result);
            } else {
                res.status(404).json({ message: "Product not found" });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteProduct(req: IAuthRequest, res: Response) {
        try {
            const success = await ProductService.deleteProduct(req.params.id as string, req.user);
            if (success) {
                res.json({ message: "Product removed" });
            } else {
                res.status(404).json({ message: "Product not found or not authorized" });
            }
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
}

export default new ProductController();

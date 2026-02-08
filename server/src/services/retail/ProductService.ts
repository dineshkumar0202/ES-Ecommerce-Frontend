import Product from '../../models/retail/ProductModel';
import { CreateProductDto } from '../../dtos/retail/ProductDto';

class ProductService {
    async getAllProducts() {
        return await Product.find({});
    }

    async getProductById(id: string) {
        return await Product.findById(id);
    }

    async createProduct(productData: CreateProductDto) {
        const product = new Product(productData);
        return await product.save();
    }

    async updateProduct(id: string, userId: string, updateData: any) {
        const product = await Product.findById(id);

        if (product) {
            // Check authorization (only seller or admin) - Assuming 'admin' check is done before or here if user object passed
            // For simplicity, we assume controller checks role or we pass role.
            if (product.seller.toString() !== userId) { // simplistic check
                throw new Error("Not authorized");
            }
            // Update fields
            Object.assign(product, updateData);
            return await product.save();
        }
        return null;
    }

    async deleteProduct(id: string, userId: string) {
        const product = await Product.findById(id);
        if (product) {
            if (product.seller.toString() !== userId) {
                throw new Error("Not authorized");
            }
            await Product.deleteOne({ _id: id });
            return true;
        }
        return false;
    }
}

export default new ProductService();

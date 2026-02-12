import Product from '../../models/retail/ProductModel';
import { CreateProductDto } from '../../dtos/retail/ProductDto';

class ProductService {
    async getProducts(query: any) {
        const {
            keyword,
            category,
            categories, // Multi-select support
            minPrice,
            maxPrice,
            minRating,
            brand,
            brands, // Multi-select support
            seller,
            sortBy = 'createdAt',
            order = 'desc',
            page = 1,
            limit = 12
        } = query;

        let filter: any = {};

        // Keyword search (title or description)
        if (keyword) {
            filter.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } }
            ];
        }

        // Category filter (single or multiple)
        if (category) {
            filter.category = category;
        } else if (categories) {
            const categoryArray = Array.isArray(categories) ? categories : categories.split(',');
            filter.category = { $in: categoryArray };
        }

        // Price range filter
        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = Number(minPrice);
            if (maxPrice) filter.price.$lte = Number(maxPrice);
        }

        // Rating filter
        if (minRating) {
            filter.rating = { $gte: Number(minRating) };
        }

        // Brand filter (single or multiple)
        if (brand) {
            filter.brand = brand;
        } else if (brands) {
            const brandArray = Array.isArray(brands) ? brands : brands.split(',');
            filter.brand = { $in: brandArray };
        }

        if (seller) {
            filter.seller = seller;
        }

        // Sort options
        const sortOptions: any = {};
        const sortOrder = order === 'asc' ? 1 : -1;

        switch (sortBy) {
            case 'price':
                sortOptions.price = sortOrder;
                break;
            case 'rating':
                sortOptions.rating = sortOrder;
                break;
            case 'name':
                sortOptions.title = sortOrder;
                break;
            case 'newest':
                sortOptions.createdAt = -1;
                break;
            default:
                sortOptions.createdAt = sortOrder;
        }

        // Pagination
        const skip = (Number(page) - 1) * Number(limit);
        const total = await Product.countDocuments(filter);

        const products = await Product.find(filter)
            .populate('seller', 'username')
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit));

        return {
            products,
            page: Number(page),
            pages: Math.ceil(total / Number(limit)),
            total,
            hasMore: skip + products.length < total
        };
    }

    async getBrands() {
        return await Product.distinct('brand');
    }

    async getCategories() {
        return await Product.distinct('category');
    }

    async getTopRatedProducts() {
        return await Product.find({}).sort({ rating: -1 }).limit(8);
    }

    async getProductById(id: string) {
        return await Product.findById(id).populate('seller', 'username').populate('reviews.user', 'username');
    }

    async createProduct(productData: CreateProductDto) {
        const product = new Product(productData);
        return await product.save();
    }

    async updateProduct(id: string, user: any, updateData: any) {
        const product = await Product.findById(id);

        if (product) {
            // Check authorization (only seller or admin)
            if (user.role !== 'Admin' && (product.seller && product.seller.toString() !== user._id.toString())) {
                throw new Error("Not authorized");
            }
            // Update fields
            Object.assign(product, updateData);
            return await product.save();
        }
        return null;
    }

    async createProductReview(productId: string, user: any, reviewData: any) {
        const product = await Product.findById(productId);

        if (product) {
            const alreadyReviewed = product.reviews?.find(
                (r: any) => r.user.toString() === user._id.toString()
            );

            if (alreadyReviewed) {
                throw new Error("Product already reviewed");
            }

            const review = {
                name: user.username,
                rating: Number(reviewData.rating),
                comment: reviewData.comment,
                user: user._id,
            };

            product.reviews?.push(review as any);
            product.numReviews = product.reviews?.length || 0;
            product.rating =
                (product.reviews?.reduce((acc: number, item: any) => item.rating + acc, 0) || 0) /
                (product.reviews?.length || 1);

            await product.save();
            return { message: "Review added" };
        } else {
            return null;
        }
    }

    async deleteProduct(id: string, user: any) {
        const product = await Product.findById(id);
        if (product) {
            if (user.role !== 'Admin' && (product.seller && product.seller.toString() !== user._id.toString())) {
                throw new Error("Not authorized");
            }
            await Product.deleteOne({ _id: id });
            return true;
        }
        return false;
    }

    async updateInventory(productId: string, action: 'restock' | 'sale' | 'return' | 'adjustment', quantity: number, userId: string, reason?: string) {
        const product = await Product.findById(productId);
        if (!product) {
            throw new Error('Product not found');
        }

        const previousStock = product.stock;
        let newStock = previousStock;

        switch (action) {
            case 'restock':
            case 'return':
                newStock = previousStock + quantity;
                break;
            case 'sale':
                newStock = previousStock - quantity;
                if (newStock < 0) {
                    throw new Error('Insufficient stock');
                }
                break;
            case 'adjustment':
                newStock = quantity; // Direct adjustment
                break;
        }

        product.stock = newStock;
        product.inventoryHistory = product.inventoryHistory || [];
        product.inventoryHistory.push({
            action,
            quantity,
            previousStock,
            newStock,
            reason,
            performedBy: userId as any,
            createdAt: new Date()
        } as any);

        await product.save();
        return product;
    }

    async getLowStockProducts(threshold?: number) {
        const query: any = {};

        if (threshold) {
            query.stock = { $lte: threshold };
        } else {
            query.$expr = { $lte: ['$stock', '$lowStockThreshold'] };
        }

        return await Product.find(query).populate('seller', 'username');
    }

    async getInventoryHistory(productId: string) {
        const product = await Product.findById(productId).populate('inventoryHistory.performedBy', 'username');
        if (!product) {
            throw new Error('Product not found');
        }
        return product.inventoryHistory || [];
    }
}

export default new ProductService();

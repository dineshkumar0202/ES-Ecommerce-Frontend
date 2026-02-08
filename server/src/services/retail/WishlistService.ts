import Wishlist from '../../models/retail/WishlistModel';
import Product from '../../models/retail/ProductModel';

class WishlistService {
    async getWishlist(userId: string) {
        return await Wishlist.findOne({ user: userId }).populate({
            path: "products",
            select: "title description price image images rating numReviews category",
        });
    }

    async addToWishlist(userId: string, productId: string) {
        let wishlist = await Wishlist.findOne({ user: userId });
        const product = await Product.findById(productId);

        if (!product) throw new Error("Product not found");

        if (!wishlist) {
            wishlist = await Wishlist.create({
                user: userId,
                products: [productId],
            });
        } else {
            const isAlreadyAdded = wishlist.products.find(p => p.toString() === productId);
            if (isAlreadyAdded) throw new Error("Product already in wishlist");

            // @ts-ignore
            wishlist.products.push(productId);
            await wishlist.save();
        }
        return this.getWishlist(userId);
    }

    async removeFromWishlist(userId: string, productId: string) {
        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) throw new Error("Wishlist not found");

        wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
        await wishlist.save();
        return this.getWishlist(userId);
    }
}

export default new WishlistService();

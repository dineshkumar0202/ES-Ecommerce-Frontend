import Wishlist from '../../models/retail/WishlistModel';
import Product from '../../models/retail/ProductModel';

class WishlistService {
    async getWishlist(userId: string) {
        const wishlist = await Wishlist.findOne({ user: userId })
            .populate({ path: "products", select: "title description price image images rating numReviews category" })
            .populate({ path: "wholesaleProducts", select: "title description packSize pricePerUnit images location" })
            .populate({ path: "qCommerceProducts", select: "title brand price mrp image images category" })
            .populate({ path: "resaleProducts", select: "title price condition location image images description sellerName" })
            .populate({ path: "freelancePosts", select: "title description price currency status image nameDisplay unit location" });

        if (!wishlist) return { products: [] };

        // Normalize data for frontend consumption
        const retail = (wishlist.products || []).map((p: any) => ({ ...p.toObject(), type: 'retail' }));
        const wholesale = (wishlist.wholesaleProducts as any[] || []).map((p: any) => ({ ...p.toObject(), type: 'wholesale', price: p.pricePerUnit }));
        const qCommerce = (wishlist.qCommerceProducts as any[] || []).map((p: any) => ({ ...p.toObject(), type: 'q-commerce' }));
        const resale = (wishlist.resaleProducts as any[] || []).map((p: any) => ({ ...p.toObject(), type: 'resale' }));
        const freelance = (wishlist.freelancePosts as any[] || []).map((p: any) => ({ ...p.toObject(), type: 'freelance' }));

        const allProducts = [...retail, ...wholesale, ...qCommerce, ...resale, ...freelance];
        // Sort by added order if possible, or mixed
        // Since we don't have individual timestamps for items in separate arrays easily without complex schema, we return mixed.

        return { products: allProducts };
    }

    async addToWishlist(userId: string, productId: string, type: 'retail' | 'wholesale' | 'q-commerce' | 'resale' | 'freelance' = 'retail') {
        let wishlist = await Wishlist.findOne({ user: userId });

        // Find if product exists in respective collection to validate ID // Optional optimization

        if (!wishlist) {
            wishlist = new Wishlist({ user: userId });
        }

        const addToList = (list: any[], id: string) => {
            if (!list.find(p => p.toString() === id)) {
                list.push(id);
                return true;
            }
            return false;
        };

        let added = false;
        if (type === 'retail') added = addToList(wishlist.products, productId);
        else if (type === 'wholesale') {
            if (!wishlist.wholesaleProducts) wishlist.wholesaleProducts = [];
            added = addToList(wishlist.wholesaleProducts, productId);
        }
        else if (type === 'q-commerce') {
            if (!wishlist.qCommerceProducts) wishlist.qCommerceProducts = [];
            added = addToList(wishlist.qCommerceProducts, productId);
        }
        else if (type === 'resale') {
            if (!wishlist.resaleProducts) wishlist.resaleProducts = [];
            added = addToList(wishlist.resaleProducts, productId);
        }
        else if (type === 'freelance') {
            if (!wishlist.freelancePosts) wishlist.freelancePosts = [];
            added = addToList(wishlist.freelancePosts, productId);
        }

        if (added) {
            await wishlist.save();
        } else {
            // If already exists, we just return the current state without error (Idempotent)
            // console.log("Product already in wishlist, skipping add.");
        }

        return this.getWishlist(userId);
    }

    async removeFromWishlist(userId: string, productId: string) {
        let wishlist = await Wishlist.findOne({ user: userId });
        if (!wishlist) throw new Error("Wishlist not found");

        // Try to remove from all lists as we might not know the type from the call
        let modified = false;

        const remove = (list: any[]) => {
            const initialLen = list.length;
            const newList = list.filter(p => p.toString() !== productId);
            if (newList.length !== initialLen) {
                modified = true;
                return newList;
            }
            return list;
        };

        wishlist.products = remove(wishlist.products);
        if (wishlist.wholesaleProducts) wishlist.wholesaleProducts = remove(wishlist.wholesaleProducts);
        if (wishlist.qCommerceProducts) wishlist.qCommerceProducts = remove(wishlist.qCommerceProducts);
        if (wishlist.resaleProducts) wishlist.resaleProducts = remove(wishlist.resaleProducts);
        if (wishlist.freelancePosts) wishlist.freelancePosts = remove(wishlist.freelancePosts);

        if (modified) await wishlist.save();

        return this.getWishlist(userId);
    }
}

export default new WishlistService();

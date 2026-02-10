import Cart from '../../models/retail/CartModel';
import Product from '../../models/retail/ProductModel';
import WholesaleProduct from '../../models/Wholesale/WholesaleProductModel';
import QProduct from '../../models/q-commerce/QProductModel';

class CartService {
    private getModel(type: string) {
        switch (type) {
            case 'Wholesale':
            case 'WholesaleProduct':
                return WholesaleProduct;
            case 'Quick':
            case 'QProduct':
                return QProduct;
            default:
                return Product;
        }
    }

    private getModelName(type: string) {
        switch (type) {
            case 'Wholesale':
            case 'WholesaleProduct':
                return 'WholesaleProduct';
            case 'Quick':
            case 'QProduct':
                return 'QProduct';
            default:
                return 'Product';
        }
    }

    async getCart(userId: string) {
        return await Cart.findOne({ user: userId }).populate({
            path: 'cartItems.product',
            select: 'name title price pricePerUnit image images thumbnail'
        });
    }

    async addToCart(userId: string, productId: string, quantity: number, productType: string = 'Retail') {
        let cart = await Cart.findOne({ user: userId });
        const Model = this.getModel(productType) as any;
        const product = await Model.findById(productId);

        if (!product) throw new Error("Product not found");

        const qty = Number(quantity);
        const modelName = this.getModelName(productType);

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                cartItems: [{ product: productId, productModel: modelName, quantity: qty }],
                totalPrice: (product.price || product.pricePerUnit || 0) * qty
            });
        } else {
            const itemIndex = cart.cartItems.findIndex(p =>
                p.product.toString() === productId && p.productModel === modelName
            );

            if (itemIndex > -1) {
                cart.cartItems[itemIndex].quantity += qty;
            } else {
                // @ts-ignore
                cart.cartItems.push({ product: productId, productModel: modelName, quantity: qty });
            }
            await this.recalculateTotal(cart);
            await cart.save();
        }
        return this.getCart(userId);
    }

    async removeFromCart(userId: string, productId: string) {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) throw new Error("Cart not found");

        cart.cartItems = cart.cartItems.filter(p => p.product.toString() !== productId);
        await this.recalculateTotal(cart);
        await cart.save();
        return this.getCart(userId);
    }

    async updateCartItemQuantity(userId: string, productId: string, quantity: number) {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) throw new Error("Cart not found");

        const itemIndex = cart.cartItems.findIndex(p => p.product.toString() === productId);
        if (itemIndex > -1) {
            cart.cartItems[itemIndex].quantity = Number(quantity);
            await this.recalculateTotal(cart);
            await cart.save();
        } else {
            throw new Error("Item not in cart");
        }
        return this.getCart(userId);
    }

    private async recalculateTotal(cart: any) {
        let total = 0;
        for (const item of cart.cartItems) {
            const Model = this.getModel(item.productModel) as any;
            const product = await Model.findById(item.product);
            if (product) {
                const price = product.price || product.pricePerUnit || 0;
                total += price * item.quantity;
            }
        }
        cart.totalPrice = total;
    }
}

export default new CartService();

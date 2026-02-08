import Cart from '../../models/retail/CartModel';
import Product from '../../models/retail/ProductModel';

class CartService {
    async getCart(userId: string) {
        return await Cart.findOne({ user: userId }).populate({
            path: 'cartItems.product',
            select: 'name title price image images thumbnail'
        });
    }

    async addToCart(userId: string, productId: string, quantity: number) {
        let cart = await Cart.findOne({ user: userId });
        const product = await Product.findById(productId);

        if (!product) throw new Error("Product not found");

        const qty = Number(quantity);

        if (!cart) {
            cart = await Cart.create({
                user: userId,
                cartItems: [{ product: productId, quantity: qty }],
                totalPrice: product.price * qty
            });
        } else {
            const itemIndex = cart.cartItems.findIndex(p => p.product.toString() === productId);

            if (itemIndex > -1) {
                cart.cartItems[itemIndex].quantity += qty;
            } else {
                // @ts-ignore
                cart.cartItems.push({ product: productId, quantity: qty });
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
            const product = await Product.findById(item.product);
            if (product) {
                total += product.price * item.quantity;
            }
        }
        cart.totalPrice = total;
    }
}

export default new CartService();

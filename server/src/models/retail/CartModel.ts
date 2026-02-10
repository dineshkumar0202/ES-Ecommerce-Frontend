import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICart extends Document {
    user: mongoose.Types.ObjectId;
    cartItems: {
        product: mongoose.Types.ObjectId;
        productModel: 'Product' | 'WholesaleProduct' | 'QProduct';
        quantity: number;
    }[];
    totalPrice: number;
    updatedAt: Date;
}

const cartSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
        required: true,
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                refPath: 'cartItems.productModel',
                required: true,
            },
            productModel: {
                type: String,
                required: true,
                enum: ['Product', 'WholesaleProduct', 'QProduct'],
                default: 'Product'
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

const Cart = mongoose.model<ICart>('Cart', cartSchema);

export default Cart;

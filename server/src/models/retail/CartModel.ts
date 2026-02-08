import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ICart extends Document {
    user: mongoose.Types.ObjectId;
    cartItems: {
        product: mongoose.Types.ObjectId;
        quantity: number;
    }[];
    totalPrice: number;
    updatedAt: Date;
}

const cartSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    cartItems: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
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

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IWishlist extends Document {
    user: mongoose.Types.ObjectId;
    products: mongoose.Types.ObjectId[];
    wholesaleProducts: mongoose.Types.ObjectId[];
    qCommerceProducts: mongoose.Types.ObjectId[];
    resaleProducts: mongoose.Types.ObjectId[];
    freelancePosts: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const wishlistSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Buyer",
        required: true,
        unique: true, // One wishlist per user
    },
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
        },
    ],
    wholesaleProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "WholesaleProduct",
        },
    ],
    qCommerceProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "QProduct",
        },
    ],
    resaleProducts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ResaleProduct",
        },
    ],
    freelancePosts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Wishlist = mongoose.model<IWishlist>('Wishlist', wishlistSchema);

export default Wishlist;

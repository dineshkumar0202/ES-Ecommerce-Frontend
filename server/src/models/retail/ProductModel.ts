import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    description: string;
    price: number;
    discountPrice?: number;
    category: string;
    subCategory?: string;
    images: string[];
    thumbnail?: string;
    stock: number;
    seller: mongoose.Types.ObjectId;
    rating: number;
    numReviews: number;
    reviews?: {
        user: mongoose.Types.ObjectId;
        name: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }[];
    createdAt: Date;
}

const productSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPrice: Number,
    category: {
        type: String,
        required: true,
    },
    subCategory: String,
    images: [String],
    thumbnail: String,
    stock: {
        type: Number,
        default: 0,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    numReviews: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            name: String,
            rating: Number,
            comment: String,
            createdAt: {
                type: Date,
                default: Date.now,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;

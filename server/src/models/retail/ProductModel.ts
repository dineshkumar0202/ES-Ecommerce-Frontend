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
    lowStockThreshold?: number;
    sku?: string;
    brand?: string;
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
    inventoryHistory?: {
        action: 'restock' | 'sale' | 'return' | 'adjustment';
        quantity: number;
        previousStock: number;
        newStock: number;
        reason?: string;
        performedBy?: mongoose.Types.ObjectId;
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
    lowStockThreshold: {
        type: Number,
        default: 10,
    },
    sku: {
        type: String,
        unique: true,
        sparse: true,
    },
    brand: String,
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
    inventoryHistory: [
        {
            action: {
                type: String,
                enum: ['restock', 'sale', 'return', 'adjustment'],
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
            previousStock: Number,
            newStock: Number,
            reason: String,
            performedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
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

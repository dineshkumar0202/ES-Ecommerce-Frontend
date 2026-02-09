import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IPost extends Document {
    title: string;
    description: string;
    price?: number;
    currency: string;
    status: string;
    tagColor: string;
    tagTextColor: string;
    views: string;
    time: string;
    image?: string;
    nameDisplay?: string;
    unit: string;
    contact?: string;
    email?: string;
    requirements?: string;
    location?: string;
    createdAt: Date;
    user: mongoose.Types.ObjectId;
}

const postSchema: Schema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false // Optional for older posts, but new ones should have it
    },
    title: {
        type: String, // Product Name
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: {
        type: String,
        required: false,
    },
    contact: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    price: Number,
    currency: {
        type: String,
        default: "$",
    },
    status: {
        type: String,
        default: "NEW", // or "ACTIVE"
    },
    tagColor: {
        type: String,
        default: "#3b82f6",
    },
    tagTextColor: {
        type: String,
        default: "white",
    },
    views: {
        type: String,
        default: "0 views",
    },
    time: {
        type: String,
        default: "Just now",
    },
    image: String,
    nameDisplay: String, // User Name
    unit: {
        type: String,
        default: "/hr", // default unit
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model<IPost>('Post', postSchema);

export default Post;

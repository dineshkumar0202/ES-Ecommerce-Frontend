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
    createdAt: Date;
}

const postSchema: Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
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
    nameDisplay: String, // Freelancer Name
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

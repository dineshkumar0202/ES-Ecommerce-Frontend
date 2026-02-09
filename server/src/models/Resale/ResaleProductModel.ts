import mongoose, { Document, Schema } from 'mongoose';

export interface IResaleProduct extends Document {
    title: string;
    price: number;
    condition: string;
    location: string;
    image: string;
    images: string[];
    description: string;
    seller: mongoose.Types.ObjectId; // Reference to User
    sellerName: string; // Redundant but useful for display if user fetch is skipped
    mobile: string;
    tagColor: string;
    createdAt: Date;
}

const ResaleProductSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    condition: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sellerName: { type: String },
    mobile: { type: String },
    tagColor: { type: String, default: '#bef264' },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IResaleProduct>('ResaleProduct', ResaleProductSchema);

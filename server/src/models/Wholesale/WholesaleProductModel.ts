import mongoose, { Document, Schema } from 'mongoose';

export interface IWholesaleProduct extends Document {
    title: string;
    description: string;
    sku: string;
    packSize: number;
    pricePerUnit: number;
    phoneNumber: string;
    email: string;
    location: string;
    companyName: string;
    rating: number;
    images: string[];
    inStock: boolean;
    seller: mongoose.Types.ObjectId;
    createdAt: Date;
}

const WholesaleProductSchema: Schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    sku: { type: String, required: true },
    packSize: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
    phoneNumber: { type: String },
    email: { type: String },
    location: { type: String },
    companyName: { type: String },
    rating: { type: Number, default: 0 },
    images: [{ type: String }],
    inStock: { type: Boolean, default: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optional for now if B2B has different auth
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IWholesaleProduct>('WholesaleProduct', WholesaleProductSchema);

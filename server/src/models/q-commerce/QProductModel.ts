import mongoose, { Document, Schema } from 'mongoose';

export interface IQProduct extends Document {
    name: string;
    brand: string;
    price: number;
    mrp: number;
    image: string;
    discount: number;
    category: string;
    createdAt: Date;
}

const QProductSchema: Schema = new mongoose.Schema({
    name: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    image: { type: String, required: true },
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IQProduct>('QProduct', QProductSchema);

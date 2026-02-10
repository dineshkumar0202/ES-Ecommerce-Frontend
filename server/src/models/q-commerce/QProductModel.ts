import mongoose, { Document, Schema } from 'mongoose';

export interface IQProduct extends Document {
    name?: string;
    title: string;
    brand: string;
    price: number;
    mrp: number;
    image: string;
    images: string[];
    description?: string;
    discount: number;
    category: string;
    stock: number;
    unit?: string;
    createdAt: Date;
}

const QProductSchema: Schema = new mongoose.Schema({
    name: { type: String }, // Legacy field
    title: { type: String, required: true },
    brand: { type: String, required: true },
    price: { type: Number, required: true },
    mrp: { type: Number, required: true },
    image: { type: String, required: true },
    images: [{ type: String }],
    discount: { type: Number, default: 0 },
    category: { type: String, required: true },
    stock: { type: Number, default: 0 },
    unit: { type: String },
    description: { type: String },
    createdAt: { type: Date, default: Date.now }
});

// Pre-save hook to sync name with title for legacy support
QProductSchema.pre('save', function (next) {
    if (!this.name && this.title) {
        this.name = this.title;
    }
    next();
});

export default mongoose.model<IQProduct>('QProduct', QProductSchema);

import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IBuyer extends Document {
    username: string;
    email?: string;
    mobile: string;
    password?: string;
    role: 'Buyer';
    googleId?: string;
    isVerified?: boolean;
    profile: {
        name?: string;
        avatar?: string;
        phone?: string;
        location?: string;
    };
    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

interface BuyerModelInterface extends Model<IBuyer> { }

const buyerSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true,
    },
    mobile: {
        type: String,
        required: false, // Optional for Google OAuth users
        unique: true,
        sparse: true,
    },
    password: {
        type: String,
        required: false, // Optional for Google OAuth users
    },
    role: {
        type: String,
        default: 'Buyer',
        immutable: true, // Force role to be Buyer
    },
    googleId: {
        type: String,
        unique: true,
        sparse: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    profile: {
        name: String,
        avatar: String,
        phone: String,
        location: String,
        paymentMethod: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

buyerSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    if (!this.password) return false;
    return await bcrypt.compare(enteredPassword, this.password);
};

buyerSchema.pre<IBuyer>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    // Google OAuth buyers may not have a password set
    if (!this.password) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
    next();
});

const Buyer = mongoose.model<IBuyer, BuyerModelInterface>('Buyer', buyerSchema);

export default Buyer;

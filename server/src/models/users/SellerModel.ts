import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface ISeller extends Document {
    username: string;
    email?: string;
    mobile: string;
    password?: string;
    uniqueId?: string;
    role: 'Seller';
    profile: {
        name?: string;
        avatar?: string;
        bio?: string;
        phone?: string;
        location?: string;
        address?: string;
    };
    businessDetails?: {
        businessName?: string;
        gst?: string;
        idProof?: string;
    };
    bankDetails?: {
        accountNumber?: string;
        ifsc?: string;
        bankName?: string;
    };
    isVerified: boolean;
    freelancer?: {
        isRegistered?: boolean;
        status?: 'Pending' | 'Approved' | 'Rejected';
        panNumber?: string;
        panFile?: string;
        freelancerId?: string;
        freelancerIdFile?: string;
        category?: string;
        portfolio?: string;
        taskLink?: string;
        taskFile?: string;
        taskDescription?: string;
        answers?: string[];
        rejectionReason?: string;
        timeline?: string;
        categoryType?: string;
        question?: string;
        extraImages?: string[];
    };
    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

interface SellerModelInterface extends Model<ISeller> { }

const sellerSchema: Schema = new mongoose.Schema({
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
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    uniqueId: {
        type: String,
        unique: true,
        sparse: true,
    },
    role: {
        type: String,
        default: 'Seller',
        immutable: true,
    },
    profile: {
        name: String,
        avatar: String,
        bio: String,
        phone: String,
        location: String,
        address: String,
    },
    businessDetails: {
        businessName: String,
        gst: String,
        idProof: String,
    },
    bankDetails: {
        accountNumber: String,
        ifsc: String,
        bankName: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    freelancer: {
        isRegistered: { type: Boolean, default: false },
        status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
        panNumber: String,
        panFile: String,
        freelancerId: String,
        freelancerIdFile: String,
        category: String,
        portfolio: String,
        taskLink: String,
        taskFile: String,
        taskDescription: String,
        answers: [String],
        rejectionReason: String,
        timeline: String,
        categoryType: String,
        question: String,
        extraImages: [String]
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

sellerSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    if (!enteredPassword || !this.password) return false;
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.error('Password comparison error:', error);
        return false;
    }
};

sellerSchema.pre<ISeller>('save', async function (next) {
    if (!this.isModified('password') || !this.password) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

const Seller = mongoose.model<ISeller, SellerModelInterface>('Seller', sellerSchema);

export default Seller;

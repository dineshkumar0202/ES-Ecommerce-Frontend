import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string; // Used as Name based on prompt
    email?: string;
    mobile: string;
    password?: string;
    role: 'Buyer' | 'Seller' | 'Admin';
    profile: {
        name?: string;
        avatar?: string;
        bio?: string;
        phone?: string;
        location?: string;
    };
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
        answers?: string[];
        rejectionReason?: string;
    };
    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

// Add method to Schema
interface UserModelInterface extends Model<IUser> { }

const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String, // This will serve as "Name"
        required: true,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        sparse: true, // Allow multiple nulls if email is not provided
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
    role: {
        type: String,
        enum: ['Buyer', 'Seller', 'Admin'],
        default: 'Buyer',
    },
    profile: {
        name: String,
        avatar: String,
        bio: String,
        phone: String,
        location: String,
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
        answers: [String],
        rejectionReason: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    if (!enteredPassword || !this.password) return false;
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.error('Password comparison error:', error);
        return false;
    }
};

userSchema.pre<IUser>('save', async function (next) {
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

const User = mongoose.model<IUser, UserModelInterface>('User', userSchema);

export default User;

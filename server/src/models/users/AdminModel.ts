import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IAdmin extends Document {
    username: string;
    email: string;
    password?: string;
    role: 'Admin';
    profile: {
        name?: string;
        avatar?: string;
    };
    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

interface AdminModelInterface extends Model<IAdmin> { }

const adminSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
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
        default: 'Admin',
        immutable: true,
    },
    profile: {
        name: String,
        avatar: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

adminSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    if (!enteredPassword || !this.password) return false;
    try {
        return await bcrypt.compare(enteredPassword, this.password);
    } catch (error) {
        console.error('Password comparison error:', error);
        return false;
    }
};

adminSchema.pre<IAdmin>('save', async function (next) {
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

const Admin = mongoose.model<IAdmin, AdminModelInterface>('Admin', adminSchema);

export default Admin;

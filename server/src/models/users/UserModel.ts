import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    username: string;
    email: string;
    password?: string;
    role: string;
    profile: {
        name?: string;
        avatar?: string;
        bio?: string;
        phone?: string;
        location?: string;
    };
    createdAt: Date;
    matchPassword(enteredPassword: string): Promise<boolean>;
}

// Add method to Schema
interface UserModelInterface extends Model<IUser> { }

const userSchema: Schema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
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
        default: 'user', // 'user', 'admin', 'freelancer'
    },
    profile: {
        name: String,
        avatar: String,
        bio: String,
        phone: String,
        location: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

userSchema.methods.matchPassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password as string, salt);
    next();
});

const User = mongoose.model<IUser, UserModelInterface>('User', userSchema);

export default User;

import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IOtp extends Document {
    identifier: string; // Mobile or Email
    otp: string;
    expiresAt: Date;
    verified: boolean;
    createdAt: Date;
}

const otpSchema: Schema = new mongoose.Schema({
    identifier: {
        type: String,
        required: true,
        index: true,
    },
    otp: {
        type: String,
        required: true,
    },
    expiresAt: {
        type: Date,
        required: true,
        expires: 0, // MongoDB will automatically delete documents after this time
    },
    verified: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Otp = mongoose.model<IOtp>('Otp', otpSchema);

export default Otp;

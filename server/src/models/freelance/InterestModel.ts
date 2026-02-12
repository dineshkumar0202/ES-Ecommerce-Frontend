import mongoose, { Document, Schema } from 'mongoose';

export interface IFreelanceInterest extends Document {
    post: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    details?: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    createdAt: Date;
}

const interestSchema: Schema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    proposedPrice: {
        type: Number,
        default: 0
    },
    estimatedDuration: {
        type: String,
        default: ''
    },
    details: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const FreelanceInterest = mongoose.model<IFreelanceInterest>('FreelanceInterest', interestSchema);
export default FreelanceInterest;

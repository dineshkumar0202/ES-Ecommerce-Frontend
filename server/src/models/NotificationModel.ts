import mongoose, { Document, Schema } from 'mongoose';

export interface INotification extends Document {
    user: mongoose.Types.ObjectId;
    type: string;
    message: string;
    orderId?: mongoose.Types.ObjectId;
    isRead: boolean;
    createdAt: Date;
}

const notificationSchema: Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        type: {
            type: String,
            required: true,
        },
        message: {
            type: String,
            required: true,
        },
        orderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order",
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

const Notification = mongoose.model<INotification>('Notification', notificationSchema);

export default Notification;

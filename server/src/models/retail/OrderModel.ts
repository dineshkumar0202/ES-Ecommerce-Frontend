import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IOrder extends Document {
    user: mongoose.Types.ObjectId;
    orderItems: {
        title: string;
        quantity: number;
        image: string;
        price: number;
        product: mongoose.Types.ObjectId;
    }[];
    shippingAddress: {
        address: string;
        city: string;
        postalCode: string;
        country: string;
    };
    paymentMethod: string;
    paymentResult?: {
        id: string;
        status: string;
        update_time: string;
        email_address: string;
    };
    itemsPrice: number;
    taxPrice: number;
    shippingPrice: number;
    totalPrice: number;
    isPaid: boolean;
    paidAt?: Date;
    isDelivered: boolean;
    deliveredAt?: Date;
    status: 'Ordered' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema: Schema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Buyer",
        },
        orderItems: [
            {
                title: { type: String, required: true },
                quantity: { type: Number, required: true },
                image: { type: String, required: true },
                price: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                    ref: "Product",
                },
            },
        ],
        shippingAddress: {
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentMethod: {
            type: String,
            required: true,
        },
        paymentResult: {
            id: { type: String },
            status: { type: String },
            update_time: { type: String },
            email_address: { type: String },
        },
        itemsPrice: {
            type: Number,
            default: 0.0,
        },
        taxPrice: {
            type: Number,
            default: 0.0,
        },
        shippingPrice: {
            type: Number,
            default: 0.0,
        },
        totalPrice: {
            type: Number,
            default: 0.0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        paidAt: {
            type: Date,
        },
        isDelivered: {
            type: Boolean,
            required: true,
            default: false,
        },
        deliveredAt: {
            type: Date,
        },
        status: {
            type: String,
            required: true,
            enum: ['Ordered', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'],
            default: 'Ordered',
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model<IOrder>('Order', orderSchema);

export default Order;

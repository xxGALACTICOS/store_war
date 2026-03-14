import mongoose, { Schema, model } from 'mongoose';
import { Order } from '../../models/order.model';

export const orderSchema = new Schema<Order>({
    userId: {
        type: String,
        required: true,
    },
    products: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Product',
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        required: true,
        default: Date.now,
    },
});

export const OrderModel = mongoose.models.Order || model<Order>('Order', orderSchema);

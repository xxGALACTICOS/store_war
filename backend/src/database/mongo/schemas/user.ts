import mongoose, { Schema, model } from 'mongoose';
import { User } from '../../models/user.model';

export const userSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
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
export const UserModel = mongoose.models.User || model<User>('User', userSchema);

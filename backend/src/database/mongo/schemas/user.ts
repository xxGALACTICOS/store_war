import { Schema, model } from 'mongoose';
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
    address: {
        type: String,
        required: true,
    },
});
export const UserSchema = model<User>('User', userSchema);

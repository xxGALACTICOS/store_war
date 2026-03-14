import mongoose from "mongoose";

export interface User {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    password: string;
    email: string;
    phone: string;
    orders: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

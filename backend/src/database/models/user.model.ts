import mongoose from "mongoose";

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    address: string;
    orders: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

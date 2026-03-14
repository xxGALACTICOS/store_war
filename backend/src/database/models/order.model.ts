import mongoose from "mongoose";

export interface Order {
    userId: string;
    products: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

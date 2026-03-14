import mongoose from "mongoose";

export interface Order {
    userId: string;
    companyIds: string[];
    products: mongoose.Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

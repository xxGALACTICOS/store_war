import mongoose from "mongoose";

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    sold: number;
    category: string;
    companyId: mongoose.Schema.Types.ObjectId;
    pictures: string[];
    createdAt: Date;
    updatedAt: Date;
}

import mongoose from "mongoose";

export interface Product {
    _id: string;
    name: string;
    description: string;
    rate: number;
    voters: number;
    price: number;
    stock: number;
    sold: number;
    category: string;       
    subCategory: string;
    companyId: mongoose.Schema.Types.ObjectId;
    coverPoster: string;
    sidePosters: string[];
    createdAt: Date;
    updatedAt: Date;
}

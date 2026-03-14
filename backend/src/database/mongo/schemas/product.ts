import mongoose, { Schema, model } from 'mongoose';
import { Product } from '../../models/product.model';

export const productSchema = new Schema<Product>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        
    },
    category: {
        type: String,
        required: true,
    },
    subCategory: {
        type: String,
        required: true,
    },
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    coverPoster: {
        type: String,
        required: true,
    },
    sidePosters: {
        type: [String],
    },
    rate: {
        type: Number,
        required: true, 
    },
    voters: {
        type: Number,
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

export const ProductModel = mongoose.models.Product || model<Product>('Product', productSchema);

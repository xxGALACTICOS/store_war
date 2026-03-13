import mongoose, { Schema, model } from 'mongoose';
import { Company } from '../../models/company.model';

export const companySchema = new Schema<Company>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
        required: true,
    },
    specializations: {
        type: [String],
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

export const CompanyModel = mongoose.models.Company || model<Company>('Company', companySchema);

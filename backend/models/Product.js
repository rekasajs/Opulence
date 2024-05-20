import { Decimal128 } from 'mongodb';
import { Schema, model } from 'mongoose';

const Product = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    type: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        required: true,
    },
    grade: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    isAvailable: {
        type: String,
        required: true,
    },
    insertion: {
        type: String,
        required: true,
    },
    weight: {
        type: Decimal128,
        required: true,
    },
    for: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    imageURL: {
        type: String,
    },
});

export default model('Product', Product);

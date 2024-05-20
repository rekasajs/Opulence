import { Schema, model } from 'mongoose';

const Favorites = new Schema({
    user: {
        type: String,
        required: true,
        ref: 'User',
    },
    products: [
        {
            type: String,
            required: true,
            ref: 'Products',
        },
    ],
});

export default model('Favorites', Favorites);

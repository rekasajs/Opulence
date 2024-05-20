import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoute from './routes/auth.js';
import productsRoute from './routes/products.js';
import favoritesRoute from './routes/favoritesRoute.js';

const app = express();
dotenv.config();

//Константы
const PORT = process.env.PORT || 3001;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const CONNECT_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@jewelrycluster.y139bgl.mongodb.net/${DB_NAME}?retryWrites=true&w=majority&appName=JewelryCluster`;

//Зависимости
app.use(cors(), express.json());
app.use('/app/auth', authRoute);
app.use('/app/products', productsRoute);
app.use('/app/favorites', favoritesRoute);

async function start() {
    try {
        await mongoose.connect(CONNECT_URL);

        app.listen(PORT, (error) => (error ? console.log(`Error: ${error}`) : console.log(`Server started on port: ${PORT}`)));
    } catch (error) {
        console.log(`Ошибка ${error}`);
    }
}

start();

import Product from '../models/Product.js';

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        if (!products) {
            return res.json({ message: 'Товаров нет' });
        }

        return res.json({ products, message: 'Товары успешно получены!' });
    } catch (error) {
        console.log(error);
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, material, price, isAvailable, color, insertion, length, weight, sex } = req.body;

        const newProduct = new Product({
            name,
            material,
            price,
            isAvailable,
            color,
            insertion,
            length,
            weight,
            sex,
        });

        await newProduct.save();

        return res.json({
            newProduct,
            message: 'Товар успешно добавлен!',
        });
    } catch (error) {
        console.log(error);
    }
};

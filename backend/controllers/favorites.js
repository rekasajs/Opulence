import Product from '../models/Product.js';
import Favorites from '../models/Favorites.js';

export const getFavorites = async (req, res) => {
    try {
        const userId = req.userId;

        let favorites = await Favorites.findOne({ user: userId });

        if (!favorites) {
            return res.json({ message: 'Вы еще не добавили товары в "Любимые"' });
        }
        console.log(favorites);
        res.json({ message: 'Товары успешно получены', favorites });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

export const addFavorites = async (req, res) => {
    try {
        const { favoriteId } = req.body;
        const userId = req.userId;

        const product = await Product.findById(favoriteId);
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        let favorites = await Favorites.findOne({ user: userId });
        if (!favorites) {
            favorites = new Favorites({
                user: userId,
                products: [favoriteId],
            });
        } else {
            if (favorites.products.includes(favoriteId)) {
                return res.json({ message: 'Товар уже добавлен в "Любимые"', favorites });
            }

            favorites.products.push(favoriteId);
        }

        await favorites.save();

        res.json({ message: 'Товар добавлен в "Любимые"', favorites });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

export const removeFavorite = async (req, res) => {
    try {
        const { favoriteId } = req.body;
        const userId = req.userId;

        const product = await Product.findById(favoriteId);
        if (!product) {
            return res.status(404).json({ message: 'Товар не найден' });
        }

        const favorites = await Favorites.findOne({ user: userId });
        if (!favorites) {
            return res.status(404).json({ message: 'Нет "Любимых" для этого пользователя' });
        }

        const productIndex = favorites.products.indexOf(favoriteId);
        if (productIndex === -1) {
            return res.status(400).json({ message: 'Товар не найден в "Любимых"' });
        }

        favorites.products.splice(productIndex, 1);
        await favorites.save();

        res.json({ message: 'Товар удален из "Любимых"', favorites });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
};

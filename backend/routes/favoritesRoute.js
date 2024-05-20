import { Router } from 'express';
import { addFavorites, removeFavorite, getFavorites } from '../controllers/favorites.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

router.get('/', checkAuth, getFavorites);
router.post('/add', checkAuth, addFavorites);
router.post('/remove', checkAuth, removeFavorite);

export default router;

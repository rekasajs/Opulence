import { Router } from 'express';
import { register, login, getMe } from '../controllers/auth.js';
import { checkAuth } from '../utils/checkAuth.js';
import { check } from 'express-validator';

const router = new Router();

//Регистрация
router.post('/register', register);

//Авторизация
router.post('/login', login);

//Профиль
router.get('/me', checkAuth, getMe);

export default router;

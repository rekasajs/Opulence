import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import Role from '../models/Role.js';

export const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role,
    };
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

//Регистрация
export async function register(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: 'Ошибка при регистрации', errors });
        }

        const { username, password, email, role } = req.body;

        const isRegisteredUsername = await User.findOne({ username });
        const isRegisteredEmail = await User.findOne({ email });
        if (isRegisteredUsername) {
            return res.json({
                message: 'Данный пользователь уже зарегистрирован!',
            });
        }
        if (isRegisteredEmail) {
            return res.json({
                message: 'Пользователь с данной почтой уже зарегистрирован!',
            });
        }

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        const userRole = await Role.findOne({ value: role });

        const newUser = new User({
            username,
            password: hashedPassword,
            email,
            roles: [userRole.value],
        });

        await newUser.save();

        const token = generateAccessToken(newUser._id, newUser.roles);
        res.json({
            newUser,
            token,
            message: 'Регистрация прошла успешно!',
        });
    } catch (error) {
        res.json({
            message: 'Ошибка при создании пользователя!',
        });
    }
}

//Авторизация
export async function login(req, res) {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });

        if (!user) {
            return res.json({
                message: 'Данный пользователь еще не зарегистрирован!',
            });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return res.json({
                message: 'Пароль неверный!',
            });
        }

        const token = generateAccessToken(user._id, user.roles);

        res.json({
            user,
            token,
            message: 'Авторизация прошла успешно!',
        });
    } catch (error) {
        res.json({
            message: 'Ошибка при авторизации пользователя!',
        });
    }
}

//Профиль
export async function getMe(req, res) {
    try {
        const user = await User.findById(req.userId);

        if (!user) {
            return res.json({
                message: 'Данный пользователь еще не зарегистрирован!',
            });
        }

        const token = generateAccessToken(user._id, user.roles);

        res.json({
            user,
            token,
        });
    } catch (error) {
        return res.json({
            message: 'Нет доступа!',
        });
    }
}

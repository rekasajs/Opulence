import jwt from 'jsonwebtoken';

export const checkAuth = (req, res, next) => {
    try {
        const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (!token) {
            return res.json({
                message: 'Нет доступа!',
            });
        }

        req.userId = decodedToken.id;

        next();
    } catch (error) {
        return res.json({
            message: 'Нет доступа!',
        });
    }
};

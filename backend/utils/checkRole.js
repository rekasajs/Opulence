export const checkRole = (roles) => {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            next();
        }

        try {
            if (!token) {
                return res.json({
                    message: 'Нет доступа!',
                });
            }

            const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');
            const { role: userRoles } = jwt.verify(token, process.env.JWT_SECRET);

            let hasRole = false;
            userRoles.forEach((role) => {
                if (roles.includes(role)) {
                    hasRole = true;
                }
            });

            if (!hasRole) {
                return res.json({ message: 'У вас нет доступа' });
            }
            next();
        } catch (error) {
            return res.json({
                message: 'Нет доступа!',
            });
        }
    };
};

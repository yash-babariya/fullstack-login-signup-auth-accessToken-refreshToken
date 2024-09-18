import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

export const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization.replace('Bearer ', '');

    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).json({ message: error.message });
    }
};


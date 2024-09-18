import express from 'express';
import { refreshToken } from './user/refreshToken.js';
import { signup } from './user/signup.js';
import { login } from './user/login.js';
import User from '../model/user.model.js';
import { authenticateToken } from '../auth/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).lean();
        console.log(req.user)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User information retrieved successfully", data: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/signup', signup);
router.post('/login', login);
router.post('/refresh', refreshToken);

export default router;

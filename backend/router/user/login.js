import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../../model/user.model.js';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../../config/config.js';

export const login = async (req, res) => {
    const { email, password, deviceId } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) return res.status(404).json({ message: 'User not found' });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        // Check if the user is already logged in with another device
        if (user.deviceId && user.deviceId !== deviceId) {
            user.refreshToken = null; // Invalidate previous refresh token
        }

        // Generate new tokens
        const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1m' });
        const refreshToken = jwt.sign({ id: user._id, deviceId }, JWT_REFRESH_SECRET, { expiresIn: '5m' });

        // Save the new refresh token and device ID
        user.refreshToken = refreshToken;
        user.deviceId = deviceId;

        try {
            await user.save();
        } catch (saveError) {
            return res.status(500).json({ message: 'Error saving user data' });
        }

        res.status(200).json({ token, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

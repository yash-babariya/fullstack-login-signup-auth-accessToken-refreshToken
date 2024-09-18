import jwt from 'jsonwebtoken';
import User from '../../model/user.model.js';
import { JWT_REFRESH_SECRET, JWT_SECRET } from '../../config/config.js';

export const refreshToken = async (req, res) => {
    const { refreshToken, deviceId } = req.body;

    if (!refreshToken) return res.status(403).json({ message: 'Refresh token is required' });

    try {
        // Find user by refresh token
        const user = await User.findOne({ refreshToken });

        if (!user) return res.status(403).json({ message: 'Invalid refresh token' });

        // Check if the device ID matches
        if (user.deviceId !== deviceId) return res.status(403).json({ message: 'Invalid device ID' });

        // Verify refresh token
        jwt.verify(refreshToken, JWT_REFRESH_SECRET, (err, decoded) => {
            if (err) return res.status(403).json({ message: 'Invalid refresh token' });

            // Generate new access token
            const newAccessToken = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, { expiresIn: '1m' });

            res.status(200).json({
                token: newAccessToken,
            });
        });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
};

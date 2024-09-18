import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/test';
export const JWT_SECRET = process.env.JWT_SECRET || 'secret';
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'secret'; // Fixed this line

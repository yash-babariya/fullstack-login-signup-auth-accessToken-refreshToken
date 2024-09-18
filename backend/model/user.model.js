import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
    deviceId: { type: String } // This will track which device is currently logged in
});

const User = mongoose.model('User', userSchema);
export default User;

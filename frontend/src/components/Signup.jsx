import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import './form.scss'; // Import the SCSS file
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !email || !password) {
            toast.error('All fields are required!');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Invalid email format!');
            return false;
        }
        if (password.length < 6) {
            toast.error('Password should be at least 6 characters!');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            const response = await axios.post('http://localhost:5353/api/user/signup', {
                username,
                email,
                password,
            });
            toast.success('Signup successful!');
            navigate('/login');
            console.log(response.data);
        } catch (error) {
            toast.error(`Signup failed: ${error.response?.data?.message || error.message}`);
        }
    };

    return (
        <div className="container">
            <div className="form">
                <h2 className="title">Signup</h2>
                <div className="input-group">
                    <label className="label" htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        className="input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className="label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label className="label" htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={handleSubmit} type="submit" className="submit-button">
                    Signup
                </button>
                <p className="text">Already have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    );
};

export default Signup;

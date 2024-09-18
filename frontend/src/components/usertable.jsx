import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './home.scss';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';

const UserTable = () => {
    const [users, setUsers] = useState(null);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    const fetchUsers = async () => {
        let token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');

        try {
            await fetchData(token);
            setIsLoggedIn(true); // User is logged in if fetchData is successful
        } catch (error) {
            if (error.response && error.response.status === 403 && refreshToken) {
                try {
                    token = await refreshAccessToken(refreshToken);
                    // Retry fetching users with the new access token
                    await fetchData(token);
                    setIsLoggedIn(true);
                } catch (refreshError) {
                    setError('Failed to refresh token.');
                    console.error('Failed to refresh token:', refreshError.message);
                    setIsLoggedIn(false);
                }
            } else {
                setError('Failed to fetch users.');
                setIsLoggedIn(false);
            }
        }
    };

    const fetchData = async (accessToken) => {
        try {
            const response = await axios.get('http://localhost:5353/api/user', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            setUsers(response.data);
            setError(null);
        } catch (error) {
            throw error;
        }
    };

    const refreshAccessToken = async (refreshToken) => {
        const deviceId = localStorage.getItem('deviceId');
        try {
            const response = await axios.post('http://localhost:5353/api/user/refresh', { refreshToken, deviceId });
            const newToken = response.data.token;
            localStorage.setItem('accessToken', newToken);
            return newToken;
        } catch (error) {
            throw new Error('Failed to refresh token');
        }
    };

    const handleLogout = () => {
        // Clear tokens on logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setUsers(null);
        navigate('/login'); // Redirect to login page after logout
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div className='home page'>
            <div className="title">
                {users ? <h1>Hello! {users.data.username}</h1> : <p>You are not logged in</p>}
            </div>
            <div className="registion-btn">
                {isLoggedIn ? (
                    // Show Logout button if user is logged in
                    <button onClick={handleLogout} className="logout-btn">
                        Logout
                    </button>
                ) : (
                    // Show Signup and Login buttons if user is not logged in
                    <>
                        <Link to="/signup">
                            <button className="signup-btn">Signup</button>
                        </Link>
                        <Link to="/login">
                            <button className="login-btn">Login</button>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default UserTable;

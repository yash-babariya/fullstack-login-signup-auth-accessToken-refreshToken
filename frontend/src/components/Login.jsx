import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import './form.scss'; // Import the SCSS file
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!email || !password) {
            toast.error('All fields are required!');
            return false;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            toast.error('Invalid email format!');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:5353/api/user/login', {
                email,
                password,
                deviceId: getDeviceId(),
            });

            // Store tokens and redirect
            localStorage.setItem('accessToken', response.data.token);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            toast.success('Login successful!');
            navigate('/'); // Redirect to user table or dashboard page
        } catch (error) {
            toast.error(`Login failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container">
            <div className="form">
                <h2 className="title">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label className="label" htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            className="input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
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
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging in...' : 'Login'}
                    </button>
                    <p>Don't have an account? <Link to="/signup">Signup</Link></p>
                </form>
            </div>
        </div>
    );
};


function getDeviceId() {

    let deviceId = localStorage.getItem('deviceId');
    if (!deviceId) {
        deviceId = generateDeviceId();
        localStorage.setItem('deviceId', deviceId);
    }
    return deviceId;
}

function generateDeviceId() {
    return 'device-' + Date.now() + '-' + Math.random().toString(36).substring(2, 15);
}

// function generateDeviceId() {
//     function getBrowserFingerprint() {
//         const navigatorData = [
//             navigator.userAgent,
//             navigator.language,
//             screen.colorDepth,
//             screen.height,
//             screen.width,
//             new Date().getTimezoneOffset(),
//             !!window.sessionStorage,
//             !!window.localStorage,
//             !!window.indexedDB,
//             !!window.openDatabase,
//             !!window.caches,
//             !!window.msPointerEnabled,
//             !!window.PointerEvent,
//             !!window.DeviceOrientationEvent,
//             !!window.DeviceMotionEvent
//         ].join('|');

//         // Simple hash function to create a fingerprint from collected data
//         function hashString(str) {
//             let hash = 0;
//             for (let i = 0; i < str.length; i++) {
//                 const char = str.charCodeAt(i);
//                 hash = (hash << 5) - hash + char;
//                 hash |= 0;
//             }
//             return hash.toString(16);
//         }

//         return hashString(navigatorData);
//     }


//     return getBrowserFingerprint();
// }

export default Login;

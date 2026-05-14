import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

// client/src/config.js
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            // Pointing to your Node.js backend
            const res = await axios.post('/api/auth/login', formData);
            login(res.data.token, res.data.company);
            navigate('/'); // Redirect to protected route
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <motion.div
                className="auth-card-wide"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="auth-sidebar">
                    <h2>Welcome Back!</h2>
                    <p>Log in to your company portal to manage your WebVox Bot configuration and analytics.</p>
                </div>

                <div className="auth-content">
                    <div className="auth-header">
                        <h2>Login</h2>
                        <p>Sign in to manage your WebVox Bot</p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Work Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? 'Authenticating...' : 'Login'}
                        </button>
                    </form>

                    <div className="auth-footer">
                        Don't have a company account? <Link to="/signup">Sign up here</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

// client/src/config.js
export const API_URL = import.meta.env.NEXT_PUBLIC_API_URL;

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        website: '',
        industry: '',
        companySize: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
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

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        setLoading(true);

        try {
            const res = await axios.post(`${API_URL}/api/auth/signup`, formData);
            login(res.data.token, res.data.company);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Registration failed.');
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
                    <h2>Join the Future of Web.</h2>
                    <p>Register your company today and transform how users interact with your digital presence using WebVox Bot.</p>
                </div>

                <div className="auth-content">
                    <div className="auth-header">
                        <h2>Create Account</h2>
                        <p>Register your company for WebVox Bot</p>
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <form onSubmit={handleSubmit} className="signup-grid">
                        <div className="form-group full-width">
                            <label>Company Name</label>
                            <input type="text" name="name" className="form-control" onChange={handleChange} required />
                        </div>

                        <div className="form-group full-width">
                            <label>Website URL</label>
                            <input type="url" name="website" className="form-control" placeholder="https://" onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Industry</label>
                            <select name="industry" className="form-control" onChange={handleChange} required>
                                <option value="">Select...</option>
                                <option value="Technology">Technology</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Finance">Finance</option>
                                <option value="Retail">Retail</option>
                                <option value="Education">Education</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Company Size</label>
                            <select name="companySize" className="form-control" onChange={handleChange} required>
                                <option value="">Select...</option>
                                <option value="1-50">1-50</option>
                                <option value="51-200">51-200</option>
                                <option value="201-1000">201-1000</option>
                                <option value="1000+">1000+</option>
                            </select>
                        </div>

                        <div className="form-group full-width">
                            <label>Work Email</label>
                            <input type="email" name="email" className="form-control" onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" name="password" className="form-control" minLength="8" onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label>Confirm Password</label>
                            <input type="password" name="confirmPassword" className="form-control" minLength="8" onChange={handleChange} required />
                        </div>

                        <div className="full-width">
                            <button type="submit" className="btn-primary" disabled={loading}>
                                {loading ? 'Registering...' : 'Complete Signup'}
                            </button>
                        </div>
                    </form>

                    <div className="auth-footer">
                        Already registered? <Link to="/login">Login here</Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
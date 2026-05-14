import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle transparent to solid background on scroll
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        setDropdownOpen(false);
        navigate('/');
    };

    // Don't show transparent navbar on auth pages
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';
    const isDocsPage = location.pathname.startsWith('/docs');
    const navClass = (scrolled || isAuthPage || isDocsPage) ? 'navbar solid' : 'navbar transparent';

    return (
        <nav className={navClass}>
            <div className="nav-container">
                <Link to="/" className="nav-logo" onClick={() => window.scrollTo(0, 0)}>
                    <img src="/favicon.ico" alt="WebVox Logo" className="nav-logo-img" />
                    <span>WebVox Bot</span>
                </Link>

                <div className="nav-links">
                    <Link to="/" onClick={() => window.scrollTo(0, 0)}>Home</Link>
                    <Link to="/docs/setup-hasura">Documentation</Link>
                </div>

                <div className="nav-auth">
                    {user ? (
                        <div className="user-menu">
                            <button
                                className="user-btn"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                <div className="avatar">
                                    {user.logo ? (
                                        <img
                                            src={user.logo}
                                            alt="Company Logo"
                                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        user.name ? user.name.charAt(0).toUpperCase() : 'C'
                                    )}
                                </div>
                                <span>{user.name}</span>
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        className="dropdown-menu"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="dropdown-header">
                                            <strong>{user.name}</strong>
                                            <span>{user.email}</span>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        {/* Updated Links as requested */}
                                        <Link to="/profile" onClick={() => setDropdownOpen(false)}>View Profile</Link>
                                        <Link to="/signup" onClick={() => setDropdownOpen(false)}>Sign Up</Link>
                                        <button onClick={handleLogout} className="logout-btn">Log Out</button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link to="/login" className="btn-text">Log In</Link>
                            <Link to="/signup" className="btn-primary-sm">Get Started</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../../styles/Docs.css';

const DocsLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="docs-page">
            {/* Mobile Sidebar Toggle */}
            <button
                className="sidebar-toggle"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? 'Close Menu' : 'Documentation Menu'}
            </button>

            {/* Sidebar Navigation */}
            <aside className={`docs-sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h3>Documentation</h3>
                </div>
                <nav className="sidebar-nav">
                    <div className="nav-section">
                        <h4>Getting Started</h4>
                        <NavLink
                            to="/docs/setup-hasura"
                            className={({ isActive }) => isActive ? "active-link" : ""}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            1. Setup Hasura GraphQL
                        </NavLink>
                        <NavLink
                            to="/docs/embed-chatbot"
                            className={({ isActive }) => isActive ? "active-link" : ""}
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            2. Embed WebVox Bot
                        </NavLink>
                    </div>

                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="docs-content">
                <motion.div
                    className="docs-content-inner" /* <-- Add this class */
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <Outlet />
                </motion.div>
            </main>
        </div>
    );
};

export default DocsLayout;
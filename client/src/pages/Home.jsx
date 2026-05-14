import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';

const Home = () => {
    const fadeInUp = {
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-background"></div>
                <div className="hero-container">

                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={staggerContainer}
                    >
                        <motion.div className="hero-badge" variants={fadeInUp}>
                            <span className="badge-icon">✨</span> New: WebVox Orchestration Engine
                        </motion.div>
                        <motion.h1 variants={fadeInUp}>
                            The <span className="text-gradient">voice-first</span> way to use your website.
                        </motion.h1>
                        <motion.h2 variants={fadeInUp}>
                            WebVox is a modular, voice-enabled chatbot framework that turns natural speech or text into real actions on your site – searching, booking, ordering, and navigating content.
                        </motion.h2>
                        <motion.div className="hero-ctas" variants={fadeInUp}>
                            <Link to="/signup" className="btn-primary-lg">Get Started Free</Link>
                            <Link to="/docs/setup-hasura" className="btn-secondary-lg">View Documentation</Link>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <div className="ai-core-container">
                            {/* 3D Orbiting Rings */}
                            <div className="ai-core-ring ring-1"></div>
                            <div className="ai-core-ring ring-2"></div>
                            <div className="ai-core-ring ring-3"></div>

                            {/* Central Glowing Core */}
                            <div className="ai-core-center">
                                <div className="voice-wave wave-1"></div>
                                <div className="voice-wave wave-2"></div>
                                <div className="voice-wave wave-3"></div>
                                <div className="voice-wave wave-4"></div>
                                <div className="voice-wave wave-5"></div>
                            </div>

                            {/* Floating Particles */}
                            <div className="particle p1"></div>
                            <div className="particle p2"></div>
                            <div className="particle p3"></div>
                            <div className="particle p4"></div>
                        </div>
                    </motion.div>

                </div>
            </section>

            {/* What WebVox Does Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2>What WebVox does</h2>
                    <p>Core capabilities that redefine user interaction.</p>
                </div>

                <motion.div
                    className="features-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.div className="feature-card" variants={fadeInUp}>
                        <div className="feature-icon voice-icon">
                            {/* Mic Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-electric-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                <line x1="12" x2="12" y1="19" y2="22" />
                            </svg>
                        </div>
                        <h3>Voice & Chat Assistant</h3>
                        <p>Adds a voice and chat assistant to your existing website or web app, with support for both speech and text.</p>
                    </motion.div>

                    <motion.div className="feature-card" variants={fadeInUp}>
                        <div className="feature-icon intent-icon">
                            {/* Sparkles / AI Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-electric-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                                <path d="M5 3v4" /><path d="M19 17v4" /><path d="M3 5h4" /><path d="M17 19h4" />
                            </svg>
                        </div>
                        <h3>Natural Language Understanding</h3>
                        <p>Understands natural language, detects user intent, and asks clarifying questions when needed.</p>
                    </motion.div>

                    <motion.div className="feature-card" variants={fadeInUp}>
                        <div className="feature-icon rag-icon">
                            {/* Database Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-electric-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <ellipse cx="12" cy="5" rx="9" ry="3" />
                                <path d="M3 5V19A9 3 0 0 0 21 19V5" />
                                <path d="M3 12A9 3 0 0 0 21 12" />
                            </svg>
                        </div>
                        <h3>Data Retrieval</h3>
                        <p>Retrieves data from your databases and APIs through a Hasura-powered GraphQL abstraction layer.</p>
                    </motion.div>

                    <motion.div className="feature-card" variants={fadeInUp}>
                        <div className="feature-icon integrate-icon">
                            {/* Lightning Bolt Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-electric-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                            </svg>
                        </div>
                        <h3>Action Execution</h3>
                        <p>Executes real backend actions such as placing orders, checking availability, modifying bookings, or tracking deliveries, under strict authorization rules.</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Services We Provide Section */}
            <section className="services-section">
                <div className="section-header">
                    <h2>Services we provide</h2>
                    <p>Comprehensive solutions to power your conversational AI.</p>
                </div>

                <motion.div
                    className="services-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={staggerContainer}
                >
                    <motion.div className="service-card" variants={fadeInUp}>
                        <div className="service-icon">
                            {/* Chat Bubble Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-electric-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                        </div>
                        <h3>Voice & chat interface widget</h3>
                        <p>A customizable, embeddable widget that lets users switch between voice and text.</p>
                    </motion.div>

                    <motion.div className="service-card" variants={fadeInUp}>
                        <div className="service-icon">
                            {/* Network / Graph Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-electric-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="18" cy="5" r="3" />
                                <circle cx="6" cy="12" r="3" />
                                <circle cx="18" cy="19" r="3" />
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                            </svg>
                        </div>
                        <h3>GraphQL data abstraction with Hasura</h3>
                        <p>Automatic GraphQL APIs over databases using Hasura, giving the chatbot secure way to access data.</p>
                    </motion.div>

                    <motion.div className="service-card" variants={fadeInUp}>
                        <div className="service-icon">
                            {/* Workflow / Orchestration Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-electric-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="6" y1="3" x2="6" y2="15" />
                                <circle cx="18" cy="6" r="3" />
                                <circle cx="6" cy="18" r="3" />
                                <path d="M18 9a9 9 0 0 1-9 9" />
                            </svg>
                        </div>
                        <h3>Intent-aware orchestration</h3>
                        <p>Backend orchestration layer that classifies queries into information retrieval or action execution and routes them to GraphQL or partner APIs.</p>
                    </motion.div>

                    <motion.div className="service-card" variants={fadeInUp}>
                        <div className="service-icon">
                            {/* Security Shield Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-electric-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                <path d="m9 12 2 2 4-4" />
                            </svg>
                        </div>
                        <h3>Secure action execution</h3>
                        <p>Role-based access control, token validation, and schema-level checks ensures validated GraphQL queries and mutations run against systems.</p>
                    </motion.div>

                    <motion.div className="service-card" variants={fadeInUp}>
                        <div className="service-icon">
                            {/* Data Layers Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-electric-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                                <polyline points="2 12 12 17 22 12" />
                                <polyline points="2 17 12 22 22 17" />
                            </svg>
                        </div>
                        <h3>Multi-modal retrieval</h3>
                        <p>Hybrid retrieval that combines structured data with unstructured content (FAQs, policies).</p>
                    </motion.div>
                </motion.div>
            </section>

            {/* Motivation Section */}
            <section className="motivation-section">
                <div className="motivation-container">
                    <motion.div 
                        className="motivation-header"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                    >
                        <h2>The Motivation</h2>
                        <div className="header-line"></div>
                    </motion.div>
                    
                    <div className="motivation-grid">
                        <motion.div 
                            className="motivation-card"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="card-icon problem-icon" style={{ color: '#E53E3E' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
                                    <line x1="12" y1="8" x2="12" y2="12"></line>
                                    <line x1="12" y1="16" x2="12.01" y2="16"></line>
                                </svg>
                            </div>
                            <h3>The Problem</h3>
                            <p>Modern websites are powerful but often hard to navigate. Long forms, nested menus, and rigid chatbots create friction, lower conversion, and exclude users who rely on voice or assistive interfaces.</p>
                        </motion.div>

                        <motion.div 
                            className="motivation-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="card-icon solution-icon" style={{ color: '#F59E0B' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="9" y1="18" x2="15" y2="18"></line>
                                    <line x1="10" y1="22" x2="14" y2="22"></line>
                                    <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"></path>
                                </svg>
                            </div>
                            <h3>The Solution</h3>
                            <p>WebVox exists to close this gap. By combining speech recognition, natural language understanding, RAG, and a Hasura-backed GraphQL layer, WebVox lets any site become voice-ready and task-oriented.</p>
                        </motion.div>

                        <motion.div 
                            className="motivation-card"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <div className="card-icon framework-icon" style={{ color: '#3B82F6' }}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="3"></circle>
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                                </svg>
                            </div>
                            <h3>The Framework</h3>
                            <p>WebVox is built as a pluggable, multi-tenant framework: you keep control of your data and business logic, while the assistant focuses on understanding users and safely executing the right actions.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="cta-section">
                <div className="cta-container">
                    <h2>Ready to upgrade your website?</h2>
                    <p>Join innovative companies using WebVox Bot to drive engagement.</p>
                    <Link to="/signup" className="btn-primary-lg inverse">Create Your Account</Link>
                </div>
            </section>
        </div>
    );
};

export default Home;
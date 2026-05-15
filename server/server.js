const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// 1. IMPROVED CORS: Ensure preflight (OPTIONS) is handled explicitly
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://webvox-website.vercel.app',
    'https://webvox-website-xfk4.vercel.app' // Explicitly add your current deployment
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// 2. CONNECTION MIDDLEWARE: This is the fix for the "connecting" status
// It ensures MongoDB is connected before any route logic runs.
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (err) {
        console.error('DB Connection Middleware Error:', err.message);
        res.status(503).json({ error: 'Database not ready' });
    }
});

// 3. UPDATED HEALTH CHECK
app.get('/api/health', (req, res) => {
    const mongoose = require('mongoose');
    const isConnected = mongoose.connection.readyState === 1;
    res.status(200).json({
        status: 'success',
        database: isConnected ? 'connected' : 'disconnected'
    });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Server error',
    });
});

module.exports = app;
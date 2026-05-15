const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app FIRST
const app = express();

// Connect to MongoDB Atlas middleware
app.use(async (req, res, next) => {
    await connectDB();
    next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// CORS middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://webvox-website-backend.vercel.app'
    ],
    credentials: true
}));

// Routes

app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Basic health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'WebVox Bot API is running' });
});

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'WebVox Bot API',
        endpoints: {
            health: '/api/health',
            auth: '/api/auth',
            user: '/api/user'
        }
    });
});

// Start server locally (Vercel handles production)
if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 4000, () => console.log('Running locally'));
}

module.exports = app;
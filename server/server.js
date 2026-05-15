const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Body parsing middleware (BEFORE routes)
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

// Connect to MongoDB Atlas ONCE at startup
let dbConnected = false;
connectDB()
    .then(() => {
        dbConnected = true;
        console.log('Database ready for requests');
    })
    .catch(err => {
        console.error('Initial database connection failed:', err.message);
        // App will still start, but requests requiring DB will fail gracefully
    });

// Health check that reports DB status
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'WebVox Bot API is running',
        database: dbConnected ? 'connected' : 'connecting'
    });
});

// Root route - API info
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

// Routes - Ensure DB is connected
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Error handling middleware for timeout/connection errors
app.use((err, req, res, next) => {
    console.error('Request error:', err.message);

    if (err.message.includes('timeout') || err.message.includes('ECONNREFUSED')) {
        return res.status(503).json({
            message: 'Database connection timeout. Please try again.',
            error: 'SERVICE_UNAVAILABLE'
        });
    }

    res.status(500).json({
        message: 'Server error',
        error: err.message
    });
});

// Start server locally (Vercel handles production)
if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 4000, () => console.log('Running locally on port 4000'));
}

module.exports = app;
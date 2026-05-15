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

// CORS middleware - Allow Vercel deployments
const corsOptions = {
    origin: function (origin, callback) {
        // Allowed origins
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:3000',
            'https://webvox-website.vercel.app',
            // Allow all Vercel preview deployments
            /https:\/\/.*\.vercel\.app$/
        ];

        // If no origin (mobile app, Postman, etc), allow it
        if (!origin) return callback(null, true);

        // Check if origin is allowed
        const isAllowed = allowedOrigins.some(allowedOrigin => {
            if (allowedOrigin instanceof RegExp) {
                return allowedOrigin.test(origin);
            }
            return allowedOrigin === origin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Connect to MongoDB Atlas ONCE at startup
let dbConnected = false;
connectDB()
    .then(() => {
        dbConnected = true;
        console.log('Database ready for requests');
    })
    .catch(err => {
        console.error('Initial database connection failed:', err.message);
    });

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'WebVox Bot API is running',
        database: dbConnected ? 'connected' : 'connecting'
    });
});

// Root route
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

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/user', require('./routes/user'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Request error:', err.message);

    if (err.message === 'Not allowed by CORS') {
        return res.status(403).json({
            message: 'CORS error: Origin not allowed',
            error: 'CORS_ERROR'
        });
    }

    if (err.message.includes('timeout') || err.message.includes('ECONNREFUSED')) {
        return res.status(503).json({
            message: 'Database connection timeout',
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
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config();

// Connect to MongoDB Atlas
connectDB();

const app = express();

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://webvox-website.vercel.app/'
    ],
    credentials: true
}));

// --- NEW: Add the Authentication Routes ---
app.use('/api/auth', require('./routes/auth'));

app.use('/api/user', require('./routes/user'));

// Basic health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'success', message: 'WebVox Bot API is running' });
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT || 4000, () => console.log('Running locally'));
}


module.exports = app;
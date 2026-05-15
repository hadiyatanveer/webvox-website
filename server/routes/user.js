const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');
const connectDB = require('../config/db'); // Ensure this is imported

// Middleware to ensure DB is connected before processing the request
const ensureConnection = async (req, res, next) => {
    try {
        await connectDB(); // This must handle checking if it's already connected
        next();
    } catch (err) {
        console.error('Database connection error in User route:', err);
        res.status(503).json({
            message: 'Service temporarily unavailable. Database connection failed.',
            error: 'DB_CONN_ERROR'
        });
    }
};

// Helper to catch async errors in controllers
const handleAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Apply connection check to all routes in this router
router.use(ensureConnection);

// Routes
router.get('/profile', auth, handleAsync(userController.getProfile));
router.put('/profile', auth, handleAsync(userController.updateProfile));

module.exports = router;
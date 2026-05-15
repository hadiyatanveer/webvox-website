const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const connectDB = require('../config/db'); // Import your connection logic

// Middleware to ensure DB is connected before handling the request
const ensureConnection = async (req, res, next) => {
    try {
        await connectDB(); // Ensure this function handles the "already connected" check
        next();
    } catch (err) {
        res.status(503).json({ message: "Database connection failed" });
    }
};

const handleAsyncError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Apply connection check to all auth routes
router.use(ensureConnection);

router.post('/signup', handleAsyncError(authController.signup));
router.post('/login', handleAsyncError(authController.login));

module.exports = router;
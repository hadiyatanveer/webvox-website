const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Middleware to handle timeout errors
const handleAsyncError = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// POST /api/auth/signup
router.post('/signup', handleAsyncError(authController.signup));

// POST /api/auth/login
router.post('/login', handleAsyncError(authController.login));

module.exports = router;
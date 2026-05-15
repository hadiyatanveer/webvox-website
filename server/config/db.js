const mongoose = require('mongoose');

let isConnected = false;
let connectionPromise = null;

const connectDB = async () => {
    // If already connected, return immediately
    if (isConnected) {
        console.log('Using existing database connection');
        return;
    }

    // If connection is in progress, wait for it
    if (connectionPromise) {
        return connectionPromise;
    }

    connectionPromise = (async () => {
        try {
            await mongoose.connect(process.env.MONGODB_URI, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                // Vercel-specific settings
                serverSelectionTimeoutMS: 10000,      // Increased from 5000ms
                socketTimeoutMS: 60000,               // Increased from 45000ms
                maxPoolSize: 10,                      // Connection pooling
                minPoolSize: 2,
                retryWrites: true,
                retryReads: true,
                // Keep-alive settings
                socketKeepAliveTimeout: 45000,
                family: 4,                            // Use IPv4 (more reliable on Vercel)
            });

            isConnected = true;
            console.log('✓ MongoDB connected successfully');
            return true;
        } catch (error) {
            console.error('✗ MongoDB connection error:', error.message);
            isConnected = false;
            connectionPromise = null;
            throw error;
        }
    })();

    return connectionPromise;
};

// Handle connection errors
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
    isConnected = false;
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
    isConnected = false;
    connectionPromise = null;
});

module.exports = connectDB;
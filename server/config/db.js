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
            // Mongoose 9.x uses different connection options
            const connection = await mongoose.connect(process.env.MONGODB_URI, {
                // Connection pool settings
                maxPoolSize: 10,
                minPoolSize: 2,

                // Timeout settings (Mongoose 9 compatible)
                serverSelectionTimeoutMS: 15000,
                socketTimeoutMS: 75000,

                // Retry logic
                retryWrites: true,
                retryReads: true,

                // Network settings
                family: 4,  // IPv4 (more reliable on Vercel)
            });

            isConnected = true;
            console.log('✓ MongoDB connected successfully');
            return connection;
        } catch (error) {
            console.error('✗ MongoDB connection error:', error.message);
            isConnected = false;
            connectionPromise = null;
            throw error;
        }
    })();

    return connectionPromise;
};

// Handle connection events
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
    isConnected = false;
});

mongoose.connection.on('disconnected', () => {
    console.warn('MongoDB disconnected');
    isConnected = false;
    connectionPromise = null;
});

mongoose.connection.on('reconnected', () => {
    console.log('MongoDB reconnected');
    isConnected = true;
});

module.exports = connectDB;
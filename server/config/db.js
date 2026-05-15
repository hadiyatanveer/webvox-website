const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
    if (isConnected) return; // Use existing connection

    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
};

module.exports = connectDB;
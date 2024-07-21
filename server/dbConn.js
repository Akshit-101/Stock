
const mongoose = require("mongoose");

const connectDB = async (DATABASE_URI) => {
    try {
        console.log("Connecting to database...");
        await mongoose.connect(DATABASE_URI);
        console.log("Database connected");
        
    } catch (err) {
        console.error("Database connection error:", err);
        throw err;
    }
};

module.exports = { mongoose, connectDB };

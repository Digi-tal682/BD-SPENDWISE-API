const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected');
  } catch (error) {
    console.log('MongoDB not connected yet - framework ready, Team to connect before or on Saturday 26th Sept 2026');
  }
};

module.exports = connectDB;
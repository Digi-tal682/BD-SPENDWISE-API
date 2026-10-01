const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) throw new Error('MONGODB_URI missing in .env');

    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
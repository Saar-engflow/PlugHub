// db.js
const mongoose = require('mongoose');

const mongoURI = 'mongodb://127.0.0.1:27017/marketplace';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1); // stops server if DB fails
  }
};

module.exports = connectDB; // export AFTER defining the function

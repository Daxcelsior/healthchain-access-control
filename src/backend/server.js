const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ipfs', require('./routes/ipfs'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthchain';

mongoose.connect(MONGODB_URI)
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error.message);
  if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
    console.log('\n💡 Authentication Error - Possible fixes:');
    console.log('   1. Go to MongoDB Atlas → Database Access');
    console.log('   2. Verify the username and password are correct');
    console.log('   3. Get a fresh connection string: Clusters → Connect → Connect your application');
    console.log('   4. Replace <password> in the connection string with your actual password');
    console.log('   5. Make sure to add /healthchain before the ? in the connection string');
  } else {
    console.log('💡 Make sure MONGODB_URI is correct in .env file');
    console.log('💡 Check your MongoDB connection string');
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


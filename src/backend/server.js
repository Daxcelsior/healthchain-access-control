const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ipfs', require('./routes/ipfs'));

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Initialize DynamoDB connection
const dynamoDBClient = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// Test DynamoDB connection
const testDynamoDBConnection = async () => {
  try {
    // Simple connection test - list tables
    const { DynamoDB } = require('@aws-sdk/client-dynamodb');
    const client = new DynamoDB({
      region: process.env.AWS_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
    
    await client.listTables({});
    console.log('✅ Connected to DynamoDB');
  } catch (error) {
    console.error('❌ DynamoDB connection error:', error.message);
    console.log('⚠️  Make sure AWS credentials are set in .env file');
  }
};

// Test connection on startup
testDynamoDBConnection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


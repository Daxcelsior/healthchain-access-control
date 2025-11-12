const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, GetCommand, PutCommand, QueryCommand, ScanCommand } = require('@aws-sdk/lib-dynamodb');
const bcrypt = require('bcryptjs');

// Initialize DynamoDB client
const client = new DynamoDBClient({
  region: process.env.AWS_REGION || 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const docClient = DynamoDBDocumentClient.from(client);
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || 'healthchain-users';

class User {
  // Create user
  static async create(userData) {
    const { username, email, password } = userData;

    // Check if user already exists
    const existingUser = await this.findByEmailOrUsername(email, username);
    if (existingUser) {
      throw new Error('User already exists with this email or username');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = {
      PK: `USER#${username}`,
      SK: 'METADATA',
      username,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
      GSI1PK: `EMAIL#${email.toLowerCase()}`,
      GSI1SK: 'USER',
    };

    await docClient.send(new PutCommand({
      TableName: TABLE_NAME,
      Item: user,
    }));

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  // Find user by email or username
  static async findByEmailOrUsername(email, username) {
    try {
      // Try to find by username first
      if (username) {
        const result = await docClient.send(new GetCommand({
          TableName: TABLE_NAME,
          Key: {
            PK: `USER#${username}`,
            SK: 'METADATA',
          },
        }));

        if (result.Item) {
          return result.Item;
        }
      }

      // Try to find by email using GSI
      if (email) {
        const result = await docClient.send(new QueryCommand({
          TableName: TABLE_NAME,
          IndexName: 'GSI1',
          KeyConditionExpression: 'GSI1PK = :email',
          ExpressionAttributeValues: {
            ':email': `EMAIL#${email.toLowerCase()}`,
          },
        }));

        if (result.Items && result.Items.length > 0) {
          return result.Items[0];
        }
      }

      return null;
    } catch (error) {
      console.error('Error finding user:', error);
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    try {
      const result = await docClient.send(new QueryCommand({
        TableName: TABLE_NAME,
        IndexName: 'GSI1',
        KeyConditionExpression: 'GSI1PK = :email',
        ExpressionAttributeValues: {
          ':email': `EMAIL#${email.toLowerCase()}`,
        },
      }));

      return result.Items && result.Items.length > 0 ? result.Items[0] : null;
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  // Find user by username
  static async findByUsername(username) {
    try {
      const result = await docClient.send(new GetCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: `USER#${username}`,
          SK: 'METADATA',
        },
      }));

      return result.Item || null;
    } catch (error) {
      console.error('Error finding user by username:', error);
      throw error;
    }
  }

  // Find user by ID (username)
  static async findById(username) {
    return this.findByUsername(username);
  }

  // Compare password
  static async comparePassword(candidatePassword, hashedPassword) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}

module.exports = User;


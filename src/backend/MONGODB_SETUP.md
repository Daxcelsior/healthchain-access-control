# MongoDB Setup Guide

## Quick Setup

### Step 1: Update .env File

Edit `backend/.env` and add your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/healthchain?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
PORT=5000
PINATA_JWT=your-pinata-jwt-token
```

**Important:** Add `/healthchain` before the `?` to specify the database name.

### Step 2: Install Dependencies

```bash
cd backend
npm install
```

This will install `mongoose` (MongoDB driver).

### Step 3: Test Connection

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
Server is running on port 5000
```

## Your Connection String

Your MongoDB connection string:
```
mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/?appName=Cluster0
```

**Updated for this project:**
```
mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/healthchain?retryWrites=true&w=majority
```

**What changed:**
- Added `/healthchain` (database name)
- Added `?retryWrites=true&w=majority` (connection options)

## Troubleshooting

### Error: "MongooseServerSelectionError"

**Solution:**
1. Check your IP is whitelisted in MongoDB Atlas
2. Go to MongoDB Atlas → Network Access
3. Add your IP address (or 0.0.0.0/0 for development)

### Error: "Authentication failed"

**Solution:**
1. Check username and password in connection string
2. Verify database user exists in MongoDB Atlas
3. Make sure password doesn't have special characters that need encoding

### Error: "Connection timeout"

**Solution:**
1. Check internet connection
2. Verify MongoDB Atlas cluster is running
3. Check firewall settings

## Next Steps

Once connected:
1. ✅ Test user registration
2. ✅ Test user login
3. ✅ Verify data is stored in MongoDB

You're all set! 🎉


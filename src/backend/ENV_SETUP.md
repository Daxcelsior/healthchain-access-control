# .env File Setup Guide

## Your MongoDB Connection String

You provided:
```
mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/?appName=Cluster0
```

## Step-by-Step: Update Your .env File

### 1. Locate Your .env File

Your `.env` file should be here:
```
backend/.env
```

**If it doesn't exist, create it!**

### 2. Add/Update These Variables

Open `backend/.env` and add/update these lines:

```env
# MongoDB Connection String
MONGODB_URI=mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/healthchain?retryWrites=true&w=majority

# JWT Secret (change this to a random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d

# Server Port
PORT=5000

# Pinata IPFS Token (get from https://app.pinata.cloud/)
PINATA_JWT=your-pinata-jwt-token-here
```

## Important Notes

### ✅ What Changed in Connection String:

**Your original:**
```
mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/?appName=Cluster0
```

**Updated (for this project):**
```
mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/healthchain?retryWrites=true&w=majority
```

**Changes:**
1. Added `/healthchain` before `?` - This is the database name
2. Changed `?appName=Cluster0` to `?retryWrites=true&w=majority` - Better connection options

### ⚠️ Remove Old DynamoDB Variables (If Any)

If you have these old variables, **remove them**:
```env
# ❌ REMOVE THESE (if present)
AWS_REGION=...
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
DYNAMODB_TABLE_NAME=...
```

### ✅ Keep These Variables:

```env
# ✅ KEEP THESE
MONGODB_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=...
PORT=...
PINATA_JWT=...
```

## Complete .env File Example

Here's what your complete `backend/.env` should look like:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/healthchain?retryWrites=true&w=majority

# JWT Configuration
JWT_SECRET=my-super-secret-jwt-key-12345
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000

# IPFS (Pinata) Configuration
PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.your-pinata-token-here
```

## Quick Checklist

- [ ] Create/update `backend/.env` file
- [ ] Add `MONGODB_URI` with your connection string (with `/healthchain` added)
- [ ] Add `JWT_SECRET` (any random string)
- [ ] Add `JWT_EXPIRES_IN=7d`
- [ ] Add `PORT=5000`
- [ ] Add `PINATA_JWT` (get from Pinata if you have it)
- [ ] Remove any old DynamoDB variables
- [ ] Save the file

## Test Your .env File

After updating, test it:

```bash
cd backend
npm run dev
```

You should see:
```
✅ Connected to MongoDB
Server is running on port 5000
```

If you see an error, check:
1. Connection string is correct (no spaces, no quotes)
2. IP is whitelisted in MongoDB Atlas
3. Database name `/healthchain` is included

## Need Help?

- See `backend/MONGODB_SETUP.md` for detailed MongoDB setup
- See `backend/QUICK_START.md` for quick reference


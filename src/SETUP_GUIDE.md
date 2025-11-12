# HealthChain Access Control - Complete Setup Guide

This guide will help you set up the complete HealthChain Access Control application with authentication and IPFS image upload functionality.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Backend Setup](#backend-setup)
3. [Frontend Setup](#frontend-setup)
4. [MongoDB Setup (Cloud)](#mongodb-setup-cloud)
5. [IPFS Setup with Pinata](#ipfs-setup-with-pinata)
6. [Running the Application](#running-the-application)
7. [Testing](#testing)

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A web browser with MetaMask extension (for blockchain features)

## Backend Setup

### Step 1: Navigate to Backend Directory

```bash
cd backend
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Configure MongoDB

Follow the [MongoDB Setup](#mongodb-setup-cloud) section below to get your MongoDB connection string.

### Step 4: Configure IPFS (Pinata)

Follow the [IPFS Setup with Pinata](#ipfs-setup-with-pinata) section below to get your Pinata credentials.

### Step 5: Create Environment File

Copy the example environment file:

```bash
cp .env.example .env
```

Edit `.env` and add your credentials:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthchain?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
PORT=5000
PINATA_JWT=your-pinata-jwt-token
```

### Step 6: Start Backend Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The backend will run on `http://localhost:5000`

## Frontend Setup

### Step 1: Navigate to Frontend Directory

```bash
cd app
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Create Environment File

Create a `.env` file in the `app` directory:

```env
REACT_APP_API_URL=http://localhost:5000/api
```

### Step 4: Start Frontend Development Server

```bash
npm start
```

The frontend will open at `http://localhost:3000`

## MongoDB Setup (Cloud)

### Option A: MongoDB Atlas (Recommended - Free Tier Available)

1. **Sign Up**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Click "Try Free" and create an account

2. **Create a Cluster**
   - After signing in, click "Build a Database"
   - Choose the FREE tier (M0)
   - Select a cloud provider and region (choose one closest to you)
   - Click "Create"

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Enter a username and password (save these!)
   - Under "Database User Privileges", select "Read and write to any database"
   - Click "Add User"

4. **Whitelist IP Address**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development, click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production, add specific IP addresses
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Clusters" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Select "Node.js" and version "4.1 or later"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `healthchain` (or your preferred database name)

   Example connection string:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/healthchain?retryWrites=true&w=majority
   ```

6. **Add to Backend `.env`**
   - Paste the connection string into your `backend/.env` file as `MONGODB_URI`

### Option B: Local MongoDB

1. **Install MongoDB**
   - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

2. **Start MongoDB Service**
   - Windows: MongoDB should start as a service automatically
   - Mac/Linux: `sudo systemctl start mongod` or `brew services start mongodb-community`

3. **Use Local Connection String**
   - In `backend/.env`, set:
   ```
   MONGODB_URI=mongodb://localhost:27017/healthchain
   ```

## IPFS Setup with Pinata

### Step 1: Sign Up for Pinata

1. Go to [Pinata](https://www.pinata.cloud/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Get API Credentials

#### Option A: JWT Token (Recommended)

1. Log in to Pinata
2. Go to your profile (top right) → "API Keys"
3. Click "New Key"
4. Give it a name (e.g., "HealthChain App")
5. Select permissions:
   - ✅ `pinFileToIPFS` (required)
   - ✅ `pinJSONToIPFS` (optional, for metadata)
   - ✅ `unpin` (optional, for removing pins)
6. Click "Create Key"
7. **Copy the JWT token immediately** (you won't be able to see it again!)
8. Add to `backend/.env`:
   ```
   PINATA_JWT=your-jwt-token-here
   ```

#### Option B: API Key and Secret (Legacy)

1. Go to "API Keys" in your Pinata dashboard
2. Click "New Key"
3. Copy the "API Key" and "Secret Key"
4. Add to `backend/.env`:
   ```
   PINATA_API_KEY=your-api-key
   PINATA_SECRET_KEY=your-secret-key
   ```

### Step 3: Test Your Setup

You can test your Pinata setup by uploading a file through the Pinata web interface to ensure your credentials work.

## Running the Application

### Terminal 1: Backend Server

```bash
cd backend
npm run dev
```

You should see:
```
Connected to MongoDB
Server is running on port 5000
```

### Terminal 2: Frontend Server

```bash
cd app
npm start
```

The browser should automatically open to `http://localhost:3000`

## Testing

### 1. Test Authentication

1. Open the application in your browser
2. Click "Register" to create a new account
3. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. Click "Register"
5. You should be logged in and see the main dashboard

### 2. Test IPFS Upload

1. Make sure you're logged in
2. Click the "IPFS Upload" tab
3. Click "Choose Image File" and select an image
4. Click "Upload to IPFS"
5. You should see:
   - IPFS Hash
   - IPFS URL
   - Pinata URL
   - Preview of the uploaded image

### 3. Test Blockchain Features

1. Make sure MetaMask is installed in your browser
2. Click the "Blockchain" tab
3. Connect your MetaMask wallet
4. Enter a Patient ID and Provider Address
5. Test the blockchain functions (Register Patient, Grant Access, etc.)

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Verify your connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure your database user password is correct

**IPFS Upload Error:**
- Verify your Pinata JWT token or API keys are correct
- Check that you have the required permissions
- Ensure the image file is less than 10MB

### Frontend Issues

**Cannot connect to backend:**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in `app/.env`
- Check browser console for CORS errors

**Authentication not working:**
- Check that backend is running
- Verify JWT_SECRET is set in backend `.env`
- Clear browser localStorage and try again

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### IPFS
- `POST /api/ipfs/upload` - Upload image to IPFS
- `GET /api/ipfs/info/:hash` - Get IPFS file info

## Security Notes

- **Never commit `.env` files** to version control
- Use strong, random values for `JWT_SECRET` in production
- Restrict MongoDB network access in production
- Use environment-specific configuration
- Implement rate limiting for production APIs

## Next Steps

- Add email verification
- Implement password reset functionality
- Add user profile management
- Enhance error handling
- Add loading states and better UX
- Implement file size and type validation
- Add image compression before upload


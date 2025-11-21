# HealthChain Access Control - Complete Setup Guide

This comprehensive guide will help you set up the complete HealthChain Access Control application with all features including authentication, IPFS file upload with encryption, blockchain integration, expiration-based access, emergency access, and audit logging.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [MongoDB Setup (Cloud)](#mongodb-setup-cloud)
6. [IPFS Setup with Pinata](#ipfs-setup-with-pinata)
7. [Smart Contract Deployment](#smart-contract-deployment)
8. [Running the Application](#running-the-application)
9. [Testing Checklist](#testing-checklist)
10. [Troubleshooting](#troubleshooting)

## Prerequisites

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **MetaMask** browser extension - [Install](https://metamask.io/)
- **Ganache** (for local blockchain development) - [Download](https://trufflesuite.com/ganache/)
- **Truffle** (for smart contract deployment) - Install with `npm install -g truffle`
- A web browser (Chrome, Firefox, Edge, or Brave)

## Project Structure

```
healthchain-access-control/
├── backend/                    # Node.js/Express backend
│   ├── models/               # MongoDB models
│   │   └── User.js
│   ├── routes/               # API routes
│   │   ├── auth.js          # Authentication routes
│   │   └── ipfs.js          # IPFS upload routes
│   ├── middleware/           # Middleware
│   │   └── auth.js          # JWT authentication
│   ├── server.js             # Main server file
│   ├── package.json
│   └── .env                  # Environment variables
│
├── app/                      # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Login.js
│   │   │   ├── Register.js
│   │   │   ├── IPFSUpload.js
│   │   │   ├── FileList.js
│   │   │   └── AuditLogViewer.js
│   │   ├── services/
│   │   │   └── api.js       # API service layer
│   │   ├── App.js           # Main app component
│   │   └── App.css
│   └── package.json
│
├── smart_contract/           # Solidity smart contracts
│   ├── contracts/
│   │   └── HDA.sol          # PatientDataAccess contract
│   ├── migrations/
│   │   └── 2_deploy_HDA.js
│   └── truffle-config.js
│
└── SETUP_GUIDE.md           # This file
```

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

This will install all dependencies including:
- React and React DOM
- Web3.js for blockchain interaction
- Axios for API calls
- Crypto-JS for file encryption

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

## Smart Contract Deployment

### Step 1: Install Truffle (if not already installed)

```bash
npm install -g truffle
```

### Step 2: Navigate to Smart Contract Directory

```bash
cd smart_contract
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start Ganache

1. Open Ganache application
2. Create a new workspace or use default
3. Note the RPC URL (usually `http://127.0.0.1:7545`)
4. Copy one of the account private keys

### Step 5: Configure Truffle

Edit `truffle-config.js` and ensure it's configured for Ganache:

```javascript
networks: {
  development: {
    host: "127.0.0.1",
    port: 7545,
    network_id: "*"
  }
}
```

### Step 6: Compile Smart Contract

```bash
truffle compile
```

### Step 7: Deploy Smart Contract

```bash
truffle migrate --reset
```

This will:
- Deploy the contract to Ganache
- Create a `build/contracts/PatientDataAccess.json` file

### Step 8: Copy Contract Artifact to React App

```bash
# Copy the compiled contract to the React app
cp build/contracts/PatientDataAccess.json ../app/src/
```

### Step 9: Configure MetaMask

1. Open MetaMask extension
2. Click network dropdown → "Add Network"
3. Add Ganache network:
   - Network Name: `Ganache Local`
   - RPC URL: `http://127.0.0.1:7545`
   - Chain ID: `1337` (or check Ganache)
   - Currency Symbol: `ETH`
4. Import an account from Ganache:
   - In Ganache, click the key icon next to an account
   - Copy the private key
   - In MetaMask, click account icon → "Import Account"
   - Paste the private key

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

### Terminal 3: Ganache (if using local blockchain)

Keep Ganache running in the background.

## Testing Checklist

### 1. Test Authentication

- [ ] Register a new user account
- [ ] Login with registered credentials
- [ ] Logout functionality works
- [ ] Protected routes require authentication

### 2. Test Blockchain Features

- [ ] Connect MetaMask wallet
- [ ] Register a patient
- [ ] Grant permanent access to a provider
- [ ] Grant access with expiration date/time
- [ ] Check access status
- [ ] Revoke access
- [ ] Verify expiration works (wait for expiration time)

### 3. Test Emergency Access

- [ ] Request emergency access (as provider)
- [ ] View emergency requests (as patient)
- [ ] Grant emergency access (as patient)
- [ ] Verify emergency access expires after 24 hours

### 4. Test IPFS File Upload

- [ ] Upload an image file
- [ ] Upload with encryption enabled
- [ ] Verify encryption key is displayed
- [ ] Upload without encryption
- [ ] Verify file appears in file list
- [ ] Test drag-and-drop file upload
- [ ] Verify upload progress indicator

### 5. Test File Management

- [ ] View list of uploaded files
- [ ] View file metadata (name, date, IPFS hash)
- [ ] Download unencrypted file
- [ ] Download and decrypt encrypted file (with correct key)
- [ ] Verify file is stored on blockchain

### 6. Test Audit Logs

- [ ] View audit trail for a patient
- [ ] Filter logs by date range
- [ ] Filter logs by action type
- [ ] Search logs by provider address
- [ ] Verify pagination works for large datasets
- [ ] Check that all actions are logged

## Troubleshooting

### Backend Issues

**MongoDB Connection Error:**
- Verify your connection string is correct
- Check that your IP is whitelisted in MongoDB Atlas
- Ensure your database user password is correct
- Try connecting with MongoDB Compass to test connection

**IPFS Upload Error:**
- Verify your Pinata JWT token or API keys are correct
- Check that you have the required permissions (`pinFileToIPFS`)
- Ensure the image file is less than 10MB
- Check backend logs for detailed error messages
- Verify authentication token is valid (user must be logged in)

**JWT Authentication Error:**
- Verify `JWT_SECRET` is set in backend `.env`
- Check token expiration settings
- Clear browser localStorage and login again

### Frontend Issues

**Cannot connect to backend:**
- Ensure backend is running on port 5000
- Check `REACT_APP_API_URL` in `app/.env`
- Check browser console for CORS errors
- Verify backend CORS is configured correctly

**MetaMask Connection Issues:**
- Ensure MetaMask is installed and unlocked
- Check that you're on the correct network (Ganache or your deployed network)
- Try refreshing the page
- Check browser console for Web3 errors

**Smart Contract Not Found:**
- Verify contract is deployed to the current network
- Check `PatientDataAccess.json` exists in `app/src/`
- Ensure network ID matches in contract artifact
- Redeploy contract if necessary

**Transaction Failures:**
- Check you have enough ETH/gas in MetaMask
- Verify you're the patient owner for patient operations
- Check contract requirements (patient must exist, etc.)
- Review transaction in MetaMask for error details

**File Upload Issues:**
- Verify file size is under 10MB
- Check file type is supported (images, PDFs, documents)
- Ensure encryption key is provided if encryption is enabled
- Check backend is running and accessible
- Verify Pinata credentials are correct

**IPFS Upload Failures:**
- Check Pinata API credentials (JWT token or API key/secret)
- Verify file size is under 10MB limit
- Ensure file is an image or document type
- Check network connectivity
- Verify Pinata account has available storage/quota
- Check browser console for CORS errors
- Verify backend server is running and accessible
- Check backend logs for detailed error messages
- Ensure authentication token is valid (user must be logged in)

### Smart Contract Issues

**Contract Deployment Failures:**
- Ensure Ganache is running
- Check Truffle configuration matches Ganache settings
- Verify you have enough gas/ETH
- Check contract compilation for errors
- Review migration file for issues

**Function Call Failures:**
- Verify you're calling from the correct account (patient vs provider)
- Check function requirements (patient exists, etc.)
- Ensure you have the required permissions
- Review contract events for error details

### General Issues

**Port Already in Use:**
- Backend: Change `PORT` in `backend/.env`
- Frontend: React will prompt to use a different port
- Ganache: Change port in Ganache settings

**Dependencies Installation Issues:**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Check Node.js version (should be v14+)
- Try `npm cache clean --force`

**Build Errors:**
- Clear React build cache: `npm start -- --reset-cache`
- Delete `node_modules` and reinstall
- Check for syntax errors in code
- Review console for specific error messages

## Security Notes

- **Never commit `.env` files** to version control
- Use strong, random values for `JWT_SECRET` in production
- Restrict MongoDB network access in production
- Use environment-specific configuration
- Implement rate limiting for production APIs
- Store encryption keys securely (consider key management services)
- Use HTTPS in production
- Validate all user inputs
- Implement proper error handling without exposing sensitive information

## Next Steps

- Add email verification for user registration
- Implement password reset functionality
- Add user profile management
- Enhance error handling and user feedback
- Add file size and type validation
- Implement image compression before upload
- Add role-based access control (RBAC)
- Implement two-factor authentication (2FA)
- Add API rate limiting
- Set up monitoring and logging
- Create automated tests
- Set up CI/CD pipeline

## Support

For issues or questions:
1. Check the troubleshooting section above
2. Review error messages in browser console and backend logs
3. Verify all setup steps were completed correctly
4. Check that all services are running (backend, frontend, Ganache)

## License

This project is part of the HealthChain Access Control system.

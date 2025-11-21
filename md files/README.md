# HealthChain Access Control

A full-stack blockchain healthcare application with user authentication, patient data access control, and IPFS file storage.

## 🚀 New to Coding? Start Here!

**👉 Read `START_HERE.md` first!** It's a beginner-friendly guide that walks you through everything step-by-step.

## Architecture

- **Authentication:** MongoDB - Traditional username/password for better UX
- **Healthcare Data:** Blockchain (Ethereum) - Immutable patient records and access control
- **File Storage:** IPFS (Pinata) - Decentralized file storage with encryption
- **Frontend:** React - User interface
- **Backend:** Express/Node.js - API server

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
```

Create `.env`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthchain?retryWrites=true&w=majority
JWT_SECRET=your-secret
PINATA_JWT=your-pinata-token
PORT=5000
```

See `backend/MONGODB_SETUP.md` for setup instructions.

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd app
npm install
```

Create `.env`:
```env
REACT_APP_API_URL=http://localhost:5000/api
```

```bash
npm start
```

### 3. Smart Contract

```bash
cd smart_contract
truffle compile
truffle migrate
```

## Deployment

- **Frontend:** Deploy to AWS Amplify (see `AWS_AMPLIFY_SETUP.md`)
- **Backend:** Deploy to EC2 (see `AWS_EC2_SETUP.md`)
- **Quick Guide:** See `QUICK_DEPLOY.md`

## Documentation

- `SETUP_GUIDE.md` - Complete setup instructions
- `QUICK_DEPLOY.md` - Fastest deployment path
- `DEPLOYMENT_GUIDE.md` - Detailed deployment guide
- `FINAL_CLARITY.md` - What we're using (clear summary)
- `EC2_AMPLIFY_EXPLAINED.md` - EC2 and Amplify explained
- `CURRENT_SETUP.md` - Current implementation status

## Features

- ✅ User authentication (register/login/logout)
- ✅ Patient data access control on blockchain
- ✅ Expiration-based access grants
- ✅ Emergency access requests
- ✅ Comprehensive audit logging
- ✅ IPFS file upload with encryption
- ✅ File list and download
- ✅ Audit log viewer with filters

## Tech Stack

- **Frontend:** React, Web3.js, Axios, Crypto-JS
- **Backend:** Express, MongoDB (Mongoose), JWT, Multer
- **Blockchain:** Solidity, Truffle, Web3
- **Storage:** IPFS (Pinata), MongoDB
- **Deployment:** AWS Amplify, EC2

## License

This project is part of the HealthChain Access Control system.

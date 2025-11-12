# HealthChain Access Control

A full-stack application for managing patient data access control on the blockchain, with user authentication and IPFS image upload capabilities.

## Features

✅ **User Authentication**
- User registration
- Login/Logout functionality
- JWT-based session management
- Protected routes

✅ **IPFS Image Upload**
- Upload images to IPFS via Pinata
- Image preview before upload
- View uploaded images via IPFS gateway

✅ **Blockchain Integration**
- Web3 integration with MetaMask
- Smart contract interaction
- Patient data access control

## Project Structure

```
healthchain-access-control/
├── backend/              # Node.js/Express backend server
│   ├── models/          # MongoDB models
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   └── server.js        # Main server file
├── app/                 # React frontend application
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API service layer
│   │   └── App.js       # Main app component
│   └── package.json
├── smart_contract/      # Solidity smart contracts
└── SETUP_GUIDE.md       # Detailed setup instructions
```

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB and Pinata credentials
npm run dev
```

### 2. Frontend Setup

```bash
cd app
npm install
# Create .env file with REACT_APP_API_URL=http://localhost:5000/api
npm start
```

## Detailed Setup

For complete setup instructions including:
- MongoDB Atlas configuration
- Pinata IPFS setup
- Environment variable configuration
- Troubleshooting

See [SETUP_GUIDE.md](./SETUP_GUIDE.md)

## Technology Stack

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (via Mongoose)
- **JWT** - Authentication
- **Pinata** - IPFS pinning service

### Frontend
- **React** - UI framework
- **Axios** - HTTP client
- **Web3** - Blockchain integration

## API Documentation

### Authentication Endpoints

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info

### IPFS Endpoints

- `POST /api/ipfs/upload` - Upload image to IPFS (requires auth)
- `GET /api/ipfs/info/:hash` - Get IPFS file info (requires auth)

## Environment Variables

### Backend (.env)
```
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
PINATA_JWT=your-pinata-jwt-token
PORT=5000
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Getting MongoDB Connection String

1. Sign up at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create database user
4. Whitelist your IP
5. Get connection string from "Connect" → "Connect your application"

## Getting Pinata Credentials

1. Sign up at [Pinata](https://www.pinata.cloud/)
2. Go to API Keys
3. Create new key with `pinFileToIPFS` permission
4. Copy JWT token

## Development

```bash
# Backend (Terminal 1)
cd backend
npm run dev

# Frontend (Terminal 2)
cd app
npm start
```

## License

This project is part of the HealthChain Access Control system.


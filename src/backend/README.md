# HealthChain Backend Server

Backend server for HealthChain Access Control application with authentication and IPFS image upload functionality.

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. MongoDB Setup

#### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account
3. Create a new cluster (choose the free tier)
4. Create a database user:
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
5. Whitelist your IP address:
   - Go to "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" for development (or add your IP)
6. Get your connection string:
   - Go to "Clusters" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with your database name (e.g., `healthchain`)

#### Option B: Local MongoDB

1. Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/healthchain`

### 3. IPFS Setup with Pinata

1. Go to [Pinata](https://www.pinata.cloud/)
2. Sign up for a free account
3. Get your API credentials:
   - Go to your profile → "API Keys"
   - Click "New Key"
   - Give it a name and select permissions (at minimum: "pinFileToIPFS")
   - Copy the JWT token (recommended) OR copy API Key and Secret Key

### 4. Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and fill in your values:
   ```env
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-random-secret-key
   PINATA_JWT=your-pinata-jwt-token
   PORT=5000
   ```

### 5. Run the Server

```bash
# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "username": "string", "email": "string", "password": "string" }`
  
- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`
  
- `POST /api/auth/logout` - Logout user (requires authentication)
  
- `GET /api/auth/me` - Get current user info (requires authentication)

### IPFS

- `POST /api/ipfs/upload` - Upload image to IPFS (requires authentication)
  - Form data with `image` field (multipart/form-data)
  
- `GET /api/ipfs/info/:hash` - Get IPFS file info (requires authentication)

## Testing

You can test the API using tools like Postman or curl:

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```


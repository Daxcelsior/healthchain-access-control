# Localhost Ports 3000 & 5000 and EC2 Usage Explained

## 📋 Table of Contents
1. [Localhost Development Setup](#localhost-development-setup)
2. [Port 3000 - Frontend (React)](#port-3000---frontend-react)
3. [Port 5000 - Backend (Express API)](#port-5000---backend-express-api)
4. [How They Work Together](#how-they-work-together)
5. [EC2 Deployment](#ec2-deployment)
6. [Production Architecture](#production-architecture)

---

## Localhost Development Setup

### What is Localhost?
**Localhost** (`127.0.0.1` or `localhost`) refers to your own computer. When developing applications, you run services on your local machine before deploying them to a server.

### Development Environment Flow
```
┌─────────────────────────────────────────┐
│         Your Computer (Localhost)       │
│                                         │
│  ┌──────────────┐    ┌──────────────┐  │
│  │  Frontend    │    │   Backend    │  │
│  │  Port 3000   │───▶│  Port 5000   │  │
│  │  (React)     │    │  (Express)   │  │
│  └──────────────┘    └──────────────┘  │
│         │                    │         │
│         └────────┬───────────┘         │
│                  │                     │
│            Browser (User)              │
└─────────────────────────────────────────┘
```

---

## Port 3000 - Frontend (React)

### What Runs on Port 3000?
- **React Development Server** (`react-scripts start`)
- The user interface that users interact with
- Serves the web application to your browser

### Configuration

**File**: `app/package.json`
```json
{
  "scripts": {
    "start": "react-scripts --openssl-legacy-provider start"
  }
}
```

**How to Start:**
```bash
cd app
npm start
# Opens automatically at http://localhost:3000
```

### What Happens When You Run `npm start`:
1. React development server starts
2. Webpack bundles your React code
3. Hot-reload enabled (changes update automatically)
4. Opens browser at `http://localhost:3000`
5. Serves the React application

### Frontend Responsibilities:
- ✅ User interface (UI)
- ✅ User interactions (clicks, forms, etc.)
- ✅ Blockchain interactions (via Web3.js and MetaMask)
- ✅ Making API calls to backend
- ✅ Displaying data from backend
- ✅ File uploads to IPFS

### API Configuration

**File**: `app/src/services/api.js`
```javascript
// Development: Points to localhost:5000
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

**What This Means:**
- Frontend makes requests to `http://localhost:5000/api/*`
- All API calls go through this base URL
- Examples:
  - Login: `POST http://localhost:5000/api/auth/login`
  - Upload: `POST http://localhost:5000/api/ipfs/upload`
  - Health check: `GET http://localhost:5000/api/health`

---

## Port 5000 - Backend (Express API)

### What Runs on Port 5000?
- **Express.js Server** (Node.js backend)
- REST API endpoints
- Handles authentication, file uploads, database operations

### Configuration

**File**: `backend/server.js`
```javascript
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

**How to Start:**
```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
# Server runs on http://localhost:5000
```

### What Happens When You Run `npm start`:
1. Express server starts
2. Connects to MongoDB database
3. Loads environment variables from `.env`
4. Sets up routes (`/api/auth`, `/api/ipfs`)
5. Listens for incoming HTTP requests on port 5000

### Backend Responsibilities:
- ✅ User authentication (register, login, logout)
- ✅ JWT token management
- ✅ IPFS file uploads (via Pinata API)
- ✅ MongoDB database operations
- ✅ API endpoints for frontend
- ✅ Security middleware
- ✅ Error handling

### API Endpoints

**Available Routes:**
```
POST   /api/auth/register    - Register new user
POST   /api/auth/login        - User login
POST   /api/auth/logout       - User logout
GET    /api/auth/me           - Get current user info
POST   /api/ipfs/upload       - Upload file to IPFS
GET    /api/ipfs/info/:hash   - Get IPFS file info
GET    /api/health            - Health check endpoint
```

### Environment Variables

**File**: `backend/.env`
```env
# Server Configuration
PORT=5000

# Database
MONGODB_URI=mongodb://localhost:27017/healthchain

# Security
JWT_SECRET=your-secret-key-here

# IPFS (Pinata)
PINATA_API_KEY=your-pinata-api-key
PINATA_SECRET_KEY=your-pinata-secret-key
```

---

## How They Work Together

### Request Flow Example: User Login

```
1. User enters credentials in React app (localhost:3000)
   │
   ▼
2. Frontend sends POST request:
   http://localhost:5000/api/auth/login
   │
   ▼
3. Backend receives request on port 5000
   │
   ▼
4. Backend validates credentials with MongoDB
   │
   ▼
5. Backend generates JWT token
   │
   ▼
6. Backend sends response with token
   │
   ▼
7. Frontend receives token and stores in localStorage
   │
   ▼
8. User is logged in and redirected to dashboard
```

### Complete Development Setup

**Terminal 1 - Backend:**
```bash
cd backend
npm install
npm start
# Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd app
npm install
npm start
# App opens at http://localhost:3000
```

**Terminal 3 - MongoDB (if local):**
```bash
mongod
# MongoDB running on localhost:27017
```

### Why Two Separate Ports?

1. **Separation of Concerns**
   - Frontend = Presentation layer
   - Backend = Business logic layer
   - Easier to develop and maintain separately

2. **Different Technologies**
   - Frontend: React (JavaScript in browser)
   - Backend: Node.js/Express (JavaScript on server)

3. **Development Benefits**
   - Can restart backend without affecting frontend
   - Can develop frontend/backend independently
   - Different teams can work on each

4. **Production Flexibility**
   - Can deploy frontend and backend separately
   - Can scale them independently
   - Can use different hosting services

---

## EC2 Deployment

### What is EC2?
**Amazon EC2 (Elastic Compute Cloud)** is a cloud server where you can run your applications 24/7. Instead of running on your localhost, you deploy to a remote server accessible via the internet.

### Why Use EC2?

**Localhost Limitations:**
- ❌ Only accessible from your computer
- ❌ Must keep your computer running
- ❌ Not accessible to other users
- ❌ No public URL

**EC2 Benefits:**
- ✅ Accessible from anywhere (public IP)
- ✅ Runs 24/7 (no need to keep computer on)
- ✅ Can handle multiple users
- ✅ Professional deployment
- ✅ Scalable (can upgrade resources)

### Deployment Architecture

```
┌─────────────────────────────────────────────────┐
│           Development (Localhost)                │
│                                                 │
│  Frontend: localhost:3000 (Your Computer)      │
│  Backend:  localhost:5000 (Your Computer)      │
└─────────────────────────────────────────────────┘
                    │
                    │ Deploy
                    ▼
┌─────────────────────────────────────────────────┐
│              Production (EC2)                    │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │         EC2 Instance (AWS)               │  │
│  │                                          │  │
│  │  Backend: Port 5000 (PM2 Process)       │  │
│  │  Nginx:   Port 80 (Reverse Proxy)       │  │
│  │                                          │  │
│  │  Public IP: 18.208.114.71               │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  Frontend: AWS Amplify (Separate Service)      │
└─────────────────────────────────────────────────┘
```

### EC2 Deployment Process

#### Step 1: Launch EC2 Instance

1. Go to AWS EC2 Console
2. Launch Instance:
   - **AMI**: Amazon Linux 2023
   - **Instance Type**: t2.micro (free tier) or t2.small
   - **Key Pair**: Create/download `.pem` file
   - **Security Group**: Allow ports 22 (SSH), 80 (HTTP), 443 (HTTPS), 5000 (Backend)
3. Get Public IP: `18.208.114.71` (example)

#### Step 2: Connect to EC2

```bash
# From your local computer
ssh -i your-key.pem ec2-user@18.208.114.71
```

#### Step 3: Setup Environment on EC2

```bash
# Install Node.js
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
node --version

# Install Git
sudo yum install git -y

# Clone repository (or transfer files)
git clone <your-repo-url>
cd healthchain-access-control/src/backend
```

#### Step 4: Configure Backend

```bash
# Create .env file
nano .env
```

**EC2 `.env` Configuration:**
```env
# Use MongoDB Atlas (cloud database) instead of local
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/healthchain

# Server port (same as localhost)
PORT=5000

# Security keys
JWT_SECRET=your-production-secret-key
PINATA_API_KEY=your-pinata-key
PINATA_SECRET_KEY=your-pinata-secret
```

#### Step 5: Deploy Using Script

**File**: `deploy/ec2-deploy.sh`

```bash
# Make script executable
chmod +x deploy/ec2-deploy.sh

# Run deployment script
cd backend
../deploy/ec2-deploy.sh
```

**What the Script Does:**
1. ✅ Checks for `.env` file
2. ✅ Installs npm dependencies
3. ✅ Installs PM2 (process manager)
4. ✅ Stops existing process (if running)
5. ✅ Starts backend with PM2
6. ✅ Saves PM2 configuration
7. ✅ Shows status and logs

#### Step 6: Verify Deployment

```bash
# Check if backend is running
pm2 list
pm2 logs healthchain-backend

# Test from your local computer
curl http://18.208.114.71:5000/api/health
# Should return: {"status":"OK","message":"Server is running"}
```

### EC2 vs Localhost Comparison

| Aspect | Localhost | EC2 |
|--------|-----------|-----|
| **Access** | Only your computer | Anyone with URL |
| **URL** | `localhost:5000` | `18.208.114.71:5000` |
| **Uptime** | When your PC is on | 24/7 |
| **Cost** | Free | ~$10-15/month (t2.micro) |
| **Setup** | Simple | More complex |
| **Use Case** | Development | Production |

---

## Production Architecture

### With Nginx Reverse Proxy

In production, you typically use **Nginx** as a reverse proxy:

```
Internet
   │
   ▼
┌─────────────────────────────────────┐
│  Nginx (Port 80)                    │
│  ┌───────────────────────────────┐  │
│  │  Routes:                      │  │
│  │  /api/* → Backend:5000       │  │
│  │  /*     → Frontend:3000      │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
   │              │
   ▼              ▼
┌─────────┐  ┌──────────┐
│Backend  │  │Frontend │
│:5000    │  │:3000    │
└─────────┘  └──────────┘
```

### Nginx Configuration

**File**: `/etc/nginx/sites-available/healthchain`

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # Frontend
    location / {
        root /var/www/healthchain/build;
        try_files $uri $uri/ /index.html;
    }
}
```

### Why Use Nginx?

1. **Single Entry Point**: Users access via port 80 (standard HTTP)
2. **No CORS Issues**: Same origin for frontend and backend
3. **SSL/HTTPS**: Easy to add SSL certificates
4. **Load Balancing**: Can distribute traffic
5. **Static File Serving**: Efficient for frontend files

### Current Project Setup

Based on your code, you have:

**Development:**
- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5000/api`
- API URL in frontend: `http://localhost:5000/api`

**Production (EC2):**
- Backend: `http://18.208.114.71:5000/api` (or via domain)
- Frontend: Deployed separately (AWS Amplify or EC2 with Nginx)

**API Configuration Change:**
```javascript
// Development
const API_URL = 'http://localhost:5000/api';

// Production (with Nginx)
const API_URL = '/api';  // Relative URL - goes through Nginx

// Production (direct EC2)
const API_URL = 'http://18.208.114.71:5000/api';
```

---

## Key Takeaways

### Port 3000 (Frontend)
- ✅ React development server
- ✅ User interface
- ✅ Runs on your computer during development
- ✅ Accessible at `http://localhost:3000`

### Port 5000 (Backend)
- ✅ Express.js API server
- ✅ Handles authentication, file uploads, database
- ✅ Runs on your computer during development
- ✅ Accessible at `http://localhost:5000`
- ✅ API endpoints at `http://localhost:5000/api/*`

### EC2 Deployment
- ✅ Cloud server for production
- ✅ Backend runs 24/7 on EC2
- ✅ Accessible via public IP or domain
- ✅ Uses PM2 for process management
- ✅ Can use Nginx for reverse proxy

### Development vs Production

**Development:**
```
Frontend (3000) → Backend (5000) → MongoDB (local/Atlas)
```

**Production:**
```
Internet → Nginx (80) → Backend (5000) → MongoDB Atlas
         → Frontend (Amplify/EC2)
```

---

## Common Commands Reference

### Local Development
```bash
# Start backend
cd backend && npm start

# Start frontend
cd app && npm start

# Check if ports are in use
lsof -i :3000  # macOS/Linux
lsof -i :5000
netstat -ano | findstr :3000  # Windows
netstat -ano | findstr :5000
```

### EC2 Deployment
```bash
# Connect to EC2
ssh -i key.pem ec2-user@your-ec2-ip

# Deploy backend
cd backend && ../deploy/ec2-deploy.sh

# PM2 commands
pm2 list                    # View processes
pm2 logs healthchain-backend  # View logs
pm2 restart healthchain-backend  # Restart
pm2 stop healthchain-backend     # Stop
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find process using port
lsof -i :5000

# Kill process
kill -9 <PID>
```

### Backend Not Accessible on EC2
1. Check security group allows port 5000
2. Verify backend is running: `pm2 list`
3. Check logs: `pm2 logs healthchain-backend`
4. Test locally on EC2: `curl http://localhost:5000/api/health`

### Frontend Can't Connect to Backend
1. Verify backend is running
2. Check API_URL in frontend `.env`
3. Check CORS settings (if not using Nginx)
4. Verify network connectivity

---

This setup allows you to develop locally and deploy to production seamlessly! 🚀




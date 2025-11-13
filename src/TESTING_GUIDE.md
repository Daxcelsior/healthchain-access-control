# Complete Testing Guide 🧪

## Testing Overview

This guide covers testing all components of your HealthChain application:
1. ✅ Backend API Testing
2. ✅ Frontend Testing
3. ✅ Smart Contract Testing
4. ✅ Integration Testing
5. ✅ End-to-End Testing

---

## Phase 1: Backend Testing

### Step 1: Test MongoDB Connection

**Test:** Verify backend can connect to MongoDB

```bash
cd backend
npm run dev
```

**Expected Output:**
```
✅ Connected to MongoDB
Server is running on port 5000
```

**If you see errors:**
- Check `.env` file has correct `MONGODB_URI`
- Verify IP is whitelisted in MongoDB Atlas
- Check internet connection

---

### Step 2: Test Health Check Endpoint

**Test:** Verify server is running

**Method:** Open browser or use curl

```bash
# Using curl
curl http://localhost:5000/api/health

# Or open in browser
http://localhost:5000/api/health
```

**Expected Response:**
```json
{
  "status": "OK",
  "message": "Server is running"
}
```

---

### Step 3: Test User Registration

**Test:** Create a new user account

**Method:** Use Postman, curl, or frontend

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User",
    "role": "patient"
  }'
```

**Expected Response (Success):**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com",
    "name": "Test User",
    "role": "patient"
  }
}
```

**Test Cases:**
- ✅ Valid registration (should succeed)
- ✅ Duplicate email (should fail with 400)
- ✅ Duplicate username (should fail with 400)
- ✅ Missing fields (should fail with 400)
- ✅ Short password < 6 chars (should fail with 400)
- ✅ Invalid role (should fail with 400)

---

### Step 4: Test User Login

**Test:** Login with registered user

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

**Expected Response (Success):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com",
    "name": "Test User",
    "role": "patient"
  }
}
```

**Test Cases:**
- ✅ Valid credentials (should succeed)
- ✅ Wrong password (should fail with 401)
- ✅ Non-existent email (should fail with 401)
- ✅ Missing email/password (should fail with 400)

---

### Step 5: Test Get Current User

**Test:** Get logged-in user info

**Using curl (replace YOUR_TOKEN with actual token):**
```bash
curl http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Expected Response:**
```json
{
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com",
    "name": "Test User",
    "role": "patient"
  }
}
```

**Test Cases:**
- ✅ Valid token (should succeed)
- ✅ No token (should fail with 401)
- ✅ Invalid token (should fail with 401)
- ✅ Expired token (should fail with 401)

---

### Step 6: Test IPFS Upload

**Test:** Upload a file to IPFS

**Prerequisites:**
- Must have `PINATA_JWT` in `.env`
- Must be logged in (valid token)

**Using curl:**
```bash
curl -X POST http://localhost:5000/api/ipfs/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/path/to/your/image.jpg"
```

**Expected Response (Success):**
```json
{
  "message": "Image uploaded to IPFS successfully",
  "ipfsHash": "QmXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
  "ipfsUrl": "https://gateway.pinata.cloud/ipfs/QmXxXxXxXxXxXxXxXxXxXxXxXxXxXx",
  "pinataUrl": "https://pinata.cloud/ipfs/QmXxXxXxXxXxXxXxXxXxXxXxXxXxXx"
}
```

**Test Cases:**
- ✅ Valid image file (should succeed)
- ✅ No file (should fail with 400)
- ✅ Non-image file (should fail with 400)
- ✅ File too large > 10MB (should fail)
- ✅ No authentication token (should fail with 401)

---

## Phase 2: Frontend Testing

### Step 1: Start Frontend

```bash
cd app
npm install
npm start
```

**Expected:** Browser opens at `http://localhost:3000`

---

### Step 2: Test Registration UI

**Test:** Register a new user through UI

**Steps:**
1. Open `http://localhost:3000`
2. Click "Register" tab
3. Fill in form:
   - Full Name: "John Doe"
   - Username: "johndoe"
   - Email: "john@example.com"
   - Role: Select "Patient"
   - Password: "password123"
   - Confirm Password: "password123"
4. Click "Register"

**Expected:**
- ✅ Form submits successfully
- ✅ User is logged in automatically
- ✅ Token saved in localStorage
- ✅ Redirected to main app

**Test Cases:**
- ✅ Valid registration
- ✅ Password mismatch (should show error)
- ✅ Short password (should show error)
- ✅ Duplicate email/username (should show error)
- ✅ Missing fields (should show error)

---

### Step 3: Test Login UI

**Test:** Login with existing user

**Steps:**
1. Click "Login" tab
2. Enter email and password
3. Click "Login"

**Expected:**
- ✅ Login successful
- ✅ Token saved
- ✅ User info displayed
- ✅ Redirected to main app

**Test Cases:**
- ✅ Valid credentials
- ✅ Wrong password (should show error)
- ✅ Non-existent email (should show error)

---

### Step 4: Test IPFS Upload Component

**Test:** Upload file through UI

**Steps:**
1. Login to app
2. Navigate to IPFS Upload section
3. Drag and drop an image OR click to select
4. Optionally enable encryption
5. Click "Upload to IPFS"

**Expected:**
- ✅ File uploads successfully
- ✅ Progress bar shows progress
- ✅ IPFS hash displayed
- ✅ Download link shown
- ✅ File stored on blockchain (if patient ID set)

**Test Cases:**
- ✅ Valid image file
- ✅ Large file (> 10MB should fail)
- ✅ Non-image file (should fail)
- ✅ Encrypted upload
- ✅ Unencrypted upload

---

### Step 5: Test File List Component

**Test:** View uploaded files

**Steps:**
1. Upload a file first
2. Navigate to File List section
3. View list of files

**Expected:**
- ✅ Files displayed in list
- ✅ File name, date, size shown
- ✅ IPFS hash displayed
- ✅ Download button works

---

### Step 6: Test Audit Log Viewer

**Test:** View audit logs

**Steps:**
1. Perform some actions (grant access, upload file, etc.)
2. Navigate to Audit Log section
3. View logs

**Expected:**
- ✅ Logs displayed in table
- ✅ Filters work (date range, action type)
- ✅ Pagination works

---

## Phase 3: Smart Contract Testing

### Step 1: Setup Ganache

**Test:** Start local blockchain

```bash
# Install Ganache (if not installed)
# Download from: https://trufflesuite.com/ganache/

# Start Ganache
# - Create new workspace
# - Note the RPC URL (usually http://127.0.0.1:7545)
```

---

### Step 2: Deploy Smart Contract

**Test:** Deploy contract to Ganache

```bash
cd smart_contract

# Install dependencies
npm install

# Compile contract
truffle compile

# Deploy to Ganache
truffle migrate --network development
```

**Expected:**
- ✅ Contract compiles successfully
- ✅ Contract deploys to Ganache
- ✅ Contract address displayed
- ✅ Gas used displayed

---

### Step 3: Test Patient Registration

**Test:** Register a patient on blockchain

**Using Truffle Console:**
```bash
truffle console --network development

# In console:
let instance = await PatientDataAccess.deployed()
await instance.registerPatient("PATIENT001", {from: accounts[0]})
```

**Expected:**
- ✅ Patient registered successfully
- ✅ Patient exists in contract
- ✅ Event emitted

---

### Step 4: Test Access Grant

**Test:** Grant access to provider

```javascript
// In Truffle console
await instance.grantAccessWithExpiry(
  "PATIENT001",
  accounts[1],  // Provider address
  86400,  // 1 day in seconds
  {from: accounts[0]}  // Patient address
)
```

**Expected:**
- ✅ Access granted successfully
- ✅ Expiration time set correctly
- ✅ Event emitted

---

### Step 5: Test Access Check

**Test:** Verify access permissions

```javascript
// In Truffle console
await instance.checkAccess("PATIENT001", accounts[1])
```

**Expected:**
- ✅ Returns `true` if access granted
- ✅ Returns `false` if no access
- ✅ Considers expiration time

---

### Step 6: Test File Storage

**Test:** Store IPFS hash on blockchain

```javascript
// In Truffle console
await instance.storeFileHash(
  "PATIENT001",
  "QmXxXxXxXxXxXxXxXxXxXxXxXxXxXx",  // IPFS hash
  "medical-report.pdf",
  {from: accounts[0]}
)
```

**Expected:**
- ✅ File hash stored successfully
- ✅ File metadata saved
- ✅ Event emitted

---

### Step 7: Test Audit Logs

**Test:** Retrieve audit logs

```javascript
// In Truffle console
await instance.getPatientAuditTrail("PATIENT001")
```

**Expected:**
- ✅ Returns array of audit logs
- ✅ Logs contain timestamp, actor, action
- ✅ Logs are in chronological order

---

## Phase 4: Integration Testing

### Test 1: Complete User Flow

**Test:** End-to-end user registration and login

**Steps:**
1. Register user via frontend
2. Login via frontend
3. Verify token works
4. Check MongoDB has user data

**Expected:**
- ✅ All steps complete successfully
- ✅ Data persists in MongoDB
- ✅ Token works for authenticated requests

---

### Test 2: File Upload Flow

**Test:** Upload file and store on blockchain

**Steps:**
1. Login to frontend
2. Upload file via IPFS component
3. Store IPFS hash on blockchain
4. Verify file appears in file list

**Expected:**
- ✅ File uploaded to IPFS
- ✅ Hash stored on blockchain
- ✅ File appears in list
- ✅ File can be downloaded

---

### Test 3: Access Control Flow

**Test:** Grant and verify access

**Steps:**
1. Patient registers on blockchain
2. Patient grants access to provider
3. Provider checks access
4. Provider accesses patient data

**Expected:**
- ✅ Access granted successfully
- ✅ Access check returns true
- ✅ Provider can access data
- ✅ Audit log created

---

## Phase 5: Error Handling Testing

### Test Error Scenarios

**Backend Errors:**
- ✅ Invalid MongoDB connection (should show error)
- ✅ Missing JWT secret (should show error)
- ✅ Invalid token (should return 401)
- ✅ Missing required fields (should return 400)
- ✅ Duplicate user (should return 400)

**Frontend Errors:**
- ✅ Network errors (should show error message)
- ✅ Invalid form data (should show validation errors)
- ✅ Expired token (should redirect to login)
- ✅ File upload failures (should show error)

**Blockchain Errors:**
- ✅ Invalid patient ID (should revert)
- ✅ Unauthorized access (should revert)
- ✅ Expired access (should return false)
- ✅ Invalid address (should revert)

---

## Testing Checklist

### Backend ✅
- [ ] MongoDB connection works
- [ ] Health check endpoint works
- [ ] User registration works
- [ ] User login works
- [ ] Get current user works
- [ ] IPFS upload works
- [ ] Error handling works

### Frontend ✅
- [ ] Registration form works
- [ ] Login form works
- [ ] IPFS upload component works
- [ ] File list component works
- [ ] Audit log viewer works
- [ ] Error messages display correctly

### Smart Contract ✅
- [ ] Contract compiles
- [ ] Contract deploys
- [ ] Patient registration works
- [ ] Access grant works
- [ ] Access check works
- [ ] File storage works
- [ ] Audit logs work

### Integration ✅
- [ ] Complete user flow works
- [ ] File upload flow works
- [ ] Access control flow works
- [ ] Error handling works

---

## Quick Test Script

Save this as `test-api.sh`:

```bash
#!/bin/bash

BASE_URL="http://localhost:5000/api"

echo "Testing Health Check..."
curl $BASE_URL/health

echo -e "\n\nTesting Registration..."
curl -X POST $BASE_URL/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123",
    "name": "Test User",
    "role": "patient"
  }'

echo -e "\n\nTesting Login..."
curl -X POST $BASE_URL/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123"
  }'
```

Run with: `bash test-api.sh`

---

## Next Steps After Testing

1. ✅ Fix any bugs found
2. ✅ Document test results
3. ✅ Prepare for deployment
4. ✅ Set up production environment
5. ✅ Deploy to AWS (EC2 + Amplify)

---

## Need Help?

- Check error messages in console
- Verify `.env` file is correct
- Check MongoDB Atlas connection
- Verify Pinata token is valid
- Check Ganache is running

**Happy Testing!** 🎉


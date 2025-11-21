# EC2 and Amplify Explained - Simple Guide

## What Are EC2 and Amplify?

**EC2 and Amplify are for DEPLOYMENT/HOSTING** - they're where your code runs, not where data is stored.

---

## 🖥️ EC2 (Elastic Compute Cloud)

### What It Is:
**A virtual server in the cloud** - like renting a computer on the internet.

### What It's For:
**Running your backend server** (Express/Node.js)

### Current Status:
- ❌ **Not deployed yet** - your backend runs on `localhost:5000` (your computer)
- ✅ **Code is ready** - just needs to be deployed to EC2

### What Happens:
```
Your Computer (Now)          EC2 (After Deployment)
───────────────────          ─────────────────────
localhost:5000      →        http://ec2-ip:5000
(Only you can access)        (Anyone can access)
```

### What Runs on EC2:
- ✅ Express backend server
- ✅ API endpoints (`/api/auth`, `/api/ipfs`)
- ✅ Connects to DynamoDB
- ✅ Connects to IPFS (Pinata)
- ✅ Connects to blockchain

### Cost:
- **Free tier:** 750 hours/month for 12 months
- **After:** ~$8-15/month

---

## 🌐 Amplify

### What It Is:
**A hosting service for web apps** - automatically deploys from GitHub.

### What It's For:
**Running your frontend** (React app)

### Current Status:
- ❌ **Not deployed yet** - your frontend runs on `localhost:3000` (your computer)
- ✅ **Code is ready** - just needs to be deployed to Amplify

### What Happens:
```
Your Computer (Now)          Amplify (After Deployment)
───────────────────          ─────────────────────────
localhost:3000      →        https://your-app.amplifyapp.com
(Only you can access)        (Anyone can access)
```

### What Runs on Amplify:
- ✅ React frontend
- ✅ Static files (HTML, CSS, JavaScript)
- ✅ Automatically builds from GitHub
- ✅ Free SSL certificate (HTTPS)

### Cost:
- **Free tier:** 15 GB storage (always free)
- **After:** ~$1-5/month

---

## Complete Picture: What Goes Where

```
┌─────────────────────────────────────────────────────┐
│              DEPLOYMENT (Where Code Runs)           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Frontend (React) → AWS Amplify                    │
│  • Your React app                                  │
│  • Accessible at: https://your-app.amplifyapp.com │
│  • Auto-deploys from GitHub                        │
│                                                     │
│  Backend (Express) → EC2                           │
│  • Your Express server                             │
│  • Accessible at: http://ec2-ip:5000               │
│  • Runs 24/7                                       │
│                                                     │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│            DATA STORAGE (Where Data Lives)           │
├─────────────────────────────────────────────────────┤
│                                                     │
│  User Auth → DynamoDB (AWS)                        │
│  • Usernames, emails, passwords                    │
│                                                     │
│  Healthcare Data → Blockchain                      │
│  • Patient records, permissions, audit logs         │
│                                                     │
│  Files → IPFS (Pinata)                             │
│  • Uploaded images, documents                       │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## Current Status

### ✅ What's Working (Locally):
- Frontend: `localhost:3000` (your computer)
- Backend: `localhost:5000` (your computer)
- DynamoDB: Not set up yet (need to create table)
- IPFS: Ready (need Pinata token)
- Blockchain: Ready (need to deploy contract)

### ⏳ What Needs Deployment:
- **Frontend → Amplify** (make it accessible online)
- **Backend → EC2** (make it accessible online)

---

## Why Deploy?

### Right Now (Local):
- ❌ Only you can access it
- ❌ Must keep your computer running
- ❌ Can't share with others
- ❌ No HTTPS/SSL

### After Deployment:
- ✅ Anyone can access it
- ✅ Runs 24/7 (no need to keep computer on)
- ✅ Can share with users
- ✅ HTTPS/SSL included
- ✅ Professional URL

---

## Deployment Flow

### Step 1: Deploy Backend to EC2
```
Your Computer          EC2 Server
─────────────         ──────────
backend/      →       Copy files
npm start     →       pm2 start
localhost     →       Public IP
```

### Step 2: Deploy Frontend to Amplify
```
GitHub          Amplify
──────          ───────
Push code  →    Auto-build
                Auto-deploy
                Live website
```

### Step 3: Connect Them
```
Frontend (Amplify)    Backend (EC2)
──────────────────    ─────────────
React App       →     Express API
https://...     →     http://ec2-ip:5000
```

---

## Simple Analogy

Think of it like a restaurant:

- **EC2** = The kitchen (where food is prepared)
  - Your backend server runs here
  - Handles all the work

- **Amplify** = The dining room (where customers sit)
  - Your frontend runs here
  - What users see and interact with

- **DynamoDB** = The ingredient storage
  - Stores user data

- **Blockchain** = The recipe book (permanent record)
  - Stores healthcare data

- **IPFS** = The food storage
  - Stores uploaded files

---

## What You Need to Do

### 1. Set Up Services (Data Storage):
- [ ] Create DynamoDB table
- [ ] Get Pinata token (for IPFS)
- [ ] Deploy smart contract

### 2. Deploy Code (Where It Runs):
- [ ] Deploy backend to EC2
- [ ] Deploy frontend to Amplify
- [ ] Connect them together

---

## Summary

**EC2 and Amplify are for HOSTING your code:**

- **EC2** = Where your backend server runs (instead of your computer)
- **Amplify** = Where your frontend runs (instead of your computer)

**They're NOT for storing data:**
- Data is stored in: DynamoDB, Blockchain, IPFS

**Current Status:**
- ✅ Code is ready
- ⏳ Need to deploy to EC2 and Amplify
- ⏳ Need to set up DynamoDB and get Pinata token

---

## Next Steps

1. **Read:** `QUICK_DEPLOY.md` (deployment guide)
2. **Deploy:** Backend to EC2, Frontend to Amplify
3. **Connect:** Update frontend to point to EC2 backend

That's it! 🚀


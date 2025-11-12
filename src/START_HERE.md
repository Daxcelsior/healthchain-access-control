# 🚀 START HERE - Beginner's Guide

Welcome! This guide will walk you through everything step-by-step, even if you're new to coding.

## 📋 What You'll Need

1. **Computer** (Windows, Mac, or Linux)
2. **Internet connection**
3. **About 2-3 hours** for initial setup
4. **Patience** - take it one step at a time!

---

## Step 1: Install Required Software (30 minutes)

### 1.1 Install Node.js

**What it is:** Node.js lets you run JavaScript on your computer (needed for backend and frontend).

**How to install:**
1. Go to: https://nodejs.org/
2. Download the **LTS version** (recommended)
3. Run the installer
4. Click "Next" through all steps (use default settings)
5. Restart your computer

**Verify it worked:**
- Open Command Prompt (Windows) or Terminal (Mac/Linux)
- Type: `node --version`
- You should see something like: `v18.x.x` or `v20.x.x`
- Type: `npm --version`
- You should see something like: `9.x.x` or `10.x.x`

✅ **If you see version numbers, you're good!**

---

### 1.2 Install Git (Optional but Recommended)

**What it is:** Git helps you save and share your code.

**How to install:**
1. Go to: https://git-scm.com/downloads
2. Download for your operating system
3. Run installer (use default settings)
4. Restart your computer

**Verify it worked:**
- Open Command Prompt/Terminal
- Type: `git --version`
- You should see: `git version 2.x.x`

✅ **If you see a version, you're good!**

---

### 1.3 Install MetaMask (For Blockchain Features)

**What it is:** A browser extension to connect to blockchain.

**How to install:**
1. Go to: https://metamask.io/
2. Click "Download"
3. Choose your browser (Chrome, Firefox, Edge, or Brave)
4. Click "Install MetaMask"
5. Follow the setup wizard:
   - Create a password
   - **IMPORTANT:** Save your secret recovery phrase somewhere safe!
   - Don't share it with anyone!

✅ **MetaMask is now installed!**

---

## Step 2: Set Up Your Project (15 minutes)

### 2.1 Open Your Project Folder

1. Open File Explorer (Windows) or Finder (Mac)
2. Navigate to: `D:\repos\healthchain-access-control\src`
3. This is your project folder!

### 2.2 Open Terminal in Project Folder

**Windows:**
- In File Explorer, click the address bar
- Type: `cmd` and press Enter
- A black window (Command Prompt) will open

**Mac/Linux:**
- Right-click the folder → "Open in Terminal"

✅ **You should see a terminal window!**

---

## Step 3: Set Up Backend (20 minutes)

### 3.1 Install Backend Dependencies

In your terminal, type these commands one by one (press Enter after each):

```bash
cd backend
npm install
```

**What this does:** Downloads all the code libraries your backend needs.

**Wait for it to finish** (may take 2-5 minutes). You'll see lots of text scrolling.

✅ **When you see a prompt again (like `>`)**, it's done!

---

### 3.2 Create Environment File

1. In the `backend` folder, look for a file called `.env.example`
2. Copy it and rename the copy to `.env`
3. Open `.env` in a text editor (Notepad, VS Code, etc.)

You'll add your credentials here later. For now, just create the file.

---

## Step 4: Set Up Frontend (15 minutes)

### 4.1 Install Frontend Dependencies

Open a **new terminal window** (keep the backend one open too):

```bash
cd app
npm install
```

**Wait for it to finish** (may take 3-5 minutes).

✅ **When done, you'll see the prompt again!**

---

### 4.2 Create Frontend Environment File

1. In the `app` folder, create a new file called `.env`
2. Open it and add this line:

```
REACT_APP_API_URL=http://localhost:5000/api
```

Save the file.

---

## Step 5: Get Your AWS Account Ready (30 minutes)

### 5.1 Create AWS Account

1. Go to: https://aws.amazon.com/
2. Click "Create an AWS Account"
3. Follow the signup process
4. **Use your student email** if you have one (for free credits!)

### 5.2 Get AWS Credentials

1. Log into AWS Console
2. Click your name (top right) → "Security credentials"
3. Scroll to "Access keys"
4. Click "Create access key"
5. Choose "Application running outside AWS"
6. Click "Next" → "Create access key"
7. **IMPORTANT:** Copy both:
   - Access Key ID
   - Secret Access Key (you won't see it again!)

**Save these somewhere safe!** You'll need them later.

---

## Step 6: Set Up DynamoDB (20 minutes)

### 6.1 Create DynamoDB Table

1. In AWS Console, search for "DynamoDB"
2. Click "Create table"
3. Fill in:
   - **Table name:** `healthchain-users`
   - **Partition key:** `PK` (choose "String")
   - **Sort key:** `SK` (choose "String")
   - **Settings:** Use defaults
4. Click "Create table"

✅ **Wait for table to be created (30 seconds)**

### 6.2 Create Index

1. Click on your table `healthchain-users`
2. Go to "Indexes" tab
3. Click "Create index"
4. Fill in:
   - **Partition key:** `GSI1PK` (String)
   - **Sort key:** `GSI1SK` (String)
   - **Index name:** `GSI1`
5. Click "Create index"

✅ **Wait for index to be created (1-2 minutes)**

---

## Step 7: Get Pinata Token (10 minutes)

### 7.1 Create Pinata Account

1. Go to: https://pinata.cloud/
2. Click "Sign Up" (it's free!)
3. Verify your email

### 7.2 Get API Token

1. Log into Pinata
2. Click your profile (top right) → "API Keys"
3. Click "New Key"
4. Name it: "HealthChain"
5. Check the box: `pinFileToIPFS`
6. Click "Create Key"
7. **IMPORTANT:** Copy the JWT token immediately!

**Save this token!** You won't see it again.

---

## Step 8: Configure Backend (10 minutes)

### 8.1 Update .env File

Open `backend/.env` and add:

```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=paste-your-access-key-here
AWS_SECRET_ACCESS_KEY=paste-your-secret-key-here
DYNAMODB_TABLE_NAME=healthchain-users
JWT_SECRET=make-up-a-random-secret-here-like-mySecret123
JWT_EXPIRES_IN=7d
PORT=5000
PINATA_JWT=paste-your-pinata-token-here
```

**Replace the placeholders with your actual values!**

Save the file.

---

## Step 9: Test Everything (15 minutes)

### 9.1 Start Backend

In your terminal (in the `backend` folder):

```bash
npm run dev
```

**You should see:**
```
✅ Connected to DynamoDB
Server is running on port 5000
```

✅ **If you see this, backend is working!**

**Keep this terminal open!**

### 9.2 Start Frontend

Open a **new terminal**:

```bash
cd app
npm start
```

**Wait 30 seconds...**

Your browser should automatically open to: `http://localhost:3000`

✅ **If you see the login page, frontend is working!**

---

## Step 10: Test the App (10 minutes)

### 10.1 Register a User

1. Click "Register"
2. Fill in:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
3. Click "Register"

✅ **If you see "Welcome, testuser!" - it's working!**

### 10.2 Test Login

1. Click "Logout"
2. Click "Login"
3. Enter: `test@example.com` and `password123`
4. Click "Login"

✅ **If you can log in, authentication works!**

---

## 🎉 Congratulations!

You've successfully set up the application locally!

---

## What's Next?

### Option 1: Learn More
- Explore the app features
- Try uploading a file
- Test blockchain features (need to deploy smart contract first)

### Option 2: Deploy to AWS
- Follow `QUICK_DEPLOY.md` to deploy to EC2 and Amplify
- This makes your app accessible online

### Option 3: Add More Features
- Customize the UI
- Add more functionality
- Learn more about the code

---

## 🆘 Need Help?

### Common Issues:

**"npm: command not found"**
- Node.js isn't installed or not in PATH
- Reinstall Node.js and restart computer

**"Cannot find module"**
- Run `npm install` again in the folder

**"Port 5000 already in use"**
- Another program is using port 5000
- Change `PORT=5000` to `PORT=5001` in `.env`

**"DynamoDB connection error"**
- Check your AWS credentials in `.env`
- Make sure table name is correct

**"Frontend won't start"**
- Make sure backend is running first
- Check `REACT_APP_API_URL` in `app/.env`

---

## 📚 Learning Resources

- **Node.js basics:** https://nodejs.org/en/docs/
- **React tutorial:** https://react.dev/learn
- **AWS basics:** https://aws.amazon.com/getting-started/
- **Blockchain basics:** https://ethereum.org/en/developers/

---

## ✅ Checklist

- [ ] Node.js installed
- [ ] Git installed (optional)
- [ ] MetaMask installed
- [ ] AWS account created
- [ ] AWS credentials obtained
- [ ] DynamoDB table created
- [ ] Pinata account created
- [ ] Pinata token obtained
- [ ] Backend `.env` configured
- [ ] Frontend `.env` configured
- [ ] Backend running (`npm run dev`)
- [ ] Frontend running (`npm start`)
- [ ] Can register user
- [ ] Can login

**Once all checked, you're ready to go!** 🚀

---

## Next Steps

1. ✅ Complete all steps above
2. ✅ Test everything locally
3. 📖 Read `QUICK_DEPLOY.md` to deploy online
4. 🎓 Learn more about the code

**Take your time, and don't hesitate to ask for help!** 😊


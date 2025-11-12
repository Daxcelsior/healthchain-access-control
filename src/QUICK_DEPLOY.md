# Quick Deployment Guide 🚀

## Fastest Way to Deploy

### Step 1: Prepare Code (5 minutes)

```bash
# Make sure everything works locally
cd backend && npm install && npm start
# In another terminal:
cd app && npm install && npm start
```

### Step 2: Push to GitHub (2 minutes)

```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/yourusername/healthchain-access-control.git
git push -u origin main
```

### Step 3: Deploy Frontend - Amplify (10 minutes)

1. Go to [AWS Amplify](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect GitHub → Select repo
4. Use these build settings:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd app && npm install
    build:
      commands:
        - cd app && npm run build
  artifacts:
    baseDirectory: app/build
    files:
      - '**/*'
```

5. Add environment variable:
   - `REACT_APP_API_URL` = `http://your-ec2-ip:5000/api`
6. Click "Save and deploy"

**Frontend will be live in 5-10 minutes!** ✅

### Step 4: Deploy Backend - EC2 (15 minutes)

#### A. Launch EC2 Instance

1. [EC2 Console](https://console.aws.amazon.com/ec2/) → Launch Instance
2. Choose: Amazon Linux 2023, t2.micro
3. Create key pair (download .pem file!)
4. Security group: Allow ports 22, 80, 443, 5000
5. Launch!

#### B. Connect and Setup

```bash
# Connect (Windows PowerShell)
ssh -i your-key.pem ec2-user@your-ec2-ip

# On EC2, run:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
sudo yum install git -y
git clone https://github.com/yourusername/healthchain-access-control.git
cd healthchain-access-control/src/backend
npm install
npm install -g pm2
```

#### C. Configure Environment

```bash
nano .env
```

Add:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
DYNAMODB_TABLE_NAME=healthchain-users
JWT_SECRET=your-secret
PINATA_JWT=your-pinata-jwt
PORT=5000
```

#### D. Start Backend

```bash
pm2 start server.js --name healthchain-backend
pm2 save
pm2 startup
# Run the command it gives you
```

**Backend is now live!** ✅

### Step 5: Update Frontend API URL

In Amplify Console:
1. Go to your app → Environment variables
2. Update `REACT_APP_API_URL` = `http://your-ec2-ip:5000/api`
3. Redeploy

---

## 🎉 You're Live!

- **Frontend:** `https://your-amplify-url.amplifyapp.com`
- **Backend:** `http://your-ec2-ip:5000`

## 📝 Next Steps

1. ✅ Test registration/login
2. ✅ Test blockchain features
3. ✅ Test file upload
4. ✅ Add custom domain (optional)
5. ✅ Setup monitoring (optional)

## 🆘 Need Help?

- Check `DEPLOYMENT_GUIDE.md` for detailed steps
- Check EC2 logs: `pm2 logs healthchain-backend`
- Check Amplify build logs in console

---

**Total deployment time: ~30 minutes** ⏱️


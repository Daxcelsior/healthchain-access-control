# Complete AWS Deployment Guide

## Choose Your Deployment Method

### Option 1: AWS Amplify (Easiest) ⭐ Recommended
- Automatic deployments from GitHub
- Hosts frontend + backend
- Free SSL certificate
- **Best for:** Quick deployment, automatic CI/CD

### Option 2: EC2 (More Control)
- Full server control
- Can run both frontend and backend
- **Best for:** Custom configurations, learning

### Option 3: Hybrid (Recommended for Production)
- Frontend: Amplify or S3
- Backend: EC2
- **Best for:** Production apps, better performance

---

## 🚀 Option 1: AWS Amplify Deployment (Easiest)

### Step 1: Prepare Your Code

Make sure your code is ready:
```bash
# Test locally first
cd backend && npm install && npm start
cd ../app && npm install && npm start
```

### Step 2: Push to GitHub

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Ready for deployment"

# Create GitHub repo and push
git remote add origin https://github.com/yourusername/healthchain-access-control.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Frontend with Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Choose "GitHub" and authorize
4. Select your repository: `healthchain-access-control`
5. Select branch: `main`
6. Configure build settings:

**Build settings for React app:**
```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - cd app
        - npm install
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: app/build
    files:
      - '**/*'
  cache:
    paths:
      - app/node_modules/**/*
```

7. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url/api
   ```

8. Click "Save and deploy"

**Your frontend will be live in ~5-10 minutes!** 🎉

### Step 4: Deploy Backend

You have two options:

#### Option A: Deploy Backend to EC2 (Recommended)

Follow the EC2 setup guide below, then update frontend API URL.

#### Option B: Use Amplify Functions (Serverless)

Convert your Express routes to Lambda functions (more complex).

---

## 🖥️ Option 2: EC2 Deployment (Full Control)

### Step 1: Launch EC2 Instance

1. Go to [EC2 Console](https://console.aws.amazon.com/ec2/)
2. Click "Launch Instance"
3. Configure:
   - **Name:** `healthchain-backend`
   - **AMI:** Amazon Linux 2023 (free tier)
   - **Instance type:** t2.micro (free tier)
   - **Key pair:** Create new (download .pem file!)
   - **Network settings:**
     - Allow SSH (22)
     - Allow HTTP (80)
     - Allow HTTPS (443)
     - Allow Custom TCP (5000) - for backend
   - **Storage:** 8 GB (free tier: 30 GB)
4. Click "Launch Instance"

### Step 2: Connect to EC2

**Windows (PowerShell):**
```powershell
# Upload your key to EC2
scp -i your-key.pem your-key.pem ec2-user@your-ec2-ip:~/

# SSH into EC2
ssh -i your-key.pem ec2-user@your-ec2-ip
```

**Mac/Linux:**
```bash
chmod 400 your-key.pem
ssh -i your-key.pem ec2-user@your-ec2-ip
```

### Step 3: Install Node.js on EC2

```bash
# Update system
sudo yum update -y

# Install Node.js 18
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
node --version  # Should show v18.x.x

# Install Git
sudo yum install git -y
```

### Step 4: Clone and Setup Backend

```bash
# Clone your repo (or upload files)
git clone https://github.com/yourusername/healthchain-access-control.git
cd healthchain-access-control/src/backend

# Install dependencies
npm install

# Create .env file
nano .env
```

Add your environment variables:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
DYNAMODB_TABLE_NAME=healthchain-users
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
PORT=5000
PINATA_JWT=your-pinata-jwt-token
```

### Step 5: Install PM2 (Process Manager)

```bash
# Install PM2 globally
npm install -g pm2

# Start your backend
pm2 start server.js --name healthchain-backend

# Save PM2 configuration
pm2 save

# Setup PM2 to start on reboot
pm2 startup
# Copy and run the command it gives you
```

### Step 6: Configure Security Group

1. Go to EC2 → Instances → Select your instance
2. Click "Security" tab → Security groups
3. Edit inbound rules
4. Add rule:
   - Type: Custom TCP
   - Port: 5000
   - Source: 0.0.0.0/0 (or your IP for security)

### Step 7: Test Your Backend

Visit: `http://your-ec2-public-ip:5000/api/health`

You should see: `{"status":"OK","message":"Server is running"}`

### Step 8: (Optional) Setup Nginx Reverse Proxy

For production, use Nginx:

```bash
# Install Nginx
sudo yum install nginx -y

# Configure Nginx
sudo nano /etc/nginx/conf.d/healthchain.conf
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Start Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

---

## 🔄 Option 3: Hybrid Deployment (Best for Production)

### Frontend: AWS Amplify
- Follow Option 1, Step 3
- Automatic deployments from GitHub
- Free SSL certificate

### Backend: EC2
- Follow Option 2
- Full control over server
- Better for custom configurations

### Update Frontend API URL

In Amplify environment variables:
```
REACT_APP_API_URL=http://your-ec2-ip:5000/api
# or with domain:
REACT_APP_API_URL=https://api.yourdomain.com/api
```

---

## 📝 Deployment Checklist

### Before Deployment:
- [ ] Code tested locally
- [ ] Environment variables documented
- [ ] Git repository created
- [ ] Code pushed to GitHub

### DynamoDB Setup:
- [ ] Table created: `healthchain-users`
- [ ] GSI created: `GSI1`
- [ ] AWS credentials obtained
- [ ] Credentials added to `.env`

### Backend Deployment:
- [ ] EC2 instance launched
- [ ] Node.js installed
- [ ] Code deployed
- [ ] PM2 configured
- [ ] Security group configured
- [ ] Backend accessible

### Frontend Deployment:
- [ ] Amplify app created
- [ ] Build settings configured
- [ ] Environment variables set
- [ ] Frontend accessible

### Testing:
- [ ] User registration works
- [ ] User login works
- [ ] Blockchain connection works
- [ ] File upload works
- [ ] All features tested

---

## 🎯 Quick Start Commands

### Deploy Backend to EC2:
```bash
# On your local machine
scp -i key.pem -r backend/ ec2-user@ec2-ip:~/

# On EC2
cd backend
npm install
pm2 start server.js --name healthchain-backend
pm2 save
```

### Deploy Frontend to Amplify:
1. Push to GitHub
2. Connect Amplify to GitHub repo
3. Configure build settings
4. Deploy!

---

## 💰 Cost Estimate

**Free Tier (First Year):**
- EC2: 750 hours/month free
- Amplify: 15 GB free
- DynamoDB: 25 GB free
- S3: 5 GB free
- **Total: ~$0-5/month**

**After Free Tier:**
- EC2: ~$8-15/month
- Amplify: ~$1-5/month
- DynamoDB: ~$1-5/month
- **Total: ~$10-25/month**

---

## 🆘 Troubleshooting

### Backend not accessible:
- Check security group rules
- Check PM2 is running: `pm2 list`
- Check logs: `pm2 logs healthchain-backend`
- Check port: `netstat -tulpn | grep 5000`

### Frontend build fails:
- Check build logs in Amplify
- Verify Node.js version
- Check environment variables

### Database connection fails:
- Verify AWS credentials
- Check DynamoDB table exists
- Verify region matches

---

## 📚 Next Steps

1. **Deploy backend to EC2** (follow Option 2)
2. **Deploy frontend to Amplify** (follow Option 1)
3. **Test everything**
4. **Add custom domain** (optional)
5. **Setup monitoring** (optional)

Would you like me to:
1. Create deployment scripts?
2. Help with specific deployment step?
3. Setup CI/CD pipeline?

Let me know which deployment method you prefer! 🚀


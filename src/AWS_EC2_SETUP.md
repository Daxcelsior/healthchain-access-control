# AWS EC2 Setup Guide - Host Your Backend

## Deploy Your Express Backend to EC2

### Step 1: Launch EC2 Instance

1. Go to [EC2 Console](https://console.aws.amazon.com/ec2/)
2. Click "Launch Instance"
3. Configure:
   - **Name:** `healthchain-backend`
   - **AMI:** Amazon Linux 2023 (free tier eligible)
   - **Instance type:** t2.micro (free tier)
   - **Key pair:** Create new or use existing
   - **Network settings:** 
     - Allow SSH (port 22)
     - Allow HTTP (port 80)
     - Allow HTTPS (port 443)
     - Allow Custom TCP (port 5000) - for your backend
   - **Storage:** 8 GB (free tier: 30 GB)
4. Click "Launch Instance"

### Step 2: Connect to EC2

**Using SSH:**
```bash
ssh -i your-key.pem ec2-user@your-ec2-ip
```

**Or use AWS Systems Manager Session Manager** (no SSH key needed)

### Step 3: Install Node.js

```bash
# On EC2 instance
sudo yum update -y
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
node --version
```

### Step 4: Install Git and Clone Your Repo

```bash
sudo yum install git -y
git clone your-repo-url
cd healthchain-access-control/src/backend
npm install
```

### Step 5: Set Up Environment Variables

```bash
nano .env
```

Add your environment variables:
```env
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
DYNAMODB_TABLE_NAME=healthchain-users
JWT_SECRET=your-secret
PINATA_JWT=your-pinata-jwt
PORT=5000
```

### Step 6: Install PM2 (Process Manager)

```bash
npm install -g pm2
pm2 start server.js --name healthchain-backend
pm2 save
pm2 startup  # Auto-start on reboot
```

### Step 7: Configure Security Group

1. Go to EC2 → Security Groups
2. Edit inbound rules
3. Add rule:
   - Type: Custom TCP
   - Port: 5000
   - Source: 0.0.0.0/0 (or your IP for security)

### Step 8: Test Your Backend

Visit: `http://your-ec2-ip:5000/api/health`

---

## Option: Use Nginx as Reverse Proxy

For production, use Nginx:

```bash
sudo yum install nginx -y
sudo systemctl start nginx
```

Configure Nginx to proxy to your backend on port 5000.

---

## Cost

**Free Tier:**
- 750 hours/month of t2.micro
- 30 GB EBS storage
- **For 12 months**

**After free tier:** ~$8-15/month

---

## Alternative: Use AWS Elastic Beanstalk

Easier deployment (handles everything automatically):

1. Install EB CLI: `pip install awsebcli`
2. Initialize: `eb init`
3. Deploy: `eb create`
4. Update: `eb deploy`

Would you like me to create a deployment script?


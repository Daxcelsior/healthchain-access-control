# AWS Amplify Setup Guide - Easiest Full-Stack Deployment

## Deploy Frontend + Backend with AWS Amplify

Amplify is the **easiest** way to deploy your full-stack app on AWS.

### Benefits:
- ✅ Automatic deployments from GitHub
- ✅ Hosts both frontend and backend
- ✅ Free SSL certificate
- ✅ Custom domain support
- ✅ 15 GB storage free (always free)
- ✅ Automatic CI/CD

---

## Step 1: Push Code to GitHub

1. Create GitHub repository
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-github-repo-url
git push -u origin main
```

## Step 2: Deploy Frontend with Amplify

1. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
2. Click "New app" → "Host web app"
3. Connect to GitHub
4. Select your repository
5. Configure build:
   - **App name:** `healthchain-app`
   - **Branch:** `main`
   - **Build settings:** Amplify will auto-detect React
6. Add environment variables:
   ```
   REACT_APP_API_URL=https://your-backend-url/api
   ```
7. Click "Save and deploy"

**That's it!** Your frontend will be live in ~5 minutes.

---

## Step 3: Deploy Backend with Amplify (Serverless)

### Option A: Use Amplify Functions (Lambda)

1. In Amplify Console → Your app
2. Go to "Backend environments"
3. Click "Add backend"
4. Choose "REST API" or "GraphQL API"
5. Add your Express routes as Lambda functions

### Option B: Keep Backend on EC2

Deploy backend separately on EC2 (see EC2_SETUP.md), then update frontend API URL.

---

## Step 4: Connect Frontend to Backend

Update your frontend `.env`:
```env
REACT_APP_API_URL=https://your-ec2-ip:5000/api
# or
REACT_APP_API_URL=https://your-amplify-backend-url/api
```

---

## Custom Domain (Optional)

1. In Amplify → Domain management
2. Add your domain
3. Amplify provides free SSL certificate
4. Your app will be at: `https://yourdomain.com`

---

## Automatic Deployments

Every time you push to GitHub:
- ✅ Amplify automatically builds
- ✅ Runs tests (if configured)
- ✅ Deploys to production
- ✅ Sends notifications

---

## Cost

**Free Tier:**
- 15 GB storage
- 5 GB data transfer
- 1,000 build minutes/month
- **Always free** (generous limits)

**After free tier:** Very affordable, pay-as-you-go

---

## Quick Start Commands

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init

# Add hosting
amplify add hosting

# Deploy
amplify publish
```

---

This is the **easiest** way to deploy your full-stack app! 🚀


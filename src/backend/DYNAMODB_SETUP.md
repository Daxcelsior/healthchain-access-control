# DynamoDB Setup Guide

## Step 1: Create DynamoDB Table

### Option A: Using AWS Console (Easiest)

1. Go to [AWS Console](https://console.aws.amazon.com/)
2. Search for "DynamoDB" and click on it
3. Click "Create table"
4. Fill in the form:
   - **Table name:** `healthchain-users`
   - **Partition key:** `PK` (String)
   - **Sort key:** `SK` (String)
   - **Table settings:** Use default settings
   - **Capacity settings:** On-demand (recommended for free tier)
5. Click "Create table"

### Option B: Using AWS CLI

```bash
aws dynamodb create-table \
  --table-name healthchain-users \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
  --key-schema \
    AttributeName=PK,KeyType=HASH \
    AttributeName=SK,KeyType=RANGE \
  --billing-mode PAY_PER_REQUEST
```

## Step 2: Create Global Secondary Index (GSI)

We need a GSI to query users by email.

1. In DynamoDB console, click on your table `healthchain-users`
2. Go to "Indexes" tab
3. Click "Create index"
4. Fill in:
   - **Partition key:** `GSI1PK` (String)
   - **Sort key:** `GSI1SK` (String)
   - **Index name:** `GSI1`
5. Click "Create index"

### Using AWS CLI:

```bash
aws dynamodb update-table \
  --table-name healthchain-users \
  --attribute-definitions \
    AttributeName=PK,AttributeType=S \
    AttributeName=SK,AttributeType=S \
    AttributeName=GSI1PK,AttributeType=S \
    AttributeName=GSI1SK,AttributeType=S \
  --global-secondary-index-updates \
    "[{\"Create\":{\"IndexName\":\"GSI1\",\"KeySchema\":[{\"AttributeName\":\"GSI1PK\",\"KeyType\":\"HASH\"},{\"AttributeName\":\"GSI1SK\",\"KeyType\":\"RANGE\"}],\"Projection\":{\"ProjectionType\":\"ALL\"},\"BillingMode\":\"PAY_PER_REQUEST\"}}]"
```

## Step 3: Get AWS Credentials

1. Go to AWS Console
2. Click your name (top right) → "Security credentials"
3. Scroll to "Access keys" section
4. Click "Create access key"
5. Choose "Application running outside AWS" (for local development)
6. Click "Next" → "Create access key"
7. **IMPORTANT:** Copy both:
   - Access Key ID
   - Secret Access Key (you won't see it again!)

## Step 4: Update Environment Variables

Edit `backend/.env`:

```env
# Remove MONGODB_URI (no longer needed)

# Add AWS credentials
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your-access-key-id-here
AWS_SECRET_ACCESS_KEY=your-secret-access-key-here
DYNAMODB_TABLE_NAME=healthchain-users

# Keep these
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d
PORT=5000
PINATA_JWT=your-pinata-jwt-token
```

## Step 5: Install Dependencies

```bash
cd backend
npm install
```

This will install:
- `@aws-sdk/client-dynamodb`
- `@aws-sdk/lib-dynamodb`

## Step 6: Test the Setup

```bash
npm run dev
```

You should see:
```
✅ Connected to DynamoDB
Server is running on port 5000
```

## Cost

**DynamoDB Free Tier:**
- 25 GB storage (always free)
- 25 read units per second
- 25 write units per second
- 2.5 million stream read requests

**For a student project:** You'll likely stay within the free tier!

## Troubleshooting

**Error: "Cannot find module '@aws-sdk/client-dynamodb'"**
- Run `npm install` in the backend directory

**Error: "Access Denied" or "Invalid credentials"**
- Check your AWS credentials in `.env`
- Make sure Access Key ID and Secret Access Key are correct
- Verify your AWS account has DynamoDB permissions

**Error: "Table not found"**
- Make sure table name in `.env` matches the table you created
- Check that the table exists in the correct AWS region

**Error: "GSI not found"**
- Make sure you created the GSI1 index
- Wait a few minutes after creating the index (it takes time to build)

## Next Steps

Once DynamoDB is set up:
1. ✅ Your backend will use DynamoDB instead of MongoDB
2. ✅ No frontend changes needed
3. ✅ Same API endpoints work the same way
4. ✅ All authentication features work identically

You're all set! 🎉


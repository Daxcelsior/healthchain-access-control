# Quick Start with MongoDB

## Your Connection String

You provided:
```
mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/?appName=Cluster0
```

## Step 1: Update .env File

Edit `backend/.env` and add:

```env
MONGODB_URI=mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/healthchain?retryWrites=true&w=majority
JWT_SECRET=your-random-secret-key-here
JWT_EXPIRES_IN=7d
PORT=5000
PINATA_JWT=your-pinata-token-here
```

**Important:** 
- Added `/healthchain` before `?` (database name)
- Changed `?appName=Cluster0` to `?retryWrites=true&w=majority`

## Step 2: Install Dependencies

```bash
cd backend
npm install
```

## Step 3: Start Backend

```bash
npm run dev
```

You should see:
```
✅ Connected to MongoDB
Server is running on port 5000
```

## Step 4: Whitelist Your IP (If Needed)

If you get connection errors:

1. Go to MongoDB Atlas
2. Click "Network Access"
3. Click "Add IP Address"
4. Click "Allow Access from Anywhere" (for development)
   OR add your specific IP address

## That's It!

Your backend is now connected to MongoDB! 🎉


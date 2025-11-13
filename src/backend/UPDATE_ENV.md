# Update Your .env File

## Your MongoDB Connection String

You provided:
```
mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/?appName=Cluster0
```

## Updated Connection String (Add Database Name)

Update your `backend/.env` file with:

```env
MONGODB_URI=mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/healthchain?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
PORT=5000
PINATA_JWT=your-pinata-jwt-token
```

**What changed:**
- Added `/healthchain` before the `?` (this is the database name)
- Changed `?appName=Cluster0` to `?retryWrites=true&w=majority` (better connection options)

## Quick Steps

1. Open `backend/.env` file
2. Replace the entire `MONGODB_URI` line with:
   ```
   MONGODB_URI=mongodb+srv://Healthcare:baba123456789@cluster0.esjkhac.mongodb.net/healthchain?retryWrites=true&w=majority
   ```
3. Save the file
4. Run: `npm run dev`

You should see: `✅ Connected to MongoDB`


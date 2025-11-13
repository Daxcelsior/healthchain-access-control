# Audit Log Fix - How to Use

## What I Fixed

1. ✅ Added Patient ID input field directly in Audit Log Viewer
2. ✅ You can now enter Patient ID in the Audit Logs tab
3. ✅ Added "Load Logs" button to manually fetch logs
4. ✅ Better error messages and guidance

## How to Use Audit Logs Now

### Option 1: Enter Patient ID in Audit Logs Tab (Easiest)

1. Go to **"Audit Logs"** tab
2. You'll see a Patient ID input field at the top
3. Enter your Patient ID (e.g., "PATIENT001")
4. Click **"Load Logs"** button
5. Logs will appear if they exist

### Option 2: Enter Patient ID in Blockchain Tab

1. Go to **"Blockchain"** tab
2. Enter Patient ID in the input field
3. Go to **"Audit Logs"** tab
4. Logs will load automatically

## Important: Generate Audit Logs First!

**Audit logs are only created when you perform actions:**

1. **Register Patient** - Creates a "REGISTER" log
2. **Grant Access** - Creates a "GRANT" log
3. **Revoke Access** - Creates a "REVOKE" log
4. **Upload File** - Creates a "FILE_STORED" log
5. **Check Access** - Creates an "ACCESS_CHECK" log
6. **Emergency Request** - Creates an "EMERGENCY_REQUEST" log

## Step-by-Step: Get Audit Logs Working

### Step 1: Register a Patient
1. Go to **"Blockchain"** tab
2. Enter Patient ID: `TEST001`
3. Click **"Register Patient"**
4. Wait for transaction to confirm

### Step 2: Perform Some Actions
1. Enter a Provider Address
2. Click **"Grant Access"** or **"Grant Access with Expiry"**
3. Wait for transaction

### Step 3: View Audit Logs
1. Go to **"Audit Logs"** tab
2. Enter Patient ID: `TEST001` (or it should already be there)
3. Click **"Load Logs"**
4. You should see at least 2 logs:
   - REGISTER
   - GRANT

## Troubleshooting

### "No audit logs found"
- **Solution:** Make sure you've:
  1. Registered the patient
  2. Performed at least one action (grant access, upload file, etc.)
  3. Used the exact same Patient ID

### "Patient does not exist"
- **Solution:** Register the patient first in the Blockchain tab

### "Smart contract not loaded"
- **Solution:** Connect your MetaMask wallet

### Still not working?
1. Open browser console (F12)
2. Check for error messages
3. Make sure contract is deployed
4. Verify you're on the correct network

## Quick Test

Try this to verify it works:

1. **Blockchain Tab:**
   - Patient ID: `TEST001`
   - Click "Register Patient"
   - Provider Address: `0x1234567890123456789012345678901234567890`
   - Click "Grant Access"

2. **Audit Logs Tab:**
   - Patient ID: `TEST001`
   - Click "Load Logs"
   - Should see 2 logs!

---

**The Patient ID input is now in the Audit Logs tab, so you can enter it directly there!** ✅



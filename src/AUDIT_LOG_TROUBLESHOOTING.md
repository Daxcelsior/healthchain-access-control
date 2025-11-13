# Audit Log Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: "No audit logs found" or Empty Table

**Possible Causes:**
1. Patient not registered yet
2. No actions performed (no logs generated)
3. Wrong Patient ID

**Solutions:**
1. **Register the patient first:**
   - Go to "Blockchain" tab
   - Enter Patient ID (e.g., "PATIENT001")
   - Click "Register Patient"
   - Wait for transaction to complete

2. **Perform some actions to generate logs:**
   - Grant access to a provider
   - Upload a file
   - Check access
   - These actions create audit logs

3. **Verify Patient ID:**
   - Make sure you're using the exact same Patient ID
   - Patient ID is case-sensitive
   - Check the Patient ID in the Blockchain section

---

### Issue 2: "Smart contract not loaded"

**Solution:**
1. Make sure MetaMask is installed
2. Connect your wallet
3. Make sure you're on the correct network (Ganache/local network)
4. Refresh the page

---

### Issue 3: "Please enter a Patient ID"

**Solution:**
1. Go to "Blockchain" tab
2. Enter a Patient ID in the input field
3. The Patient ID will be used for all blockchain operations
4. Then go back to "Audit Logs" tab

---

### Issue 4: "Patient does not exist"

**Solution:**
1. Register the patient first:
   - Go to "Blockchain" tab
   - Enter Patient ID
   - Click "Register Patient"
   - Wait for transaction confirmation

---

### Issue 5: "Unauthorized" Error

**Solution:**
1. Make sure you're using the patient's wallet address
2. Or make sure you have been granted access as a provider
3. Check that the Patient ID is correct

---

## Step-by-Step: Getting Audit Logs to Work

### Step 1: Setup
1. ✅ Connect MetaMask wallet
2. ✅ Make sure contract is deployed
3. ✅ Make sure you're on the correct network

### Step 2: Register Patient
1. Go to "Blockchain" tab
2. Enter Patient ID (e.g., "PATIENT001")
3. Click "Register Patient"
4. Wait for transaction to confirm

### Step 3: Generate Audit Logs
Perform some actions:
1. **Grant Access:**
   - Enter Provider Address
   - Click "Grant Access" or "Grant Access with Expiry"
   - Wait for transaction

2. **Upload File:**
   - Go to "Files" tab
   - Upload a file
   - This creates a "FILE_STORED" log

3. **Check Access:**
   - Go to "Blockchain" tab
   - Click "Check Access"
   - This creates an "ACCESS_CHECK" log

### Step 4: View Audit Logs
1. Go to "Audit Logs" tab
2. Make sure Patient ID is set (same one you registered)
3. Click "Refresh" button
4. You should see the logs!

---

## Testing Checklist

- [ ] MetaMask connected
- [ ] Contract deployed and loaded
- [ ] Patient ID entered in Blockchain section
- [ ] Patient registered on blockchain
- [ ] At least one action performed (grant access, upload file, etc.)
- [ ] Patient ID matches in Audit Logs tab
- [ ] No console errors

---

## Debug Steps

### 1. Check Browser Console
Open browser DevTools (F12) and check:
- Any error messages?
- Check the console logs when fetching audit logs

### 2. Verify Contract
```javascript
// In browser console
contract.methods.getPatientAuditTrail("PATIENT001").call()
  .then(console.log)
  .catch(console.error)
```

### 3. Verify Patient Exists
```javascript
// In browser console
contract.methods.patients("PATIENT001").call()
  .then(console.log)
  .catch(console.error)
```

---

## Expected Behavior

**When working correctly:**
- Shows Patient ID at top
- Displays table with audit logs
- Shows timestamp, action type, provider, status, details
- Filters work
- Pagination works

**When not working:**
- Shows error message explaining the issue
- Provides guidance on what to do

---

## Still Not Working?

1. **Check the console** for detailed error messages
2. **Verify contract is deployed** to your network
3. **Make sure Patient ID matches** exactly
4. **Try registering a new patient** and performing actions
5. **Check network connection** (Ganache/local network)

---

## Quick Test

1. Register patient: "TEST001"
2. Grant access to any address
3. Go to Audit Logs tab
4. Should see at least 2 logs:
   - REGISTER
   - GRANT

If you see these, it's working! ✅


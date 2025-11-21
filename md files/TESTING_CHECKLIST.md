# Quick Testing Checklist ✅

## Backend Testing

### Basic Setup
- [ ] MongoDB connection successful
- [ ] Server starts on port 5000
- [ ] Health check endpoint works (`/api/health`)

### Authentication
- [ ] User registration works
- [ ] User login works
- [ ] Get current user works (`/api/auth/me`)
- [ ] JWT token validation works
- [ ] Error handling for invalid credentials

### IPFS Upload
- [ ] File upload works
- [ ] Image validation works
- [ ] File size limit enforced (10MB)
- [ ] IPFS hash returned
- [ ] Authentication required for upload

---

## Frontend Testing

### Authentication UI
- [ ] Registration form works
- [ ] Login form works
- [ ] Form validation works
- [ ] Error messages display
- [ ] Success redirects work

### Main Features
- [ ] IPFS upload component works
- [ ] File list displays correctly
- [ ] Audit log viewer works
- [ ] Blockchain integration works
- [ ] Patient/provider registration works

---

## Smart Contract Testing

### Setup
- [ ] Ganache running
- [ ] Contract compiles
- [ ] Contract deploys

### Functions
- [ ] Patient registration works
- [ ] Access grant works
- [ ] Access check works
- [ ] File hash storage works
- [ ] Audit logs work
- [ ] Emergency access works

---

## Integration Testing

- [ ] Complete user flow (register → login → use app)
- [ ] File upload flow (upload → store on blockchain → view)
- [ ] Access control flow (grant → check → use)
- [ ] Error handling across all layers

---

## Quick Test Commands

```bash
# Test backend health
curl http://localhost:5000/api/health

# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"test123","name":"Test","role":"patient"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

---

## Common Issues

- **MongoDB connection fails:** Check `.env` file and IP whitelist
- **Token errors:** Check JWT_SECRET in `.env`
- **IPFS upload fails:** Check PINATA_JWT in `.env`
- **Contract errors:** Check Ganache is running
- **Frontend errors:** Check backend is running

---

**Mark items as you test them!** ✅


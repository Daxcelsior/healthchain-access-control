const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const { authenticateToken } = require('../middleware/auth');

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept only image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Pinata IPFS configuration
const PINATA_API_KEY = process.env.PINATA_API_KEY;
const PINATA_SECRET_KEY = process.env.PINATA_SECRET_KEY;
const PINATA_JWT = process.env.PINATA_JWT;

// Upload image to IPFS using Pinata
router.post('/upload', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image file provided' });
    }

    if (!PINATA_JWT && (!PINATA_API_KEY || !PINATA_SECRET_KEY)) {
      return res.status(500).json({ 
        message: 'IPFS service not configured. Please set PINATA_JWT or PINATA_API_KEY and PINATA_SECRET_KEY in environment variables.' 
      });
    }

    // Create form data for Pinata
    const formData = new FormData();
    formData.append('file', req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype
    });

    // Add metadata
    const metadata = JSON.stringify({
      name: req.file.originalname,
      description: `Image uploaded by user ${req.user.userId}`
    });
    formData.append('pinataMetadata', metadata);

    // Pinata options
    const pinataOptions = JSON.stringify({
      cidVersion: 0
    });
    formData.append('pinataOptions', pinataOptions);

    // Upload to Pinata
    let pinataResponse;
    if (PINATA_JWT) {
      // Using JWT authentication (recommended)
      pinataResponse = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Authorization': `Bearer ${PINATA_JWT}`,
            ...formData.getHeaders()
          }
        }
      );
    } else {
      // Using API key authentication (legacy)
      pinataResponse = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'pinata_api_key': PINATA_API_KEY,
            'pinata_secret_api_key': PINATA_SECRET_KEY,
            ...formData.getHeaders()
          }
        }
      );
    }

    const ipfsHash = pinataResponse.data.IpfsHash;
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;

    res.json({
      message: 'Image uploaded to IPFS successfully',
      ipfsHash,
      ipfsUrl,
      pinataUrl: `https://pinata.cloud/ipfs/${ipfsHash}`
    });
  } catch (error) {
    console.error('IPFS upload error:', error.response?.data || error.message);
    res.status(500).json({ 
      message: 'Failed to upload image to IPFS',
      error: error.response?.data || error.message 
    });
  }
});

// Get IPFS file info (optional)
router.get('/info/:hash', authenticateToken, async (req, res) => {
  try {
    const { hash } = req.params;
    const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${hash}`;
    
    res.json({
      hash,
      ipfsUrl,
      pinataUrl: `https://pinata.cloud/ipfs/${hash}`
    });
  } catch (error) {
    console.error('IPFS info error:', error);
    res.status(500).json({ message: 'Failed to get IPFS info' });
  }
});

module.exports = router;


import React, { useState } from 'react';
import { ipfsAPI } from '../services/api';
import './IPFSUpload.css';

const IPFSUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setError('File size must be less than 10MB');
        return;
      }
      setSelectedFile(file);
      setError('');
      setResult(null);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Please select an image file');
      return;
    }

    setUploading(true);
    setError('');
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await ipfsAPI.uploadImage(formData);
      setResult(response.data);
      setSelectedFile(null);
      setPreview(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setResult(null);
    setError('');
  };

  return (
    <div className="ipfs-upload-container">
      <div className="ipfs-upload-card">
        <h2>Upload Image to IPFS</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        {result && (
          <div className="success-message">
            <h3>Upload Successful!</h3>
            <p><strong>IPFS Hash:</strong> {result.ipfsHash}</p>
            <p><strong>IPFS URL:</strong> 
              <a href={result.ipfsUrl} target="_blank" rel="noopener noreferrer">
                {result.ipfsUrl}
              </a>
            </p>
            <p><strong>Pinata URL:</strong> 
              <a href={result.pinataUrl} target="_blank" rel="noopener noreferrer">
                {result.pinataUrl}
              </a>
            </p>
            {result.ipfsUrl && (
              <div className="image-preview">
                <img src={result.ipfsUrl} alt="Uploaded" />
              </div>
            )}
            <button onClick={handleReset} className="reset-button">
              Upload Another Image
            </button>
          </div>
        )}

        {!result && (
          <>
            <div className="file-input-container">
              <input
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleFileChange}
                className="file-input"
              />
              <label htmlFor="file-input" className="file-input-label">
                {selectedFile ? selectedFile.name : 'Choose Image File'}
              </label>
            </div>

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
                <p className="file-info">
                  {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                </p>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={!selectedFile || uploading}
              className="upload-button"
            >
              {uploading ? 'Uploading...' : 'Upload to IPFS'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IPFSUpload;


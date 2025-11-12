import React, { useState, useEffect } from "react";
import "./App.css";
import Web3 from "web3";
import ContractArtifact from "./PatientDataAccess.json";
import Login from "./components/Login";
import Register from "./components/Register";
import IPFSUpload from "./components/IPFSUpload";
import { authAPI } from "./services/api";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [patientID, setPatientID] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [message, setMessage] = useState("");
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [activeTab, setActiveTab] = useState("blockchain"); // 'blockchain' or 'ipfs'

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(savedUser));
      // Verify token is still valid
      authAPI.getMe().catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsAuthenticated(false);
        setUser(null);
      });
    }
  }, []);

  useEffect(() => {
    const loadBlockchain = async () => {
      if (window.ethereum) {
        try {
          const _web3 = new Web3(window.ethereum);
          await window.ethereum.request({ method: "eth_requestAccounts" });
          const accounts = await _web3.eth.getAccounts();
          const networkId = await _web3.eth.net.getId();
          const deployedNetwork = ContractArtifact.networks[networkId];

          if (deployedNetwork) {
            const instance = new _web3.eth.Contract(
              ContractArtifact.abi,
              deployedNetwork.address
            );
            setWeb3(_web3);
            setContract(instance);
            setAccount(accounts[0]);
            if (!message) {
              setMessage("Wallet connected.");
            }
          } else {
            setMessage("Smart contract not deployed to detected network.");
          }
        } catch (err) {
          setMessage("Error connecting to MetaMask.");
          console.error(err);
        }
      } else {
        setMessage("Please install MetaMask.");
      }
    };

    loadBlockchain();
  }, []);

  const handleLoginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowRegister(false);
  };

  const handleRegisterSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowRegister(false);
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const registerPatient = async () => {
    try {
      await contract.methods
        .registerPatient(patientID, "Daksh", 25)
        .send({ from: account });
      setMessage("Patient registered successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to register patient.");
    }
  };

  const grantAccess = async () => {
    try {
      await contract.methods
        .grantAccess(patientID, providerAddress)
        .send({ from: account });
      setMessage("Access granted successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to grant access.");
    }
  };

  const revokeAccess = async () => {
    try {
      await contract.methods
        .revokeAccess(patientID, providerAddress)
        .send({ from: account });
      setMessage("Access revoked successfully.");
    } catch (error) {
      console.error(error);
      setMessage("Failed to revoke access.");
    }
  };

  const checkAccess = async () => {
    try {
      const result = await contract.methods
        .checkAccess(patientID, providerAddress)
        .call();
      setMessage(`Access for provider: ${result}`);
    } catch (error) {
      console.error(error);
      setMessage("Failed to check access.");
    }
  };

  // Show login/register if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="App">
        {showRegister ? (
          <Register onRegisterSuccess={handleRegisterSuccess} />
        ) : (
          <Login onLoginSuccess={handleLoginSuccess} />
        )}
        <div className="auth-toggle">
          {showRegister ? (
            <p>
              Already have an account?{" "}
              <button onClick={() => setShowRegister(false)}>Login</button>
            </p>
          ) : (
            <p>
              Don't have an account?{" "}
              <button onClick={() => setShowRegister(true)}>Register</button>
            </p>
          )}
        </div>
      </div>
    );
  }

  // Main app content when authenticated
  return (
    <div className="App">
      <header className="app-header">
        <h1>HealthChain Access Control</h1>
        <div className="user-info">
          <span>Welcome, {user?.username || user?.email}!</span>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </div>
      </header>

      <div className="tabs">
        <button
          className={activeTab === "blockchain" ? "tab active" : "tab"}
          onClick={() => setActiveTab("blockchain")}
        >
          Blockchain
        </button>
        <button
          className={activeTab === "ipfs" ? "tab active" : "tab"}
          onClick={() => setActiveTab("ipfs")}
        >
          IPFS Upload
        </button>
      </div>

      {activeTab === "blockchain" && (
        <div className="blockchain-section">
          <h2>Patient Data Access DApp</h2>
          {message && <p className="message">{message}</p>}
          <p className="account-info">Connected Account: {account || "Not connected"}</p>

          <div className="form-section">
            <input
              type="text"
              placeholder="Patient ID"
              value={patientID}
              onChange={(e) => setPatientID(e.target.value)}
              className="input-field"
            />
            <br />
            <input
              type="text"
              placeholder="Provider Address"
              value={providerAddress}
              onChange={(e) => setProviderAddress(e.target.value)}
              className="input-field"
            />
            <br /><br />
            <div className="button-group">
              <button onClick={registerPatient} className="action-button">
                Register Patient
              </button>
              <button onClick={grantAccess} className="action-button">
                Grant Access
              </button>
              <button onClick={revokeAccess} className="action-button">
                Revoke Access
              </button>
              <button onClick={checkAccess} className="action-button">
                Check Access
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === "ipfs" && (
        <div className="ipfs-section">
          <IPFSUpload />
        </div>
      )}
    </div>
  );
}

export default App;

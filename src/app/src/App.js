import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import Web3 from "web3";
import ContractArtifact from "./PatientDataAccess.json";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState("");
  const [patientID, setPatientID] = useState("");
  const [providerAddress, setProviderAddress] = useState("");
  const [message, setMessage] = useState("");

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
            setMessage("Wallet connected.");
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

  return (
    <div className="App">
      <h2>Patient Data Access DApp</h2>
      <p>{message}</p>
      <p>Connected Account: {account}</p>

      <input
        type="text"
        placeholder="Patient ID"
        value={patientID}
        onChange={(e) => setPatientID(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Provider Address"
        value={providerAddress}
        onChange={(e) => setProviderAddress(e.target.value)}
      />
      <br /><br />
      <button onClick={registerPatient}>Register Patient</button>
      <button onClick={grantAccess}>Grant Access</button>
      <button onClick={revokeAccess}>Revoke Access</button>
      <button onClick={checkAccess}>Check Access</button>
    </div>
  );
}

export default App;
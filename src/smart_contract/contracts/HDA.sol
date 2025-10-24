// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract PatientDataAccess {
    
    // Patient structure containing health data and access permissions
    struct Patient {
        string name;
        uint age;
        address patientAddress;
        mapping(address => bool) accessList;
        bool exists;
    }

    // Mapping of patient IDs to Patient struct
    mapping(string => Patient) private patients;

    // Registers a new patient
    function registerPatient(string memory patientID, string memory name, uint age) public {
        // Avoid re-registering
        if (patients[patientID].exists) {
            return;
        }

        Patient storage newPatient = patients[patientID];
        newPatient.name = name;
        newPatient.age = age;
        newPatient.patientAddress = msg.sender;
        newPatient.exists = true;
    }

    // Allows patient to grant access to a healthcare provider
    function grantAccess(string memory patientID, address providerID) public {
        Patient storage patient = patients[patientID];
        
        if (!patient.exists) {
            return;
        }
        
        if (patient.patientAddress != msg.sender) {
            return;
        }
        patient.accessList[providerID] = true;
    }

    // Allows patient to revoke access from a healthcare provider
    function revokeAccess(string memory patientID, address providerID) public {
        Patient storage patient = patients[patientID];
        
        if (!patient.exists) {
            return;
        }
        
        if (patient.patientAddress != msg.sender) {
            return;
        }
        patient.accessList[providerID] = false;
    }

    // Checks if a provider has access to a patient's record
    function checkAccess(string memory patientID, address providerID) public view returns (bool) {
        Patient storage patient = patients[patientID];

        if (!patient.exists) {
            return false;
        }
        return patient.accessList[providerID];
    }
}
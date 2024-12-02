// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.8.2 <0.9.0; 

import { Patient } from './patient.sol';

contract Admin {
    address admin_address;

    constructor() {
        admin_address = msg.sender;
    }

    modifier isAdmin 
    { 
        require(admin_address == msg.sender, "Not admin");
        _;
    }

    uint count_patients = 0;
    mapping (uint => address) patientContracts;

    function createPatientContract(string memory _fio, string memory _date_birth, string memory _city) public isAdmin {
        Patient newPatient = new Patient(_fio, _date_birth, _city);
        patientContracts[count_patients] = address(newPatient);
        count_patients ++;
    }

    function getPatientContract(uint _patient_id) public view returns(address){
        return patientContracts[_patient_id];
    }
}
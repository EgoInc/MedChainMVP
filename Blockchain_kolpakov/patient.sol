// SPDX-License-Identifier: GPL-3.0 
pragma solidity >=0.8.2 <0.9.0; 

contract Patient {

    constructor(string memory _fio, string memory _date_birth, string memory _city){ 
        fio = _fio; 
        date_birth = _date_birth;
        city = _city;
        patient_address = msg.sender;
    } 

    modifier isPatient 
    { 
        require(patient_address == msg.sender, "Not patient");
        _;
    }

    string fio;
    string date_birth;
    string city;
    address patient_address;

    struct MedicalRecord {
        uint date;
        address doctor;
        string diagnose;
        string complaint;
    }

    mapping (address => bool) public isDoctorApprove;
    mapping (uint => MedicalRecord) medicalRecords;
    uint numberOfRecords = 0;

    // функции для управления списком авторизованных врачей
    function addDoctor(address _doctorAddress) public isPatient {
        isDoctorApprove[_doctorAddress] = true;
    }
    function removeDoctor(address _doctorAddress) public isPatient {
        isDoctorApprove[_doctorAddress] = false;
    }

    //  функции для добавления новой записи в медицинскую историю пациента
    function addMedicalRecord(uint _date, string memory _diagnose, string memory _complaint) public {
        require(isDoctorApprove[msg.sender] == true, "Only authorized doctors allowed");

        medicalRecords[numberOfRecords] = MedicalRecord(_date, msg.sender, _diagnose, _complaint);
        numberOfRecords ++;
    }

    // Сколько записей в БЧ?
    function getNumberOfRecords() public view returns(uint) {
        return numberOfRecords;
    }
    // Получить мед.запись по id
    function getRecordById(uint _id) public view returns(MedicalRecord memory) {
        return medicalRecords[_id];
    }

    // функция получения информации о пациенте (ФИО, дата рождения).
    function getPatientData() public view returns(string memory, string memory, address) {
        return (fio, date_birth, patient_address);
    }
}
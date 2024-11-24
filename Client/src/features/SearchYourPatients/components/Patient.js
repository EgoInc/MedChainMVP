import React from "react";
import Toggle from "../../FromDoctor/components/Toggle";
import PatientAvatar from "../../FromDoctorRequests/components/PatientAvatar";
import "../css/Patient.css";
import { useNavigate } from "react-router-dom";

const Patient = ({ lastName, name, secondName, dateOfBitth }) => {
  const navigate = useNavigate();
  return (
    <div className="search-your-patient">
      <PatientAvatar />
      <div className="patient-info">
        <h3>
          {lastName} {name} {secondName}
        </h3>
        <p>{dateOfBitth}</p>
      </div>
      <button onClick={() => navigate("/doctor/:doctorId/patient/:patientId")}>
        <Toggle />
      </button>
    </div>
  );
};

export default Patient;

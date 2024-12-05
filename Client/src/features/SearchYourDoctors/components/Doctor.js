import React from "react";
import Toggle from "../../FromPatient/components/Toggle";
import DoctorAvatar from "../../FromPatientRequests/components/DoctorAvatar";
import "../css/Doctor.css";
import { useNavigate } from "react-router-dom";

const Doctor = ({ lastName, name, secondName, location }) => {
  const navigate = useNavigate();
  return (
    <div className="search-your-doctor">
      <DoctorAvatar />
      <div className="doctor-info">
        <h3>
          {lastName} {name} {secondName}
        </h3>
        <p>{location}</p>
      </div>
      <button onClick={() => navigate("/patient/:patientId/doctor/:doctorId")}>
        <Toggle />
      </button>
    </div>
  );
};

export default Doctor;
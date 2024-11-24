import React, { useState } from "react";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/MedCardHistory.css";
import { useNavigate } from "react-router-dom";

const MedCardHistory = ({ isRequestSent }) => {
  const navigate = useNavigate();
  const openMedicalHistory = () => {
    navigate("/doctor/:doctorId/patient/:patientId/medicalRecord");
  };
  const getClassStatus = isRequestSent ? "enable" : "disable";

  return (
    <div className={`med-card-history ${getClassStatus}`}>
      <p>История мед. карты</p>
      {isRequestSent && (
        <button onClick={openMedicalHistory}>
          <Toggle />
        </button>
      )}
    </div>
  );
};

export default MedCardHistory;

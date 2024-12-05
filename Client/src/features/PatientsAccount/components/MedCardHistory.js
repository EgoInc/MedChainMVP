import React, { useState } from "react";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/MedCardHistory.css";
import { useNavigate, useParams } from "react-router-dom";

const MedCardHistory = ({ isRequestSent }) => {
  const { doctorId } = useParams();
  const { patientId } = useParams();
  const navigate = useNavigate();
  const pathToMedicalRecord = `/doctor/${doctorId}/patient/${patientId}/medical-record`;
  const openMedicalHistory = () => {
    navigate(pathToMedicalRecord);
  };
  const getClassStatus = isRequestSent ? "enable" : "disable";

  return (
    <div
      className={`med-card-history ${getClassStatus}`}
      onClick={openMedicalHistory}
    >
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

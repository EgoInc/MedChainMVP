import React, { useState } from "react";
import "../css/MedicalRecord.css";
import Toggle from "./Toggle";
import { useNavigate } from "react-router-dom";

const MedicalRecord = () => {
  let [unreadNumber, setUnreadNumber] = useState(3);
  const navigate = useNavigate();
  return (
    <div className="medical-record">
      <p>История мед.карты</p>
      {unreadNumber ? <p className="show">{`+${unreadNumber}`}</p> : <p></p>}
      <button onClick={() => navigate("/patient/:patientId/medicalRecord")}>
        <Toggle />
      </button>
    </div>
  );
};

export default MedicalRecord;
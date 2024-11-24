import React from "react";
import Toggle from "./Toggle";
import "../css/Patients.css";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const navigate = useNavigate();
  return (
    <div className="patients">
      <p>Список ваших пациентов</p>
      <button onClick={() => navigate("/doctor/:doctorId/searchYourPatients")}>
        <Toggle />
      </button>
    </div>
  );
};
export default Patients;

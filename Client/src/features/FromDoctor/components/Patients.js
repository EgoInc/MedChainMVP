import React from "react";
import Toggle from "./Toggle";
import "../css/Patients.css";
import { useNavigate } from "react-router-dom";

const Patients = () => {
  const navigate = useNavigate();
  const pathToYourPatients = "/doctor/:doctorId/search/:doctorId/patients";
  return (
    <div className="patients" onClick={() => navigate(pathToYourPatients)}>
      <p>Список ваших пациентов</p>
      <button onClick={() => navigate(pathToYourPatients)}>
        <Toggle />
      </button>
    </div>
  );
};
export default Patients;

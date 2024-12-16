import React from "react";
import Toggle from "./Toggle";
import "../css/Patients.css";
import { useNavigate, useParams } from "react-router-dom";

const Patients = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const pathToYourPatients = `/doctor/${doctorId}/my-patients`;
  return (
    <div className="patients" onClick={() => navigate(pathToYourPatients)}>
      <div className="patients-text-container">
        <p>Список ваших пациентов</p>
        <button onClick={() => navigate(pathToYourPatients)}>
          <Toggle />
        </button>
      </div>
    </div>
  );
};
export default Patients;

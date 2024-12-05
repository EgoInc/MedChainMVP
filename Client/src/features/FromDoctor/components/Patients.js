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
      <p>Список ваших пациентов</p>
      <button onClick={() => navigate(pathToYourPatients)}>
        <Toggle />
      </button>
    </div>
  );
};
export default Patients;

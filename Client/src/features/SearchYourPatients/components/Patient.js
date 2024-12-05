import React from "react";
import Toggle from "../../FromDoctor/components/Toggle";
import PatientAvatar from "../../FromDoctorRequests/components/PatientAvatar";
import "../css/Patient.css";
import { useNavigate, useParams } from "react-router-dom";
import formatDate from "../../../shared/FormatDate";

const Patient = ({ name, date_of_birth, patient_id }) => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const pathToPatientCard = `/doctor/${doctorId}/patient/${patient_id}/`;

  return (
    <div
      className="search-your-patient"
      onClick={() => navigate(pathToPatientCard)}
    >
      <PatientAvatar />
      <div className="patient-info">
        <h3>{name}</h3>
        <p>{formatDate(date_of_birth)}</p>
      </div>
      <button onClick={() => navigate(pathToPatientCard)}>
        <Toggle />
      </button>
    </div>
  );
};

export default Patient;

import React, { useState } from "react";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/PatientCard.css";

const PatientCard = ({ name, patient_id, date_of_birth }) => {
  return (
    <div className="from-doctor-patient-card">
      <div className="patient-card-info">
        <h4>{name}</h4>
        <p>id: {patient_id}</p>
        <p>Дата рождения: {date_of_birth}</p>
      </div>
    </div>
  );
};

export default PatientCard;

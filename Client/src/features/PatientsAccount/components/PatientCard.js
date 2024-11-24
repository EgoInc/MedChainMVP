import React, { useState } from "react";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/PatientCard.css";

const PatientCard = ({ lastName, name, secondName, id, dateOfBirth }) => {
  return (
    <div className="patient-card">
      <div className="patient-card-info">
        <h4>
          {lastName} {name} {secondName}
        </h4>
        <p>id: {id}</p>
        <p>Дата рождения: {dateOfBirth}</p>
      </div>
    </div>
  );
};

export default PatientCard;

import React from "react";
import "../css/PatientCard.css";

const PatientCard = ({
  lastName,
  name,
  secondName,
  id,
  birthDate
}) => {
  return (
    <div className={"patient-card"}>
      <div className="text-container">
        <h4>
          {lastName} {name} {secondName}
        </h4>
        <p>id: {id}</p>
        <p>Дата рождения: {birthDate}</p>
      </div>
    </div>
  );
};

export default PatientCard;

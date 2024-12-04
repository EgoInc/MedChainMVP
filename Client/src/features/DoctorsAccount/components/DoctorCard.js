import React, { useState } from "react";
import "../css/DoctorCard.css";

const DoctorCard = ({ lastName, name, secondName, location, id, phoneNumber, email}) => {
  return (
    <div className="doctor-card">
      <div className="doctor-card-info">
        <h4>
          {lastName} {name} {secondName}
        </h4>
        <p>Название учреждения: {location}</p>
        <p>id: {id}</p>
        <p>Контактная информация:</p>
        <p>{phoneNumber}</p>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default DoctorCard;



  

  
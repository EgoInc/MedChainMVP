import React, { useState } from "react";
import "../css/DoctorCard.css";
import Toggle from "./Toggle";

const DoctorCard = ({
  name,
  location,
  doctor_id,
  phone_number,
  email,
  specialization,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`doctor-card ${isExpanded ? "expanded" : ""}`}
      onClick={toggleExpand}
    >
      <div className="text-container">
        <h4>{name}</h4>
        <p>Название учреждения: {location}</p>
        <p>Специализация: {specialization}</p>
        <p>id: {doctor_id}</p>
        {isExpanded && (
          <div className={`extra-info ${isExpanded ? "show" : ""}`}>
            <p>Контактная информация:</p>
            <p>{phone_number}</p>
            <p>{email}</p>
          </div>
        )}
      </div>
      <button
        onClick={toggleExpand}
        className={`toggle-button ${isExpanded ? "expanded" : ""}`}
      >
        <Toggle />
      </button>
    </div>
  );
};

export default DoctorCard;

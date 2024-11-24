import React, { useState } from "react";
import "../css/DoctorCard.css";
import Toggle from "./Toggle";

const DoctorCard = ({
  lastName,
  name,
  secondName,
  location,
  id,
  phoneNumber,
  email,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={`doctor-card ${isExpanded ? "expanded" : ""}`}>
      <div className="text-container">
        <h4>
          {lastName} {name} {secondName}
        </h4>
        <p>Название учреждения: {location}</p>
        <p>id: {id}</p>
        {isExpanded && (
          <div className={`extra info ${isExpanded ? "show" : ""}`}>
            <p>Контактная информация:</p>
            <p>{phoneNumber}</p>
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

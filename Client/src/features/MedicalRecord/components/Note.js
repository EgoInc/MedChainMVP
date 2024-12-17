import React, { useState } from "react";
import "../css/Note.css";
import Toggle from "../../FromDoctor/components/Toggle";

const Note = ({
  avatar,
  doctorLastName,
  doctorName,
  doctorSecondName,
  location,
  type,
  text,
}) => {
  let [isTextOpen, setTextOpen] = useState(false);

  const toggleTextOpen = () => {
    setTextOpen(!isTextOpen);
  };
  return (
    <div
      className={`note ${isTextOpen ? "expanded" : ""}`}
      onClick={toggleTextOpen}
    >
      <div className="note-box">
        <div className="note-not-expanded">
          <div className="note-header">
            {avatar}
            <div className="doctor-info">
              <h4>
                {doctorLastName} {doctorName} {doctorSecondName}
              </h4>
              <h5>{location}</h5>
            </div>
          </div>
          <h5 className="med-card-note-type">{type}</h5>
        </div>

        <div className="toggle-layer">
          <button
            onClick={toggleTextOpen}
            className={`expand-button ${isTextOpen ? "expanded" : ""}`}
          >
            <Toggle />
          </button>
          {isTextOpen && <p className="text">{text}</p>}
        </div>
      </div>
    </div>
  );
};

export default Note;

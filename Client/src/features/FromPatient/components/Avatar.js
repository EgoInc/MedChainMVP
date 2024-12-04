import React from "react";
import defaultPatientAvatar from "../../../shared/FromPatient/avatar.png";

const PatientAvatar = ({ src, size = 100 }) => {
  return (
    <div className="patient-avatar">
      {src ? (
        <img src={src} alt="Patient Avatar" className="patient-avatar-pic" />
      ) : (
        <img src={defaultPatientAvatar} alt="Patient Avatar" />
      )}
    </div>
  );
};

export default PatientAvatar;
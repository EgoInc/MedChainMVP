import React from "react";
import Toggle from "./Toggle";
import "../css/Doctors.css";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const navigate = useNavigate();
  return (
    <div className="doctors">
      <p>Список ваших врачей</p>
      <button onClick={() => navigate("/patient/:patientId/searchYourDoctors")}>
        <Toggle />
      </button>
    </div>
  );
};
export default Doctors;
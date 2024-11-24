import React, { useState } from "react";
import "./index.css";
import Avatar from "../../features/FromDoctor/components/Avatar";
import Logo from "../../shared/FromDoctor/images/Logo.png";
import PatientCard from "../../features/PatientsAccount/components/PatientCard";
import MedCardHistory from "../../features/PatientsAccount/components/MedCardHistory";
import SendRequest from "../../features/PatientsAccount/components/SendRequest";

function PatientsAccount() {
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleRequestSubmit = () => {
    setIsRequestSent(true);
  };
  return (
    <div className="patients-account">
      <img src={Logo} alt="Logo" className="logo" />

      <PatientCard
        lastName="Иванов"
        name="Иван"
        secondName="Иванович"
        id={12345}
        dateOfBirth="10.10.1946"
      />
      <Avatar className="avatar" />
      <MedCardHistory isRequestSent={isRequestSent} />
      <SendRequest onSubmit={handleRequestSubmit} />
    </div>
  );
}

export default PatientsAccount;

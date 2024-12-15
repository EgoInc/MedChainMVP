import React, { useState } from "react";
import "./index.css";
import Avatar from "../../features/FromPatient/components/Avatar";
import Logo from "../../shared/Logo.svg";
import DoctorCard from "../../features/DoctorsAccount/components/DoctorCard";

function DoctorsAccount() {
  return (
    <div className="doctors-account">
      <img src={Logo} alt="Logo" className="logo" />

      <DoctorCard
        lastName="Иванов"
        name="Иван"
        secondName="Иванович"
        location="Городская поликлиника №3"
        id={12345}
        phoneNumber="+71234567890"
        email="ivanovii@mail.ru"
      />
      <Avatar className="avatar" />
    </div>
  );
}

export default DoctorsAccount;

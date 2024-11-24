import React from "react";
import DoctorCard from "../../features/FromDoctor/components/DoctorCard";
import "./index.css";
import Avatar from "../../features/FromDoctor/components/Avatar";
import Logo from "../../shared/FromDoctor/images/Logo.png";
import Request from "../../features/FromDoctor/components/Request";
import Patients from "../../features/FromDoctor/components/Patients";

function FromDoctor() {
  return (
    <div className="from-doctor">
      <div className="main-part">
        <DoctorCard
          lastName="Иванов"
          name="Иван"
          secondName="Иванович"
          location="городская поликлиника №3"
          id={12345}
          phoneNumber="+71234567890"
          email="ivanovi@mail.ru "
        />
        <Avatar />
        <img src={Logo} alt="Logo" className="logo" />
        <Request />
        <Patients />
      </div>
    </div>
  );
}

export default FromDoctor;
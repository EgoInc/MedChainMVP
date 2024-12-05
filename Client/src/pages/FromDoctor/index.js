import React, { useEffect, useState } from "react";
import DoctorCard from "../../features/FromDoctor/components/DoctorCard";
import "./index.css";
import Avatar from "../../features/FromDoctor/components/Avatar";
import Logo from "../../shared/FromDoctor/images/Logo.png";
import Request from "../../features/FromDoctor/components/Request";
import Patients from "../../features/FromDoctor/components/Patients";
import NavPanel from "../../features/NavPanel/NavPanel";
import { useParams } from "react-router-dom";
import sendRequest from "../../shared/SendRequest";

function FromDoctor() {
  const { doctorId } = useParams();
  const routes = {
    person: `/doctor/${doctorId}`,
    search: `/doctor/${doctorId}/patients`,
    logout: "/",
  };

  const [doctor, setDoctor] = useState(null);
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await sendRequest(`/doctor/${doctorId}/`);
        setDoctor(response);
      } catch (error) {
        console.error("Ошибка при загрузке данных доктора", error);
      }
    };

    fetchDoctor();
  });

  return (
    <div className="from-doctor">
      <NavPanel routes={routes} />
      <div className="main-part">
        <DoctorCard
          name={doctor ? doctor.name : "null"}
          location={doctor ? doctor.location : "null"}
          doctor_id={doctorId}
          phone_number={doctor ? doctor.phone_number : "null"}
          email={doctor ? doctor.email : "null"}
        />
        <Avatar className="avatar" />
        <img src={Logo} alt="Logo" className="logo" />
        <Request />
        <Patients />
      </div>
    </div>
  );
}

export default FromDoctor;

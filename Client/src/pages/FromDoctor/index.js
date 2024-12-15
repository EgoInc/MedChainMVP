import React, { useEffect, useState } from "react";
import DoctorCard from "../../features/FromDoctor/components/DoctorCard";
import "./index.css";
import Avatar from "../../features/FromDoctor/components/Avatar";
import Logo from "../../shared/Logo.svg";
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

  const mockDoctors = [
    {
      doctor_id: 1,
      doctor_name: "Иванов Иван Иванович",
      specialization: "Терапевт",
      organization_id: 1,
      organization_name: "Больница",
      phone_number: "+79999999999",
      email: "example@mail.ru",
    },
    {
      doctor_id: 2,
      doctor_name: "Петров Петр Петрович",
      specialization: "Терапевт",
      organization_id: 1,
      organization_name: "Больница",
      phone_number: "+79999999999",
      email: "example@mail.ru",
    },
    {
      doctor_id: 3,
      doctor_name: "Сидоров Сидор Сидорович",
      specialization: "Терапевт",
      organization_id: 1,
      organization_name: "Больница",
      phone_number: "+79999999999",
      email: "example@mail.ru",
    },
  ];

  function getDoctorById(id) {
    const response = mockDoctors.find(
      (doctor) => doctor.doctor_id === Number(id)
    );
    return response;
  }

  useEffect(() => {
    // const fetchDoctor = async () => {
    //   try {
    //     const response = await sendRequest(doctorId);
    //     setDoctor(response);
    //   } catch (error) {
    //     console.error("Ошибка при загрузке данных доктора", error);
    //   }
    // };

    // fetchDoctor();
    setDoctor(getDoctorById(doctorId));
  }, []);

  return (
    <div className="from-doctor">
      <NavPanel routes={routes} />
      <div className="main-part">
        <DoctorCard
          name={doctor ? doctor.doctor_name : "null"}
          location={doctor ? doctor.organization_name : "null"}
          doctor_id={doctorId}
          phone_number={doctor ? doctor.phone_number : "null"}
          email={doctor ? doctor.email : "null"}
          specialization={doctor ? doctor.specialization : "null"}
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

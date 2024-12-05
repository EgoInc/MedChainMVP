import React, { useEffect, useState } from "react";
import "./index.css";
import Avatar from "../../features/FromDoctor/components/Avatar";
import Logo from "../../shared/FromDoctor/images/Logo.png";
import PatientCard from "../../features/PatientsAccount/components/PatientCard";
import MedCardHistory from "../../features/PatientsAccount/components/MedCardHistory";
import SendRequest from "../../features/PatientsAccount/components/SendRequest";
import NavPanel from "../../features/NavPanel/NavPanel";
import formatDate from "../../shared/FormatDate";
import sendRequest from "../../shared/SendRequest";
import { useParams } from "react-router-dom";

function PatientsAccount() {
  const { doctorId } = useParams();
  const { patientId } = useParams();
  const routes = {
    person: `/doctor/${doctorId}`,
    search: `/doctor/${doctorId}/patients`,
    logout: "/",
  };
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleRequestSubmit = () => {
    setIsRequestSent(true);
  };
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await sendRequest(
          `/doctor/${doctorId}/patient/${patientId}/`
        );
        setPatient(response);
      } catch (error) {
        console.error("Ошибка при загрузке данных пациента", error);
      }
    };

    fetchPatient();
  }, [doctorId, patientId]);
  if (!patient) {
    return <p>Загрузка данных пациента...</p>; // пока замещает пустую страницу при не найденном пациенте
  }
  return (
    <div className="patients-account">
      <NavPanel routes={routes} />
      <img src={Logo} alt="Logo" className="logo" />
      <PatientCard
        name={patient.name}
        patient_id={patient.patient_id}
        date_of_birth={formatDate(patient.date_of_birth)}
      />
      <Avatar className="avatar" />
      <MedCardHistory isRequestSent={isRequestSent} />
      <SendRequest onSubmit={handleRequestSubmit} />
    </div>
  );
}

export default PatientsAccount;

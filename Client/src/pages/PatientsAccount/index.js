import React, { useEffect, useState } from "react";
import "./index.css";
import GreyAvatar from "../../features/FromDoctor/components/GreyAvatar";
import Logo from "../../shared/Logo";
import PatientCard from "../../features/PatientsAccount/components/PatientCard";
import MedCardHistory from "../../features/PatientsAccount/components/MedCardHistory";
import SendRequest from "../../features/PatientsAccount/components/SendRequest";
import NavPanel from "../../features/NavPanel/NavPanel";
import formatDate from "../../shared/FormatDate";
import sendRequest from "../../shared/SendRequest";
import { useParams, useNavigate } from "react-router-dom";

function PatientsAccount() {
  const { doctorId } = useParams();
  const { patientId } = useParams();
  const navigate = useNavigate();

  const routes = {
    person: `/doctor/${doctorId}`,
    search: `/doctor/${doctorId}/patients`,
    logout: "/",
  };

  const [patient, setPatient] = useState(null);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [requestId, setRequestId] = useState(null);
  const [requestStatus, setRequestStatus] = useState("pending");

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

  // Отправка запроса
  const handleRequestSubmit = (id) => {
    setIsRequestSent(true);
    setRequestId(id); // Сохраняем ID заявки
    console.log(id);
  };

  // Обновление статуса заявки
  // useEffect(() => {
  //   if (requestId) {
  //     const interval = setInterval(async () => {
  //       try {
  //         const response = await sendRequest(
  //           `/requests/${requestId}/status`
  //         );
  //         setRequestStatus(response.status);
  //         if (response.status === "approved") {
  //           clearInterval(interval); // Останавливаем обновление, если заявка одобренаы
  //         }
  //       } catch (error) {
  //         console.error("Ошибка при обновлении статуса заявки", error);
  //       }
  //     }, 5000);

  //     return () => clearInterval(interval);
  //   }
  // }, [requestId, doctorId, patientId, navigate]);

  if (!patient) {
    return <p>Загрузка данных пациента...</p>;
  }

  return (
    <div className="patients-account">
      <NavPanel routes={routes} />
      <Logo className="logo" />
      <GreyAvatar className="avatar" />

      <PatientCard
        name={patient.name}
        patient_id={patient.patient_id}
        date_of_birth={formatDate(patient.date_of_birth)}
      />
      <MedCardHistory isRequestSent={isRequestSent} />
      <SendRequest onSubmit={handleRequestSubmit} />
    </div>
  );
}

export default PatientsAccount;

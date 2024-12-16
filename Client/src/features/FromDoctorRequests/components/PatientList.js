import React, { useEffect, useState } from "react";
import Patient from "./Patient";
import "../css/PatientList.css";

const PatientList = ({ filters }) => {
  const mockPatients = [
    {
      patient_id: 1,
      name: "Иванов Иван Иванович",
      date_of_birth: "10.10.1990",
      status: getRandomStatus(),
    },
    {
      patient_id: 2,
      name: "Петров Петр Петрович",
      date_of_birth: "05.05.1985",
      status: getRandomStatus(),
    },
    {
      patient_id: 3,
      name: "Сидоров Сидор Сидорович",
      date_of_birth: "01.01.1975",
      status: getRandomStatus(),
    },
    {
      patient_id: 4,
      name: "Кузнецов Кузьма Кузьмич",
      date_of_birth: "15.02.1992",
      status: getRandomStatus(),
    },
  ];

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    setPatients(mockPatients);
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      filters.search === "" ||
      `${patient.name}`.toLowerCase().includes(filters.search);
    const matchesStatus =
      filters.statuses.length === 0 ||
      filters.statuses.includes(patient.status);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="patient-list">
      {filteredPatients.map((patient) => (
        <Patient
          patient_id={patient.patient_id}
          name={patient.name}
          date_of_birth={patient.date_of_birth}
          status={patient.status}
        />
      ))}
    </div>
  );
};

function getRandomStatus() {
  const statuses = ["ожидание", "подтверждено", "отклонено"];
  return statuses[Math.floor(Math.random() * statuses.length)];
}

export default PatientList;

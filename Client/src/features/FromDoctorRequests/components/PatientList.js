import React, { useEffect, useState } from "react";
import Patient from "./Patient";
import "../css/PatientList.css";

const PatientList = ({ filters }) => {
  const mockPatients = [
    {
      id: 1,
      lastName: "Иванов",
      name: "Иван",
      secondName: "Иванович",
      dateOfBirth: "10.10.1990",
      status: getRandomStatus(),
    },
    {
      id: 2,
      lastName: "Петров",
      name: "Петр",
      secondName: "Петрович",
      dateOfBirth: "05.05.1985",
      status: getRandomStatus(),
    },
    {
      id: 3,
      lastName: "Сидоров",
      name: "Сидор",
      secondName: "Сидорович",
      dateOfBirth: "01.01.1975",
      status: getRandomStatus(),
    },
    {
      id: 4,
      lastName: "Кузнецов",
      name: "Кузьма",
      secondName: "Кузьмич",
      dateOfBirth: "15.02.1992",
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
      `${patient.lastName} ${patient.name} ${patient.secondName}`
        .toLowerCase()
        .includes(filters.search);
    const matchesStatus =
      filters.statuses.length === 0 ||
      filters.statuses.includes(patient.status);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="patient-list">
      {filteredPatients.map((patient) => (
        <Patient
          id={patient.id}
          lastName={patient.lastName}
          name={patient.name}
          secondName={patient.secondName}
          dateOfBitth={patient.dateOfBirth}
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

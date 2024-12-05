import React, { useEffect, useState } from "react";
import Doctor from "./Doctor";
import "../css/DoctorList.css";

const DoctorList = ({ filters }) => {
  const mockDoctors = [
    {
      id: 1,
      lastName: "Иванов",
      name: "Иван",
      secondName: "Иванович",
      location: "Городская поликлиника №3",
      reason: getRandomReason(),
    },
    {
      id: 2,
      lastName: "Петров",
      name: "Петр",
      secondName: "Петрович",
      location: "Городская поликлиника №5",
      reason: getRandomReason(),
    },
    {
      id: 3,
      lastName: "Сидоров",
      name: "Сидор",
      secondName: "Сидорович",
      location: "Городская поликлиника №10",
      reason: getRandomReason(),
    },
    {
      id: 4,
      lastName: "Кузнецов",
      name: "Кузьма",
      secondName: "Кузьмич",
      location: "Городская поликлиника №2143",
      reason: getRandomReason(),
    },
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    setDoctors(mockDoctors);
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      filters.search === "" ||
      `${doctor.lastName} ${doctor.name} ${doctor.secondName}`
        .toLowerCase()
        .includes(filters.search);
    const matchesStatus =
      filters.statuses.length === 0 ||
      filters.statuses.includes(doctor.reason);

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="doctor-list">
      {filteredDoctors.map((doctor) => (
        <Doctor
          id={doctor.id}
          lastName={doctor.lastName}
          name={doctor.name}
          secondName={doctor.secondName}
          location={doctor.location}
          reason={doctor.reason}
        />
      ))}
    </div>
  );
};

function getRandomReason() {
  const reasons = ["Запрос доступа", "Изучение мед.карты"];
  return reasons[Math.floor(Math.random() * statuses.length)];
}

export default DoctorList;

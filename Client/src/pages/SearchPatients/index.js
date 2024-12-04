import React, { useState } from "react";
import NavPanel from "../../features/NavPanel/NavPanel";
import Logo from "../../shared/FromDoctor/images/Logo.png";
import SearchMenu from "../../features/SearchYourPatients/components/SearchMenu";
import PatientList from "../../features/SearchYourPatients/components/PatientList";
import "./index.css";

function SearchPatients() {
  const routes = {
    person: "/doctor/:doctorId",
    search: "/doctor/:doctorId/search/:doctorId/patients",
    logout: "/",
  };
  const mockPatients = [
    {
      id: 1,
      lastName: "Иванов",
      name: "Иван",
      secondName: "Иванович",
      dateOfBirth: "10.10.1990",
    },
    {
      id: 2,
      lastName: "Петров",
      name: "Петр",
      secondName: "Петрович",
      dateOfBirth: "05.05.1985",
    },
    {
      id: 3,
      lastName: "Сидоров",
      name: "Сидор",
      secondName: "Сидорович",
      dateOfBirth: "01.01.1975",
    },
    {
      id: 4,
      lastName: "Пирогов",
      name: "Кузьма",
      secondName: "Кузьмич",
      dateOfBirth: "15.02.1992",
    },
    {
      id: 5,
      lastName: "Федоров",
      name: "Сидор",
      secondName: "Сидорович",
      dateOfBirth: "01.01.1975",
    },
    {
      id: 6,
      lastName: "Фролов",
      name: "Кузьма",
      secondName: "Кузьмич",
      dateOfBirth: "15.02.1992",
    },
  ];

  const [searchFilter, setSearchFilter] = useState("");

  const handleSearch = (searchText) => {
    setSearchFilter(searchText);
  };

  return (
    <div className="search-patients">
      <NavPanel routes={routes} />
      <img src={Logo} alt="Logo" className="logo" />
      <h2>Список пациентов</h2>
      <SearchMenu onSearch={handleSearch} />
      <PatientList patients={mockPatients} searchFilter={searchFilter} />
    </div>
  );
}

export default SearchPatients;

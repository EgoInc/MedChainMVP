import React, { useEffect, useState } from "react";
import NavPanel from "../../features/NavPanel/NavPanel";
import Logo from "../../shared/Logo.svg";
import SearchMenu from "../../features/SearchYourPatients/components/SearchMenu";
import PatientList from "../../features/SearchYourPatients/components/PatientList";
import sendRequest from "../../shared/SendRequest";
import "./index.css";
import { useParams } from "react-router-dom";

function SearchYourPatients() {
  const { doctorId } = useParams();
  const routes = {
    person: `/doctor/${doctorId}`,
    search: `/doctor/${doctorId}/patients`,
    logout: "/",
  };

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await sendRequest(`/doctor/${doctorId}/my-patients`);

        setPatients(response);
      } catch (error) {
        console.error("Ошибка при загрузке пациентов", error);
      }
    };

    fetchPatients();
  });

  const [searchFilter, setSearchFilter] = useState("");

  const handleSearch = (searchText) => {
    setSearchFilter(searchText);
  };

  return (
    <div className="search-your-patients">
      <NavPanel routes={routes} />
      <img src={Logo} alt="Logo" className="logo" />
      <h2>Список ваших пациентов</h2>
      <SearchMenu onSearch={handleSearch} />
      <PatientList patients={patients} searchFilter={searchFilter} />
    </div>
  );
}

export default SearchYourPatients;

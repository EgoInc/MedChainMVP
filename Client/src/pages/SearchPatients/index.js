import React, { useEffect, useState } from "react";
import NavPanel from "../../features/NavPanel/NavPanel";
import Logo from "../../shared/Logo";
import SearchMenu from "../../features/SearchYourPatients/components/SearchMenu";
import PatientList from "../../features/SearchYourPatients/components/PatientList";
import sendRequest from "../../shared/SendRequest";
import "./index.css";
import { useParams } from "react-router-dom";

function SearchPatients() {
  const { doctorId } = useParams();

  const routes = {
    person: `/doctor/${doctorId}`,
    search: `/doctor/${doctorId}/my-patients`,
    logout: "/",
  };

  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await sendRequest(
          `/doctor/${doctorId}/search-patients`
        );
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
    <div className="search-patients">
      <NavPanel routes={routes} />
      <Logo className="logo" />
      <h2>Список пациентов</h2>
      <SearchMenu onSearch={handleSearch} />
      <PatientList patients={patients} searchFilter={searchFilter} />
    </div>
  );
}

export default SearchPatients;

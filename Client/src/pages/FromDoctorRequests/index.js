import React from "react";
import FilterableParentMenu from "../../features/FromDoctorRequests/components/FilterableParentMenu";
import "./index.css";
import Logo from "../../shared/Logo";
import NavPanel from "../../features/NavPanel/NavPanel";
import { useParams } from "react-router-dom";

function FromDoctorRequests() {
  const { doctorId } = useParams();
  const routes = {
    person: `/doctor/${doctorId}`,
    search: `/doctor/${doctorId}/patients`,
    logout: "/",
  };

  return (
    <div className="from-doctor-requests">
      <div className="from-doctor-requests-inner-box">
        <NavPanel routes={routes} />
        <Logo className="logo" />
        <h2>Отправленные заявки</h2>
        <FilterableParentMenu />
      </div>
    </div>
  );
}
export default FromDoctorRequests;

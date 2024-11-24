import React from "react";
import FilterableParentMenu from "../../features/FromDoctorRequests/components/FilterableParentMenu";
import "./index.css";
import Logo from "../../shared/FromDoctor/images/Logo.png";

function FromDoctorRequests() {
  return (
    <div className="from-doctor-requests">
      <img src={Logo} alt="Logo" className="logo" />
      <h2>Отправленные заявки</h2>
      <FilterableParentMenu />
    </div>
  );
}
export default FromDoctorRequests;

import React, { useState } from "react";
import "../css/Requests.css";
import Toggle from "./Toggle";
import { useNavigate } from "react-router-dom";

const Requests = () => {
  let [unreadNumber, setUnreadNumber] = useState(3);
  const navigate = useNavigate();
  return (
    <div className="requests">
      <p>Новые заявки</p>
      {unreadNumber ? <p className="show">{`+${unreadNumber}`}</p> : <p></p>}
      <button onClick={() => navigate("/patient/:patientId/requests")}>
        <Toggle />
      </button>
    </div>
  );
};

export default Requests;
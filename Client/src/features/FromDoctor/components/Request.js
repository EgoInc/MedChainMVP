import React, { useState } from "react";
import "../css/Request.css";
import Toggle from "./Toggle";
import { useNavigate } from "react-router-dom";

const Request = () => {
  let [unreadNumber, setUnreadNumber] = useState(10);
  const navigate = useNavigate();
  return (
    <div className="request">
      <p>Отправленные заявки</p>
      {unreadNumber ? <p className="show">{`+${unreadNumber}`}</p> : <p></p>}
      <button onClick={() => navigate("/doctor/:doctorId/requests")}>
        <Toggle />
      </button>
    </div>
  );
};

export default Request;

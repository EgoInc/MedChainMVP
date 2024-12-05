import React, { useState } from "react";
import "../css/Request.css";
import Toggle from "./Toggle";
import { useNavigate, useParams } from "react-router-dom";

const Request = () => {
  const { doctorId } = useParams();
  let [unreadNumber, setUnreadNumber] = useState(10);
  const pathToRequests = `/doctor/${doctorId}/requests`;
  const navigate = useNavigate();
  return (
    <div className="request" onClick={() => navigate(pathToRequests)}>
      <p>Отправленные заявки</p>
      {unreadNumber ? <p className="show">{`+${unreadNumber}`}</p> : <p></p>}
      <button onClick={() => navigate(pathToRequests)}>
        <Toggle />
      </button>
    </div>
  );
};

export default Request;

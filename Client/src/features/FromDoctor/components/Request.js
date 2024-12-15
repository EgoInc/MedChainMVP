import React, { useEffect, useState } from "react";
import "../css/Request.css";
import Toggle from "./Toggle";
import { useNavigate, useParams } from "react-router-dom";
import sendRequest from "../../../shared/SendRequest";

const Request = () => {
  const { doctorId } = useParams();
  const pathToRequests = `/doctor/${doctorId}/requests`;
  const navigate = useNavigate();

  let [numOfRequests, setNumOfRequests] = useState(0);

  // useEffect(() => {
  //   const fetchRequestNumber = async () => {
  //     try {
  //       const response = await sendRequest(
  //         `/doctor/${doctorId}/request-access`
  //       );
  //       console.log(response);
  //       setNumOfRequests(response.length);
  //     } catch (error) {
  //       console.error("Ошибка при загрузке данных", error);
  //     }
  //   };

  //   fetchRequestNumber();
  // });

  return (
    <div className="request" onClick={() => navigate(pathToRequests)}>
      <p>Отправленные заявки</p>
      {numOfRequests ? <p className="show">{`+${numOfRequests}`}</p> : <p></p>}
      <button onClick={() => navigate(pathToRequests)}>
        <Toggle />
      </button>
    </div>
  );
};

export default Request;

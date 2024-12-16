import PatientAvatar from "./PatientAvatar";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/Patient.css";
import { useNavigate, useParams } from "react-router-dom";

const Patient = ({ name, date_of_birth, status }) => {
  const { doctorId } = useParams();
  const getClassStatus = (status) => {
    switch (status) {
      case "ожидание":
        return "patient waiting";
      case "подтверждено":
        return "patient approved";

      case "отклонено":
        return "patient declined";
      default:
        return "patient";
    }
  };

  const navigate = useNavigate();
  const patientId = 101; // пока ведет на одного и того же пациента, но как обновится список данных в заявке на бэке, исправлю
  const pathToPatientCard = `/doctor/${doctorId}/patient/${patientId}/`;

  return (
    <div
      className={getClassStatus(status)}
      onClick={() => navigate(pathToPatientCard)}
    >
      <PatientAvatar className="requests-avatar" />
      <div className="patient-text-box">
        <div className="patient-info">
          <h3>{name}</h3>
          <p className="date-of-birth">{date_of_birth}</p>
        </div>
        <p className="status">{status}</p>
      </div>

      <button
        className="toggle-button"
        onClick={() => navigate(pathToPatientCard)}
      >
        <Toggle />
      </button>
    </div>
  );
};

export default Patient;

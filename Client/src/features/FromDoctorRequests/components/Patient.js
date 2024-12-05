import PatientAvatar from "./PatientAvatar";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/Patient.css";

const Patient = ({ name, date_of_birth, status }) => {
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

  return (
    <div className={getClassStatus(status)}>
      <PatientAvatar />
      <div className="patient-info">
        <h3>{name}</h3>
        <p>{date_of_birth}</p>
      </div>
      <p className="status">{status}</p>
      <button className="toggle-button">
        <Toggle />
      </button>
    </div>
  );
};

export default Patient;

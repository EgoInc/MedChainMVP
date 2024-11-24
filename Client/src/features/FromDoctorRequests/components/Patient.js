import PatientAvatar from "./PatientAvatar";
import Toggle from "../../FromDoctor/components/Toggle";
import "../css/Patient.css";

const Patient = ({ lastName, name, secondName, dateOfBitth, status }) => {
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
        <h3>
          {lastName} {name} {secondName}
        </h3>
        <p>{dateOfBitth}</p>
      </div>
      <p className="status">{status}</p>
      <button className="toggle-button">
        <Toggle />
      </button>
    </div>
  );
};

export default Patient;

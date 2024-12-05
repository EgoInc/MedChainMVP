import DoctorAvatar from "./DoctorAvatar";
import "../css/Doctor.css";

const Doctor = ({ lastName, name, secondName, location, reason}) => {
  return (
    <div className = "doctor">
      <DoctorAvatar />
      <div className="doctor-info">
        <h3>
          {lastName} {name} {secondName}
        </h3>
        <p>{location}</p>
        <p>{reason}</p>
      </div>
      <div className="buttons">
        <button className="confirm-button">Подтвердить</button>
        <button className="reject-button">Отклонить</button>
      </div>
    </div>
  );
};

export default Doctor;
import Patient from "./Patient";
import "../css/PatientList.css";

const PatientList = ({ patients, searchFilter }) => {
  const filteredPatients = patients.filter((patient) =>
    `${patient.lastName} ${patient.name} ${patient.secondName}`
      .toLowerCase()
      .includes(searchFilter)
  );

  return (
    <div className="patient-list">
      {filteredPatients.map((patient) => (
        <Patient
          patient_id={patient.patient_id}
          name={patient.name}
          date_of_birth={patient.date_of_birth}
        />
      ))}
    </div>
  );
};

export default PatientList;

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
          key={patient.id}
          lastName={patient.lastName}
          name={patient.name}
          secondName={patient.secondName}
          dateOfBitth={patient.dateOfBirth}
        />
      ))}
    </div>
  );
};

export default PatientList;

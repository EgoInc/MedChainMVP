import Doctor from "./Doctor";
import "../css/DoctorList.css";

const DoctorList = ({ doctors, searchFilter }) => {
  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.lastName} ${doctor.name} ${doctor.secondName}`
      .toLowerCase()
      .includes(searchFilter)
  );

  return (
    <div className="doctor-list">
      {filteredDoctors.map((doctor) => (
        <Doctor
          key={doctor.id}
          lastName={doctor.lastName}
          name={doctor.name}
          secondName={doctor.secondName}
          location={doctor.location}
        />
      ))}
    </div>
  );
};

export default DoctorList;
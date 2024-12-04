import { Route, Routes } from "react-router-dom";
import "./App.css";
import ExamplePage from "./pages/ExamplePage";
import HomePage from "./pages/HomePage";
import LoginReg from "./pages/LoginRegistration/App";
import FromDoctor from "./pages/FromDoctor";
import FromDoctorRequests from "./pages/FromDoctorRequests";
import SearchYourPatients from "./pages/SearchYourPatients";
import PatientsAccount from "./pages/PatientsAccount";
import MedicalRecord from "./pages/MedicalRecord";
import FromPatient from "./pages/FromPatient";
import FromPatientRequests from "./pages/FromPatientRequests";
import DoctorsAccount from "./pages/DoctorsAccount";
import SearchYourDoctors from "./pages/SearchYourDoctors";
import SearchPatients from "./pages/SearchPatients";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginReg />} />
        <Route path="/doctor/:doctorId" element={<FromDoctor />} />
        <Route
          path="/doctor/:doctorId/requests"
          element={<FromDoctorRequests />}
        />
        <Route
          path="/doctor/:doctorId/search/:doctorId/patients"
          element={<SearchYourPatients />}
        />
        <Route
          path="/doctor/:doctorId/search/patients"
          element={<SearchPatients />}
        />
        <Route
          path="/doctor/:doctorId/patient/:patientId"
          element={<PatientsAccount />}
        />
        <Route
          path="/doctor/:doctorId/patient/:patientId/medicalRecord"
          element={<MedicalRecord />}
        />
        <Route path="/patient/:patientId/" element={<FromPatient />}/>
        <Route 
          path="/patient/:patientId/requests"
          element={<FromPatientRequests />}
        />
        <Route 
          path="/patient/:patientId/searchYourDoctors"
          element={<SearchYourDoctors />}
        />
        <Route 
          path="/patient/:patientId/doctor/:doctorId"
          element={<DoctorsAccount />}
        />
        <Route 
          path="/patient/:patientId/medicalRecord"
          element={<MedicalRecord />}
        />
      </Routes>
    </div>
  );
}

export default App;

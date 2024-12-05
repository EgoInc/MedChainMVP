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
          path="/doctor/:doctorId/my-patients"
          element={<SearchYourPatients />}
        />
        <Route path="/doctor/:doctorId/patients" element={<SearchPatients />} />
        <Route
          path="/doctor/:doctorId/patient/:patientId/"
          element={<PatientsAccount />}
        />
        <Route
          path="/doctor/:doctorId/patient/:patientId/medical-record"
          element={<MedicalRecord />}
        />
      </Routes>
    </div>
  );
}

export default App;

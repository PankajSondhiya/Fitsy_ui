import { Route, Routes } from "react-router-dom";
import "./App.css";
import "react-tooltip/dist/react-tooltip.css";
import Prescription from "./Pages/Prescription ";
import Auth from "./Pages/Auth";
import Hospital from "./Pages/Hospital";
import Patient from "./Pages/Patient";
import Admin from "./Pages/Admin";
import DoctorInfo from "./Pages/DoctorInfo";
import Doctor from "./Pages/Doctor";
import ForgotPassword from "./Pages/ForgotPassword";
import PasswordResetPage from "./Pages/PasswordResetPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/doctor/" element={<Doctor />} />
        <Route path="/" element={<Auth />} />
        <Route path="/doctor/:id" element={<DoctorInfo />} />
        <Route path="/patient/" element={<Patient />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/passwordreset" element={<PasswordResetPage />} />
        <Route path="/prescription/:id" element={<Prescription />} />
        <Route path="/hospital/:id" element={<Hospital />} />
      </Routes>
    </>
  );
}

export default App;

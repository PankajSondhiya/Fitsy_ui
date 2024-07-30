import { useEffect, useState } from "react";
import { AxiosInstance } from "../Utils/AxiosInstance";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Pages/homePage.css";
import Navbar from "../Componenets/Navbaar";
import AppointmentTable from "../Componenets/PatientAppointmentTable";
import SicknessessTable from "../Componenets/PatientDiagnosisTable";

const Doctor = ({}) => {
  const navigate = useNavigate();

  const [isSickness, setIsSickness] = useState(true);

  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#1E1E1E" }}>
        <Navbar />

        <div
          className="patient_wrapper d-flex"
          style={{ backgroundColor: "#1E1E1E" }}
        >
          <div
            className="sideBar d-flex flex-column vh-100 bg-dark"
            style={{ width: "20%", position: "sticky", top: "0px" }}
          >
            <button
              className="btn btn-success m-2"
              onClick={() => setIsSickness(true)}
            >
              Sicknesses
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() => setIsSickness(false)}
            >
              Appointments
            </button>
          </div>
          <div
            className="main_data d-flex flex-column p-3"
            style={{ width: "100%" }}
          >
            <div className="title mx-auto">
              <h2 className="text-light">{`Welcome Dr. ${localStorage.getItem(
                "userName"
              )}!`}</h2>
            </div>

            <div className="mx-auto text-light">Take a look on your stats</div>

            {isSickness ? <SicknessessTable /> : <AppointmentTable />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;

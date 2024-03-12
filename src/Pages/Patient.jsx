import { useEffect, useState } from "react";
import { AxiosInstance } from "../Utils/AxiosInstance";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Pages/homePage.css";
import { toast } from "react-toastify";
import Navbar from "../Componenets/Navbaar";
import { FaSearch } from "react-icons/fa";
import Loader from "../Componenets/loader";
import AppointmentTable from "../Componenets/PatientAppointmentTable";
import DiagnosisTable from "../Componenets/PatientDiagnosisTable";
import { Window } from "react-bootstrap-icons";

const Patient = ({
  appointmentList,
  setAppoinmentList,
  isDataLoading,
  setIsDataLoading,
  fetchAppoinment,
  fetchSickness,
  sicknessList,
  setHospitalList,
  hospitalList,
  setSicknessList,
  medicinesList,
  fetchMedicines,
  setMedicinesList,
}) => {
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] =
    useState(false);

  const [doctorList, setDoctorList] = useState([]);
  const [tableTogle, setTableTogle] = useState(true);
  const navigate = useNavigate();

  async function fetchDoctors(event) {
    try {
      const { data } = await AxiosInstance.get("/fitsy/api/v1/doctors");
      setDoctorList(data);
    } catch (ex) {
      console.log(ex);
    }
  }
  async function fetchHospitals() {
    try {
      const { data } = await AxiosInstance.get("/fitsy/api/v1/hospitals");
      setHospitalList(data);
    } catch (ex) {
      toast.error("error occured!");
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    } else {
      fetchSickness();
      fetchDoctors();
      fetchAppoinment();
      fetchHospitals();
    }
  }, []);

  return (
    <div className="vh-100">
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
            className="btn btn-success my-1"
            onClick={() => setTableTogle(true)}
          >
            Sickness list
          </button>
          <button
            className="btn btn-success  mb-1"
            onClick={() => setTableTogle(false)}
          >
            Appointment list
          </button>
        </div>
        <div
          className="main_data d-flex flex-column p-3"
          style={{ width: "100%" }}
        >
          <div className="title mx-auto">
            <h2 className="text-light">{`Welcome ${localStorage.getItem(
              "userName"
            )}!`}</h2>
          </div>
          <div className="mx-auto text-light">
            {sicknessList.length === 0 && appointmentList.length === 0
              ? ""
              : "Take a look on your stats"}
          </div>
          <div>
            {isDataLoading ? (
              <Loader />
            ) : (
              <div className="patient_data" style={{ width: "100%" }}>
                {tableTogle ? (
                  <DiagnosisTable
                    sicknessList={sicknessList}
                    fetchSickness={fetchSickness}
                    setSicknessList={setSicknessList}
                    medicinesList={medicinesList}
                    fetchMedicines={fetchMedicines}
                    setMedicinesList={setMedicinesList}
                  />
                ) : (
                  <AppointmentTable
                    appointmentList={appointmentList}
                    setAppoinmentList={setAppoinmentList}
                    showCreateAppointmentModal={showCreateAppointmentModal}
                    setShowCreateAppointmentModal={
                      setShowCreateAppointmentModal
                    }
                    doctorList={doctorList}
                    fetchAppoinment={fetchAppoinment}
                    hospitalList={hospitalList}
                    medicinesList={medicinesList}
                    fetchMedicines={fetchMedicines}
                    setMedicinesList={setMedicinesList}
                    fetchSickness={fetchSickness}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;

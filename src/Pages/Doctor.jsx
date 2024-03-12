import { useEffect, useState } from "react";
import { AxiosInstance } from "../Utils/AxiosInstance";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Pages/homePage.css";
import Navbar from "../Componenets/Navbaar";
import SicknessessTable from "../Componenets/PatientDiagnosisTable";
import AppointmentTable from "../Componenets/PatientAppointmentTable";

const Doctor = ({
  appointmentList,
  setAppoinmentList,
  fetchAppoinment,
  fetchSickness,
  sicknessList,
  setSicknessList,
  usersList,
  fetchUsers,
  medicinesList,
  setMedicinesList,
  fetchMedicines,
  setHospitalList,
  hospitalList,
  fetchHospitals,
}) => {
  const navigate = useNavigate();

  const [isSickness, setIsSickness] = useState(true);

  function handleSearch(searchText) {
    if (searchText === "") {
      fetchSickness();
      return;
    }

    const filteredData = setSicknessList.filter((sickness) =>
      sickness.patient.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSicknessList(filteredData);
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth");
    }
    fetchMedicines();
    fetchSickness();
    fetchAppoinment();
    fetchUsers();
    fetchHospitals();
  }, []);

  async function handleDelete(id) {
    await AxiosInstance.delete(`/fitsy/api/v1/sicknesses/${id}`);
    const filteredData = sicknessList.filter((sickness) => sickness._id !== id);
    setSicknessList(filteredData);
  }

  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#1E1E1E" }}>
        <Navbar
          setHospitalList={setHospitalList}
          fetchHospitals={fetchHospitals}
          hospitalList={hospitalList}
        />

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
            {isSickness ? (
              <SicknessessTable
                sicknessList={sicknessList}
                setSicknessList={setSicknessList}
                fetchSickness={fetchSickness}
                medicinesList={medicinesList}
                setMedicinesList={setMedicinesList}
                fetchMedicines={fetchMedicines}
              />
            ) : (
              <AppointmentTable
                appointmentList={appointmentList}
                setAppoinmentList={setAppoinmentList}
                fetchAppoinment={fetchAppoinment}
                usersList={usersList}
                medicinesList={medicinesList}
                setMedicinesList={setMedicinesList}
                fetchMedicines={fetchMedicines}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;

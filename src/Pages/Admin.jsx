import { useEffect, useState } from "react";
import Navbar from "../Componenets/Navbaar";
import { useNavigate } from "react-router-dom";
import { GetAllUsers } from "../API/admin";
import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";
import DiagnosisTable from "../Componenets/PatientDiagnosisTable";
import AppointmentTable from "../Componenets/PatientAppointmentTable";
import UsersList from "../Componenets/UsersTable";
import HospitalsList from "../Componenets/HospitalTable";
import { Button, Modal } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
import SicknessessTable from "../Componenets/PatientDiagnosisTable";

const Admin = ({
  appointmentList,
  setAppoinmentList,
  isDataLoading,
  setIsDataLoading,
  fetchAppoinment,
  fetchSickness,
  sicknessList,
  usersList,
  setUsersList,
  fetchUsers,
  hospitalList,
  fetchHospitals,
  setHospitalList,
}) => {
  const [activeTable, setActiveTable] = useState(1);
  const [showHospitalModal, setShowHospitalModal] = useState(false);
  const [isCreateHospital, setIsCreateHospital] = useState(false);

  const navigate = useNavigate();

  const renderTable = () => {
    switch (activeTable) {
      case 1:
        return <SicknessessTable sicknessList={sicknessList} />;
      case 2:
        return (
          <UsersList
            usersList={usersList}
            fetchUsers={fetchUsers}
            setUsersList={setUsersList}
          />
        );
      case 3:
        return (
          <AppointmentTable
            appointmentList={appointmentList}
            setAppoinmentList={setAppoinmentList}
            fetchAppoinment={fetchAppoinment}
          />
        );
      case 4:
        return (
          <HospitalsList
            setHospitalList={setHospitalList}
            hospitalList={hospitalList}
            fetchHospitals={fetchHospitals}
            showHospitalModal={showHospitalModal}
            setShowHospitalModal={setShowHospitalModal}
            isCreateHospital={isCreateHospital}
            setIsCreateHospital={setIsCreateHospital}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token") === "") {
      localStorage.clear();
      return navigate("/");
    }
    fetchAppoinment();
    fetchUsers();
    fetchSickness();
    fetchHospitals();
  }, []);

  return (
    <>
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
              className="btn btn-success m-2"
              onClick={() => setActiveTable(1)}
            >
              Sicknesses
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() => setActiveTable(2)}
            >
              Users
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() => setActiveTable(3)}
            >
              Appointments
            </button>
            <button
              className="btn btn-success m-2"
              onClick={() => setActiveTable(4)}
            >
              Hospitals
            </button>
          </div>
          <div
            className="main_data d-flex flex-column p-3"
            style={{ width: "100%" }}
          >
            <div className="title mx-auto">
              <h2 className="text-light">{`Welcome Admin ${localStorage.getItem(
                "userName"
              )}!`}</h2>
            </div>

            <div className="mx-auto text-light">Take a look on your stats</div>

            <div className="my-5">{renderTable()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;

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
import { useEffect, useState } from "react";
import { AxiosInstance } from "./Utils/AxiosInstance";
import { toast } from "react-toastify";
import Navbar from "./Componenets/Navbaar";

function App() {
  const [appointmentList, setAppoinmentList] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [sicknessList, setSicknessList] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [hospitalList, setHospitalList] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [medicinesList, setMedicinesList] = useState([]);

  async function fetchAppoinment() {
    try {
      setIsDataLoading(true);
      const { data } = await AxiosInstance.get("/fitsy/api/v1/appointment");
      console.log(data);
      setAppoinmentList(data);
      console.log(appointmentList);
      toast.success("Appointment data fetched successfully");
    } catch (ex) {
      toast.error(ex.response.data.message);
    } finally {
      setIsDataLoading(false);
    }
  }

  async function fetchUsers() {
    try {
      setIsDataLoading(true);
      const { data } = await AxiosInstance.get("/fitsy/api/v1/users");
      setUsersList(data);
    } catch (ex) {
      toast.success("error occured");
    } finally {
      setIsDataLoading(false);
    }
  }

  async function fetchMedicines() {
    try {
      const { data } = await AxiosInstance.get("/fitsy/api/v1/medicines");
      setMedicinesList(data);
    } catch (error) {
      console.log(error);
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

  async function fetchSickness() {
    try {
      setIsDataLoading(true);
      const { data } = await AxiosInstance.get(`/fitsy/api/v1/sicknesses`);
      setSicknessList(data);
      toast.success("patient data fetched successfully");
    } catch (ex) {
      toast.error("error occured while fetching  the data");
    } finally {
      setIsDataLoading(false);
    }
  }
  useEffect(() => {
    fetchAppoinment();
  }, []);

  return (
    <>
      {/* <Navbar
        fetchUser={fetchUser}
        setUserData={setUserData}
        userData={userData}
      /> */}
      <Routes>
        <Route
          path="/doctor/"
          element={
            <Doctor
              appointmentList={appointmentList}
              setAppoinmentList={setAppoinmentList}
              fetchAppoinment={fetchAppoinment}
              isDataLoading={isDataLoading}
              fetchSickness={fetchSickness}
              sicknessList={sicknessList}
              setSicknessList={setSicknessList}
              usersList={usersList}
              fetchUsers={fetchUsers}
              searchText={searchText}
              setSearchText={setSearchText}
              medicinesList={medicinesList}
              setMedicinesList={setMedicinesList}
              fetchMedicines={fetchMedicines}
              fetchHospitals={fetchHospitals}
              setHospitalList={setHospitalList}
              hospitalList={hospitalList}
            />
          }
        />
        <Route path="/" element={<Auth />} />
        <Route path="/doctor/:id" element={<DoctorInfo />} />
        <Route
          path="/patient/"
          element={
            <Patient
              appointmentList={appointmentList}
              setAppoinmentList={setAppoinmentList}
              fetchAppoinment={fetchAppoinment}
              isDataLoading={isDataLoading}
              fetchSickness={fetchSickness}
              sicknessList={sicknessList}
              setSicknessList={setSicknessList}
              setHospitalList={setHospitalList}
              hospitalList={hospitalList}
              searchText={searchText}
              setSearchText={setSearchText}
              medicinesList={medicinesList}
              setMedicinesList={setMedicinesList}
              fetchMedicines={fetchMedicines}
              fetchHospitals={fetchHospitals}
            />
          }
        />
        <Route
          path="/admin"
          element={
            <Admin
              appointmentList={appointmentList}
              setAppoinmentList={setAppoinmentList}
              fetchAppoinment={fetchAppoinment}
              isDataLoading={isDataLoading}
              fetchSickness={fetchSickness}
              sicknessList={sicknessList}
              usersList={usersList}
              fetchUsers={fetchUsers}
              searchText={searchText}
              hospitalList={hospitalList}
              setSearchText={setSearchText}
              fetchHospitals={fetchHospitals}
              setHospitalList={setHospitalList}
            />
          }
        />
        {/* <Route path="/medicines/:id" element={<Medicines />} /> */}
        <Route path="/prescription/:id" element={<Prescription />} />
        <Route path="/hospital/:id" element={<Hospital />} />
      </Routes>
    </>
  );
}

export default App;

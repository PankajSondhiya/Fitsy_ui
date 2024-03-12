import { Link } from "react-router-dom";
import Search from "./SearchBar";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CreateSickness from "./SicknessModal";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { FaSearch } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
const SicknessessTable = ({
  sicknessList,
  setSicknessList,
  medicinesList,
  fetchMedicines,
  setMedicinesList,
  fetchSickness,
}) => {
  const [editSicknessData, setEditSicknessData] = useState({});
  const [isSicknessEdit, setIsSicknessEdit] = useState(false);
  const [showSicknessEditModal, setShowSicknessEditModal] = useState(false);
  const [editPrescriptionData, setEditPrescriptionData] = useState({});
  // const [showHospitalModal, setShowHospitalModal] = useState(false);
  // const [modalLoading, setModalLoading] = useState(false);
  // const [selectedHospital, setSelectedHospital] = useState({});
  // const [selectedDoctor, setSelectedDoctor] = useState({});
  // const [showDoctorModal, setShowDoctorModal] = useState(false);
  // const [selectedPrescription, setSelectedPrecription] = useState({});
  // const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);

  function handleDelete(id) {
    const updatedSicknesslist = sicknessList.filter(
      (sickness) => sickness._id !== id
    );
    setSicknessList(updatedSicknesslist);
    toast.success("sickness deleted successfully");
  }
  async function handleEditSicknessModal(event, id) {
    setIsSicknessEdit(true);
    setShowSicknessEditModal(true);
    const { data } = await AxiosInstance.get(`/fitsy/api/v1/sicknesses/${id}`);
    setEditSicknessData(data);
  }
  const handleSearch = (text) => {
    if (text === "") {
      fetchSickness();
    }
    const updatedSicknessess = sicknessList.filter((sickness) =>
      sickness.diagnosis.toLowerCase().includes(text.toLowerCase())
    );
    setSicknessList(updatedSicknessess);
  };
  useEffect(() => {
    if (editSicknessData.prescription) {
      setEditPrescriptionData(editSicknessData.prescription);
    }
  }, [editSicknessData]);

  // function handelHospitalInfo(id) {
  //   setModalLoading(true);
  //   setShowHospitalModal(true);
  //   const sickness = sicknessList.find((sickness) => sickness._id === id);
  //   setSelectedHospital(sickness.hospital);
  //   setModalLoading(false);
  // }
  // function handelDoctorInfo(id) {
  //   setModalLoading(true);
  //   setShowDoctorModal(true);
  //   const sickness = sicknessList.find((sickness) => sickness._id === id);
  //   setSelectedDoctor(sickness.doctor);
  //   setModalLoading(false);
  // }
  // function handelPrescriptionInfo(id) {
  //   setModalLoading(true);
  //   setShowPrescriptionModal(true);
  //   const sickness = sicknessList.find((sickness) => sickness._id === id);
  //   setSelectedPrecription(sickness.prescription);
  //   setModalLoading(false);
  // }
  // console.log(selectedDoctor);

  return (
    <>
      <div>
        <div
          className="heading_search d-flex py-5 align-items-center justify-content-between"
          style={{
            position: "sticky",
            height: "50px",
            top: "0px",
            backgroundColor: "#1E1E1E",

            zIndex: "1000",
          }}
        >
          <h3 className="table_heading text-light">Sicknesses list </h3>
          <div
            className="search d-flex  justify-content-center align-items-center"
            style={{ position: "relative", width: "40%" }}
          >
            <input
              type="text"
              className="form-control "
              placeholder="enter the name"
              onChange={(event) => handleSearch(event.target.value)}
            />
            <div className="search_icon " style={{ position: "absolute" }}>
              <FaSearch />
            </div>
          </div>
        </div>

        <table class="table table-dark diagnosis_table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Patient</th>
              <th scope="col">Email</th>
              <th scope="col">Diagnosis</th>
              <th scope="col">Doctor</th>
              <th scope="col">Hospital</th>
              <th scope="col">Prescription</th>
              {localStorage.getItem("userType") === "DOCTOR" ? (
                <th scope="col">Actions</th>
              ) : (
                ""
              )}
            </tr>
          </thead>
          <tbody>
            {sicknessList?.map((sickness, index) => (
              <tr key={sickness._id}>
                <th scope="row">{index + 1}</th>
                <td>{sickness.patient.name}</td>
                <td>{sickness.patient.email}</td>
                <td>{sickness.diagnosis}</td>

                <td>
                  {" "}
                  {/* <Link to={`/doctor/${sickness.doctor.user._id}`}> */}
                  {sickness.doctor.user.name}
                  {/* </Link> */}
                </td>

                <td>
                  <Link to={`/hospital/${sickness.hospital._id}`}>
                    {sickness.hospital.name}
                  </Link>
                </td>
                <td>
                  <Link to={`/prescription/${sickness.prescription._id}`}>
                    View precription
                  </Link>
                </td>
                {localStorage.getItem("userType") === "DOCTOR" ? (
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <RiDeleteBin6Line
                        onClick={() => handleDelete(sickness._id)}
                        className="me-2"
                        style={{ fontSize: "20px", color: "red" }}
                      />
                      <FiEdit
                        onClick={(event) =>
                          handleEditSicknessModal(event, sickness._id)
                        }
                        style={{ fontSize: "20px", color: "green" }}
                      />
                    </div>
                  </td>
                ) : (
                  ""
                )}
              </tr>
            ))}
          </tbody>
        </table>
        <CreateSickness
          editSicknessData={editSicknessData}
          isSicknessEdit={isSicknessEdit}
          showSicknessEditModal={showSicknessEditModal}
          setEditSicknessData={setEditSicknessData}
          setIsSicknessEdit={setIsSicknessEdit}
          setShowSicknessEditModal={setShowSicknessEditModal}
          editPrescriptionData={editPrescriptionData}
          setEditPrescriptionData={setEditPrescriptionData}
          medicinesList={medicinesList}
          fetchMedicines={fetchMedicines}
          setMedicinesList={setMedicinesList}
          fetchSickness={fetchSickness}
        />
      </div>
    </>
  );
};

export default SicknessessTable;

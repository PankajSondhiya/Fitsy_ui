import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { DeleteAppointment, GetAppointment } from "../API/patient";
import { toast } from "react-toastify";
import Search from "./SearchBar";
import { useEffect, useState } from "react";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import CreateAppointment from "./AddAppointmentModal";
import { AxiosInstance } from "../Utils/AxiosInstance";
import CreateSickness from "./SicknessModal";
import { FaSearch } from "react-icons/fa";

export const AppointmentTable = ({
  appointmentList,
  setAppoinmentList,
  usersList,
  showCreateAppointmentModal,
  setShowCreateAppointmentModal,
  doctorList,
  fetchAppoinment,
  hospitalList,
  searchText,
  setSearchText,
  medicinesList,
  fetchMedicines,
  setMedicinesList,
}) => {
  const [showEditAppointmentModal, setShowEditAppointmentModal] =
    useState(false);
  const [editAppointmentDetail, setEditAppointmentDetail] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [showSicknessModal, setShowSicknessModal] = useState(false);

  async function handleDelete(id) {
    await DeleteAppointment(id);
    const filteredData = appointmentList.filter(
      (appoinment) => appoinment._id !== id
    );
    setAppoinmentList(filteredData);
    console.log(appointmentList);
    toast.success("appointment deleted successfully ");
  }
  async function handleEditAppointment(id) {
    setShowEditAppointmentModal(true);
    const data = await GetAppointment(id);
    setEditAppointmentDetail(data);
  }
  async function getAppointmentbyId(id) {
    const response = await AxiosInstance.get(`/fitsy/api/v1/appointment/${id}`);
    console.log(response.data);
    setSelectedAppointment(response.data);
    console.log(selectedAppointment);
  }

  function handleSearch(searchText) {
    if (searchText === "") {
      fetchAppoinment();
    }
    const filteredAppointment = appointmentList.filter((appointment) =>
      appointment.disease.toLowerCase().includes(searchText.toLowerCase())
    );
    setAppoinmentList(filteredAppointment);
  }

  async function handleCreateSicknessModal(id) {
    fetchMedicines();
    await getAppointmentbyId(id);
    setShowSicknessModal(true);
  }

  //   useEffect(() => {
  //     fetchMedicines();
  //   }, [medicinesList]);

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
          <h3 className="table_heading text-light">Appointments list </h3>
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
              <th scope="col">UserId</th>
              <th scope="col">Age</th>
              <th scope="col">Doctor name</th>
              <th scope="col">Hospital name</th>
              <th scope="col">Date</th>
              <th scope="col">Disease</th>
              {localStorage.getItem("userType") === "ADMIN" ? (
                ""
              ) : (
                <th scope="col">Actions</th>
              )}
            </tr>
          </thead>
          <tbody>
            {appointmentList?.map((appoinment, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{appoinment.userId.name}</td>
                <td>{appoinment.age}</td>
                <td>{appoinment.doctor.user.name}</td>
                <td>{appoinment.hospital.name}</td>
                <td>{new Date(appoinment.date).toDateString()}</td>
                <td>{appoinment.disease}</td>
                {localStorage.getItem("userType") === "ADMIN" ? (
                  ""
                ) : (
                  <td>
                    <div className="d-flex  justify-content-center align-items-center">
                      <RiDeleteBin6Line
                        className="mx-3"
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleDelete(appoinment._id)}
                      />
                      {localStorage.getItem("userType") === "DOCTOR" ? (
                        <div>
                          <MdOutlineCreateNewFolder
                            style={{
                              cursor: "pointer",
                              color: "green",
                              fontSize: "20px",
                            }}
                            onClick={() =>
                              handleCreateSicknessModal(appoinment._id)
                            }
                          />
                        </div>
                      ) : (
                        <FiEdit
                          style={{
                            cursor: "pointer",
                            color: "green",
                          }}
                          onClick={() => {
                            setIsEditMode(true);
                            handleEditAppointment(appoinment._id);
                          }}
                        />
                      )}
                    </div>{" "}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {localStorage.getItem("userType") === "PATIENT" ? (
          <button
            className="btn btn-success cutum_btn mb-1"
            onClick={() => setShowCreateAppointmentModal(true)}
            style={{ position: "fixed", right: "10px", bottom: "10px" }}
          >
            Book appointment
          </button>
        ) : (
          ""
        )}

        <CreateAppointment
          showCreateAppointmentModal={showCreateAppointmentModal}
          setShowCreateAppointmentModal={setShowCreateAppointmentModal}
          doctorList={doctorList}
          fetchAppoinment={fetchAppoinment}
          hospitalList={hospitalList}
          handleEditAppointment={handleEditAppointment}
          isEditMode={isEditMode}
          setIsEditMode={setIsEditMode}
          editAppointmentDetail={editAppointmentDetail}
          setEditAppointmentDetail={setEditAppointmentDetail}
          showEditAppointmentModal={showEditAppointmentModal}
          setShowEditAppointmentModal={setShowEditAppointmentModal}
        />
      </div>
      <CreateSickness
        medicinesList={medicinesList}
        setMedicinesList={setMedicinesList}
        setSelectedAppointment={setSelectedAppointment}
        selectedAppointment={selectedAppointment}
        showSicknessModal={showSicknessModal}
        setShowSicknessModal={setShowSicknessModal}
        fetchMedicines={fetchMedicines}
      />
    </>
  );
};

export default AppointmentTable;

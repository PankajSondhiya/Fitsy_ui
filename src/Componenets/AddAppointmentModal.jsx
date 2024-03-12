import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { useEffect, useState } from "react";

const CreateAppointment = ({
  showCreateAppointmentModal,
  setShowCreateAppointmentModal,
  doctorList,
  fetchAppoinment,
  handleEditAppointment,
  isEditMode,
  setIsEditMode,
  setEditAppointmentDetail,
  editAppointmentDetail,
  showEditAppointmentModal,
  setShowEditAppointmentModal,
}) => {
  const [appointmentData, setAppoinmentData] = useState({
    userId: localStorage.getItem("_id"),
    age: "",
    doctor: doctorList ? doctorList[0]._id : "",
    disease: "",
    date: "",
    hospital: doctorList ? doctorList[0].hospitals[0]._id : "",
  });
  const [selectedDoctorHospitalList, setSelectedDoctorHospitalList] = useState(
    []
  );

  useEffect(() => {
    if (isEditMode) {
      const selectedDoctor = doctorList.find(
        (doctor) => doctor._id === editAppointmentDetail.doctor
      );
      if (selectedDoctor) {
        setSelectedDoctorHospitalList(selectedDoctor.hospitals);
      }
    }
  }, [isEditMode, doctorList, editAppointmentDetail.doctor]);

  useEffect(() => {
    if (localStorage.getItem("userType" === "PATIENT")) {
      const initialDoctor = doctorList.find(
        (doctor) => doctor._id === appointmentData.doctor
      );
      if (initialDoctor) {
        setSelectedDoctorHospitalList(initialDoctor.hospitals);
      }
    }
  }, [appointmentData.doctor, doctorList]);

  async function handleCreateAppoinment(event) {
    if (
      appointmentData.age === "" ||
      appointmentData.doctor === "" ||
      appointmentData.date === "" ||
      appointmentData.disease === "" ||
      appointmentData.hospital === ""
    ) {
      toast.error("All fields are required");
      return;
    }
    try {
      const { data } = await AxiosInstance.post(
        "fitsy/api/v1/appointment",
        appointmentData
      );
      setAppoinmentData(data);
      toast.success("Appointment booked");
      fetchAppoinment();
      setShowCreateAppointmentModal(false);
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  }

  const handleAppoinmentCreateFormChnage = (event) => {
    setAppoinmentData({
      ...appointmentData,
      [event.target.name]: event.target.value,
    });
  };

  async function updateAppointment(id) {
    await AxiosInstance.put(
      `fitsy/api/v1/appointment/${id}`,
      editAppointmentDetail
    );
    setShowEditAppointmentModal(false);
    fetchAppoinment();
    setEditAppointmentDetail({});
  }

  const handleEditAppointmentChange = (event) => {
    setEditAppointmentDetail({
      ...editAppointmentDetail,
      [event.target.name]: event.target.value,
    });
  };

  function handleDoctorChange(event) {
    const selecteDoctorId = event.target.value;
    setAppoinmentData({
      ...appointmentData,
      doctor: selecteDoctorId,
    });

    const doctor = doctorList.find((doctor) => doctor._id === selecteDoctorId);
    setSelectedDoctorHospitalList(doctor.hospitals);
  }

  return (
    <>
      <Modal
        show={
          isEditMode ? showEditAppointmentModal : showCreateAppointmentModal
        }
        onHide={
          isEditMode
            ? () => setShowEditAppointmentModal(false)
            : () => setShowCreateAppointmentModal(false)
        }
        centered
        backdrop="static"
        variant="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit appointmentDetail" : "Appointment details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inputgroup mb-1">
            <div>UserId</div>
            <input
              type="text"
              name="userId"
              value={localStorage.getItem("_id")}
              className="form-control"
              readOnly
              required
            />
          </div>
          <div className="inputgroup mb-1">
            <div>Age</div>
            <input
              type="number"
              name="age"
              value={
                isEditMode ? editAppointmentDetail.age : appointmentData.age
              }
              onChange={
                isEditMode
                  ? handleEditAppointmentChange
                  : handleAppoinmentCreateFormChnage
              }
              className="form-control"
              placeholder="enter your age"
              required
            />
          </div>
          <div className="inputgroup mb-1">
            <div>Select Doctor </div>
            <select
              className="form-select"
              required
              name="doctor"
              placeholder="select the doctor"
              value={
                isEditMode
                  ? editAppointmentDetail.doctor
                  : appointmentData.doctor
              }
              onChange={
                isEditMode
                  ? handleEditAppointmentChange
                  : (event) => handleDoctorChange(event)
              }
            >
              {doctorList?.map((doctor) => (
                <option key={doctor._id} value={`${doctor._id}`}>
                  {doctor.user.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputgroup mb-1">
            <div>Hospital</div>
            <select
              name="hospital"
              value={
                isEditMode
                  ? editAppointmentDetail.hospital
                  : appointmentData.hospital
              }
              onChange={
                isEditMode
                  ? handleEditAppointmentChange
                  : handleAppoinmentCreateFormChnage
              }
              className="form-select"
              required
            >
              {selectedDoctorHospitalList.map((hospital) => (
                <option key={hospital._id} value={hospital._id}>
                  {hospital.name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputgroup mb-1">
            <div>Date of appoinment</div>
            <input
              type="date"
              name="date"
              value={
                isEditMode ? editAppointmentDetail.date : appointmentData.date
              }
              onChange={
                isEditMode
                  ? handleEditAppointmentChange
                  : handleAppoinmentCreateFormChnage
              }
              className="form-control"
              placeholder="select date"
              require
            />
          </div>
          <div className="inputgroup mb-1">
            <div>Disease</div>
            <textarea
              type="text"
              name="disease"
              value={
                isEditMode
                  ? editAppointmentDetail.disease
                  : appointmentData.disease
              }
              className="form-control"
              onChange={
                isEditMode
                  ? handleEditAppointmentChange
                  : handleAppoinmentCreateFormChnage
              }
              placeholder="enter your disease and symptoms"
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={
              isEditMode
                ? () => {
                    setShowEditAppointmentModal(false);
                    setIsEditMode(false);
                  }
                : () => setShowCreateAppointmentModal(false)
            }
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={
              isEditMode
                ? () => updateAppointment(editAppointmentDetail._id)
                : () => handleCreateAppoinment()
            }
          >
            {isEditMode ? "Edit appointment" : "Book appointment"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateAppointment;

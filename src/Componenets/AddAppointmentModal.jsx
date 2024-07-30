import { Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAppoinment,
  fetchAppointment,
  setAppoinmentData,
  setIsEditMode,
  setSelectedDoctor,
  setShowAppoinmentModal,
  updateAppoinmentvalue,
  updateAppointment,
} from "../Slices/appointment";
import { fetchDoctor } from "../Slices/doctor";
import { fetchHositals } from "../Slices/hospital";
import { appointment } from "../Services/appoinment";

const CreateAppointment = () => {
  const { showAppointmenModal, appoinmentData, appointmentById } = useSelector(
    (state) => state.appointment
  );
  const { doctorData } = useSelector((state) => state.doctor);
  const { selectedDoctor, isEditMode } = useSelector(
    (state) => state.appointment
  );
  const [userId, setUserId] = useState(localStorage.getItem("_id"));
  // const { appointmentByIdData, isError, isLoading } = appointmentById;
  const { doctorList, isDoctorListError, isDoctorListLoading } = doctorData;

  const dispatch = useDispatch();

  console.log("appoinmentData", appoinmentData);
  const isDisabled =
    !appoinmentData.userId ||
    !appoinmentData.age ||
    !appoinmentData.doctor ||
    !appoinmentData.hospital ||
    !appoinmentData.disease;
  useEffect(() => {
    dispatch(fetchDoctor());
    dispatch(fetchHositals());
  }, []);

  const selectedHospitalList = () => {
    const selectedDoctorHospitals = doctorList.find(
      (doctor) => doctor._id === selectedDoctor
    );
    const selectedHospitals = selectedDoctorHospitals?.hospitals;
    return selectedHospitals || [];
  };

  useEffect(() => {
    const hospital = selectedHospitalList();
    if (hospital.length === 1) {
      dispatch(
        updateAppoinmentvalue({
          field: "hospital",
          value: hospital[0]._id,
        })
      );
    }
  }, [selectedHospitalList, dispatch]);
  useEffect(() => {
    setUserId(localStorage.getItem("_id"));
  }, []);

  return (
    <>
      <Modal
        show={showAppointmenModal}
        onHide={() => {
          dispatch(setShowAppoinmentModal());
          dispatch(setIsEditMode(false));
          dispatch(
            setAppoinmentData({
              userId: localStorage.getItem("_id"),
              age: "",
              doctor: "",
              date: "",
              hospital: "",
              disease: "",
            })
          );
        }}
        centered
        backdrop="static"
        variant="dark"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {" "}
            {isEditMode ? "Edit Appointment" : "create appointment"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inputgroup mb-1">
            <div>UserId</div>
            <input
              type="text"
              name="userId"
              value={userId}
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
              value={appoinmentData.age}
              onChange={(event) =>
                dispatch(
                  updateAppoinmentvalue({
                    field: "age",
                    value: event.target.value,
                  })
                )
              }
              className="form-control"
              placeholder="enter your age"
              required
            />
          </div>
          <div className="inputgroup mb-1">
            <div>Select Doctor</div>
            <select
              className="form-select"
              required
              name="doctor"
              placeholder="select the doctor"
              value={appoinmentData.doctor}
              onChange={(event) => {
                dispatch(
                  updateAppoinmentvalue({
                    field: "doctor",
                    value: event.target.value,
                  })
                );
                dispatch(setSelectedDoctor(event.target.value));
              }}
            >
              <option value="" disabled>
                Select a doctor
              </option>
              {doctorList?.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  {doctor?.user?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="inputgroup mb-1">
            <div>Hospital</div>
            <select
              name="hospital"
              value={appoinmentData.hospital}
              onChange={(event) =>
                dispatch(
                  updateAppoinmentvalue({
                    field: "hospital",
                    value: event.target.value,
                  })
                )
              }
              className="form-select"
              required
            >
              <option value="" disabled>
                Select a hospital
              </option>
              {selectedHospitalList()?.map((hospital) => (
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
              value={appoinmentData.date}
              onChange={(event) =>
                dispatch(
                  updateAppoinmentvalue({
                    field: "date",
                    value: event.target.value,
                  })
                )
              }
              className="form-control"
              placeholder="select date"
              required
            />
          </div>
          <div className="inputgroup mb-1">
            <div>Disease</div>
            <textarea
              type="text"
              name="disease"
              value={appoinmentData.disease}
              className="form-control"
              onChange={(event) =>
                dispatch(
                  updateAppoinmentvalue({
                    field: "disease",
                    value: event.target.value,
                  })
                )
              }
              placeholder="enter your disease and symptoms"
              required
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(setShowAppoinmentModal());
              dispatch(setIsEditMode(false));
              dispatch(
                setAppoinmentData({
                  userId: localStorage.getItem("_id"),
                  age: "",
                  doctor: "",
                  date: "",
                  hospital: "",
                  disease: "",
                })
              );
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            disabled={isDisabled}
            onClick={
              isEditMode
                ? () => {
                    const payload = {
                      id: appoinmentData._id,
                      data: appoinmentData,
                    };
                    console.log("Dispatching payload:", payload);
                    dispatch(updateAppointment(payload));
                    dispatch(setShowAppoinmentModal());
                    dispatch(fetchAppointment());
                    dispatch(setIsEditMode(false));
                  }
                : () => {
                    const payload = {
                      Data: appoinmentData,
                      dispatch: dispatch,
                    };
                    console.log("dispatching the payload", payload);
                    dispatch(createAppoinment(payload));
                    dispatch(setShowAppoinmentModal());
                  }
            }
          >
            {isEditMode ? "Edit Appointment" : "Book appointment "}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateAppointment;

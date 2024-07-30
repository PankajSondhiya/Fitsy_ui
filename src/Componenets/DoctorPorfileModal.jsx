import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import doctor, {
  createNewDoctor,
  setDoctorInfo,
  setShowDoctorProfileModal,
  updateDoctorInfo,
  updatedDoctorProfile,
} from "../Slices/doctor";
import hospital, { fetchHositals } from "../Slices/hospital";
import { useCallback, useEffect, useRef } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";

import { MdOutlineCancel } from "react-icons/md";
import {
  addHospitalToDoctor,
  removeHospitalFromDoctor,
} from "../Services/doctor";

const DoctorProfileModal = () => {
  const { doctorInfo, showDoctorProfileModal } = useSelector(
    (state) => state.doctor
  );
  const { hospitalData } = useSelector((state) => state.hospital);
  const { hospitalList, isHospitalError, isHospitalLoading } = hospitalData;
  const descriptionInputRef = useRef(null);
  const isEditMode = useSelector((state) => state.doctor.isEditMode);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showDoctorProfileModal) {
      dispatch(fetchHositals());

      if (descriptionInputRef.current) {
        descriptionInputRef.current.focus();
      }
    }
  }, [showDoctorProfileModal, dispatch]);

  const list = hospitalList?.filter((hospital) =>
    doctorInfo.hospitals.includes(hospital._id)
  );

  const handleHospitalChange = (id) => {
    if (doctorInfo.hospitals.includes(id)) {
      dispatch(removeHospitalFromDoctor(id));
    } else {
      dispatch(addHospitalToDoctor(id));
    }
  };

  console.log(doctorInfo);
  return (
    <div>
      <Modal
        show={showDoctorProfileModal}
        onHide={() => {
          dispatch(setShowDoctorProfileModal(false));
          !isEditMode &&
            dispatch(
              setDoctorInfo({
                user: localStorage.getItem("_id"),
                description: "",
                experience: "",
                doctorType: "",
                gender: "",
                hospitals: [],
              })
            );
        }}
        centered
        backdrop="static"
        className="custum_modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inputgroup mb-2">
            <div>userId</div>
            <input
              type="text"
              name="user"
              value={doctorInfo.user}
              disabled
              className="form-control"
              required
            />
          </div>
          <div className="inputgroup mb-2">
            <div>description</div>
            <input
              type="text"
              name="description"
              ref={descriptionInputRef}
              value={doctorInfo.description}
              onChange={(event) =>
                dispatch(
                  updateDoctorInfo({
                    field: "description",
                    value: event.target.value,
                  })
                )
              }
              className="form-control"
              required
            />
          </div>
          <div className="inputgroup mb-2">
            <div>Experience</div>
            <input
              type="text"
              name="experience"
              value={doctorInfo.experience}
              onChange={(event) =>
                dispatch(
                  updateDoctorInfo({
                    field: "experience",
                    value: event.target.value,
                  })
                )
              }
              className="form-control"
              required
            />
          </div>
          <div className="inputgroup mb-2">
            <div>doctorType</div>
            <input
              type="text"
              name="doctorType"
              value={doctorInfo.doctorType}
              onChange={(event) =>
                dispatch(
                  updateDoctorInfo({
                    field: "doctorType",
                    value: event.target.value,
                  })
                )
              }
              className="form-control"
              required
            />
          </div>
          <div className="inputgroup mb-2">
            <div>Gender</div>
            <select
              className="form-select"
              required
              name="gender"
              value={doctorInfo.gender}
              onChange={(event) =>
                dispatch(
                  updateDoctorInfo({
                    field: "gender",
                    value: event.target.value,
                  })
                )
              }
            >
              <option value="MALE">Male</option>
              <option value="FEMALE">Female</option>
            </select>
          </div>
          <div>
            Hospitals
            <select
              className="form-select"
              required
              multiple
              name="hospitals"
              value={doctorInfo.hospitals}
              onChange={(event) => handleHospitalChange(event.target.value)}
            >
              <option value="" disabled>
                Select Hospitals
              </option>
              {hospitalList?.map((hospital) => (
                <option
                  value={hospital._id}
                  key={hospital._id}
                  style={{
                    backgroundColor: doctorInfo.hospitals.includes(hospital._id)
                      ? "#90EE90"
                      : "",
                    color: doctorInfo.hospitals.includes(hospital._id)
                      ? "white"
                      : "black",
                  }}
                >
                  {hospital?.name}{" "}
                  {/* <IoAddCircleOutline color="red" fontSize="24" /> */}
                </option>
              ))}
            </select>
            <div className="doctors_hospital d-flex flex-wrap mt-2">
              {list?.map((item, index) => (
                <div
                  className="hospital"
                  style={{
                    border: "2px solid black",
                    paddingLeft: "3px",
                    paddingRight: "5px",

                    margin: "2px",
                    borderTopLeftRadius: "20px",
                    borderBottomLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomRightRadius: "20px",
                  }}
                  key={index}
                >
                  {item.name}{" "}
                  <RxCrossCircled
                    cursor="pointer"
                    onClick={() => handleHospitalChange(item._id)}
                  />
                </div>
              ))}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              dispatch(setShowDoctorProfileModal(false));
              !isEditMode &&
                dispatch(
                  setDoctorInfo({
                    user: localStorage.getItem("_id"),
                    description: "",
                    experience: "",
                    doctorType: "",
                    gender: "",
                    hospitals: [],
                  })
                );
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              isEditMode
                ? dispatch(
                    updatedDoctorProfile({
                      id: localStorage.getItem("_id"),
                      Data: doctorInfo,
                      dispatch: dispatch,
                    })
                  )
                : dispatch(
                    createNewDoctor({ Data: doctorInfo, dispatch: dispatch })
                  );
            }}
          >
            {isEditMode ? "Edit" : "create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DoctorProfileModal;

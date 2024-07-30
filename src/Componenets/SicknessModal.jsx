import { useEffect, useState } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { toast } from "react-toastify";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { RxCrossCircled } from "react-icons/rx";

import {
  createSickness,
  setAccordianActiveKey,
  setShowSicknessModal,
  updateSickness,
  updateSicknessInfo,
} from "../Slices/sickness";
import { fetchMedicines } from "../Slices/medicines";
import {
  createPrescription,
  updatePrescription,
  updatePrescriptionInfo,
} from "../Slices/priscription";
import {
  addTest,
  addmedicinesToPrescription,
  removeMedicinestoPrescription,
  removeTest,
} from "../Services/prescription";

const CreateSickness = ({}) => {
  const [testValue, setTestValue] = useState("");

  const accordionActiveKey = useSelector(
    (state) => state.sickness.accordionActiveKey
  );

  const showSicknessModal = useSelector(
    (state) => state.sickness.showSicknessModal
  );

  const { medicinesList, isLoading, isError } = useSelector(
    (state) => state.medicines.medicinesData
  );

  const { prescriptionInfo } = useSelector((state) => state.prescription);

  const { sicknessInfo, isSicknessEdit } = useSelector(
    (state) => state.sickness
  );

  const dispatch = useDispatch();

  console.log(sicknessInfo);
  useEffect(() => {
    dispatch(fetchMedicines());
  }, [showSicknessModal]);

  function handelMedicinesChange(id) {
    if (prescriptionInfo.medicines.includes(id)) {
      dispatch(removeMedicinestoPrescription(id));
    } else {
      dispatch(addmedicinesToPrescription(id));
    }
  }

  const SelectedMedicines = medicinesList?.filter((medicine) =>
    prescriptionInfo.medicines.includes(medicine._id)
  );

  function handleTestChange(value) {
    if (prescriptionInfo.tests.includes(value)) {
      dispatch(removeTest(value));
      setTestValue("");
    } else {
      dispatch(addTest(value));
      setTestValue("");
    }
  }
  return (
    <>
      <Modal
        show={showSicknessModal}
        onHide={() => dispatch(setShowSicknessModal(false))}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {isSicknessEdit ? "EditSickness" : "Create Sickness"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="inputgroup mb-1">
            <div>Diagnosis</div>
            <input
              type="text"
              name="diagnosis"
              value={sicknessInfo.diagnosis}
              onChange={(event) =>
                dispatch(
                  updateSicknessInfo({
                    field: "diagnosis",
                    value: event.target.value,
                  })
                )
              }
              className="form-control"
              placeholder="enter diagnosis"
              required
            />
          </div>
          <div className="Priscription">
            <Accordion
              defaultActiveKey="0"
              activeKey={accordionActiveKey}
              onSelect={(key) => dispatch(setAccordianActiveKey(key))}
            >
              <Accordion.Item>
                <Accordion.Header>Priscription</Accordion.Header>
                <Accordion.Body>
                  <div className="prescription_body d-flex flex-column ">
                    <div>Medicines</div>
                    <select
                      className="form-select"
                      name="medicines"
                      placeholder="select the medicines"
                      value={prescriptionInfo.medicines}
                      multiple
                      onChange={(event) =>
                        handelMedicinesChange(event.target.value)
                      }
                    >
                      <option value="" disabled>
                        select medicines
                      </option>
                      {medicinesList &&
                        medicinesList.map((med, index) => (
                          <option key={index} value={med._id}>
                            {med.name}
                          </option>
                        ))}
                    </select>
                    <div className="d-flex flex-wrap">
                      {SelectedMedicines?.map((item, index) => (
                        <div
                          className="medicine"
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
                            onClick={() => handelMedicinesChange(item._id)}
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <div className="inputgroup mb-1">
                        <div>DoctorFee</div>

                        <input
                          type="text"
                          name="doctorFee"
                          value={prescriptionInfo.doctorFee}
                          onChange={(event) =>
                            dispatch(
                              updatePrescriptionInfo({
                                field: "doctorFee",
                                value: event.target.value,
                              })
                            )
                          }
                          className="form-control"
                          placeholder="enter doctorfee"
                        />
                      </div>
                      <div className="inputgroup mb-1">
                        <div>Medicines Fees</div>
                        <input
                          type="text"
                          name="medicinesFee"
                          value={prescriptionInfo.medicinesFee}
                          onChange={(event) =>
                            dispatch(
                              updatePrescriptionInfo({
                                field: "medicinesFee",
                                value: event.target.value,
                              })
                            )
                          }
                          className="form-control"
                          placeholder="enter medicines fee"
                        />
                      </div>
                      <div className="inputgroup mb-1 d-flex flex-column">
                        <div> Add Tests</div>
                        <div className="d-flex justify-content-center align-items-center ">
                          <input
                            type="text"
                            name="tests"
                            value={testValue}
                            onChange={(event) =>
                              setTestValue(event.target.value)
                            }
                            className="form-control"
                            placeholder="enter tests"
                          />
                          <IoMdAddCircle
                            onClick={() => handleTestChange(testValue)}
                            style={{ position: "absolute", right: "50px" }}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-wrap">
                        {prescriptionInfo.tests?.map((item, index) => (
                          <div
                            className="medicine d-flex justify-content-center align-items-center"
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
                            {item}
                            <RxCrossCircled
                              cursor="pointer"
                              onClick={() => handleTestChange(item)}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="inputgroup mb-1">
                        <div>Duration</div>
                        <input
                          type="text"
                          name="duration"
                          value={prescriptionInfo.duration}
                          onChange={(event) =>
                            dispatch(
                              updatePrescriptionInfo({
                                field: "duration",
                                value: event.target.value,
                              })
                            )
                          }
                          className="form-control"
                          placeholder="enter the duration"
                        />
                      </div>
                    </div>

                    <button
                      className="btn btn-success"
                      onClick={() =>
                        isSicknessEdit
                          ? dispatch(
                              updatePrescription({
                                id: prescriptionInfo._id,
                                Data: prescriptionInfo,
                                dispatch,
                              })
                            )
                          : dispatch(
                              createPrescription({
                                Data: prescriptionInfo,
                                dispatch,
                              })
                            )
                      }
                    >
                      {isSicknessEdit
                        ? "Edit Prescription"
                        : "Create Prescriotion"}
                    </button>
                  </div>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => dispatch(setShowSicknessModal(false))}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              isSicknessEdit
                ? dispatch(
                    updateSickness({
                      id: sicknessInfo._id,
                      Data: sicknessInfo,
                      dispatch,
                    })
                  )
                : dispatch(createSickness({ Data: sicknessInfo, dispatch }))
            }
          >
            {isSicknessEdit ? "Edit Sickness" : "Create Sickness"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CreateSickness;

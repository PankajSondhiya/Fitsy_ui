import { useState } from "react";
import { Accordion, Button, Modal } from "react-bootstrap";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { toast } from "react-toastify";
import { MdOutlineCancel } from "react-icons/md";
import { IoMdAddCircle } from "react-icons/io";
const CreateSickness = ({
  fetchSickness,
  showSicknessModal,
  setShowSicknessModal,
  selectedAppointment,
  medicinesList,
  editSicknessData,
  isSicknessEdit,
  showSicknessEditModal,
  setEditSicknessData,
  setIsSicknessEdit,
  setShowSicknessEditModal,
  editPrescriptionData,
  setEditPrescriptionData,
}) => {
  const [testValue, setTestValue] = useState("");
  const [accordionActiveKey, setAccordionActiveKey] = useState("0");
  const [prescriptionData, setPresciptionData] = useState({
    medicines: [],
    doctorFee: "",
    medicinesFee: "",
    tests: "",
    duration: "",
  });
  const [sicknessDetail, setSicknessDetail] = useState({
    patient: "",
    diagnosis: "",
    doctor: localStorage.getItem("_id"),
    hospital: "",
    prescription: "",
  });
  function sicknessCreateFormChange(event) {
    setSicknessDetail({
      ...sicknessDetail,
      [event.target.name]: event.target.value,
    });
  }

  const prescriptionChange = (event) => {
    const { name, value } = event.target;

    if (name === "medicines") {
      if (value === "") {
        setPresciptionData({
          ...prescriptionData,
          medicines: [],
        });
      } else {
        setPresciptionData({
          ...prescriptionData,
          medicines: [...prescriptionData.medicines, value],
        });
      }
    } else {
      setPresciptionData({
        ...prescriptionData,
        [name]: value,
      });
    }
  };
  console.log(editPrescriptionData);

  async function createPrescription() {
    const data = {
      medicines: prescriptionData.medicines,
      doctorFee: prescriptionData.doctorFee,
      medicinesFee: prescriptionData.medicinesFee,
      tests: prescriptionData.tests,
      duration: prescriptionData.duration,
    };
    const response = await AxiosInstance.post(
      "/fitsy/api/v1/prescriptions",
      data
    );
    const prescription = response.data;

    setSicknessDetail({
      ...sicknessDetail,
      prescription: [prescription._id],
    });

    setPresciptionData({
      medicines: [],
      doctorFee: "",
      medicinesFee: "",
      tests: "",
      duration: "",
    });
    setAccordionActiveKey("-1");
  }

  function removeMedicine(mediId) {
    console.log(mediId);
    if (isSicknessEdit) {
      const updatedMedi = editPrescriptionData.medicines.filter(
        (medId) => medId !== mediId
      );
      console.log(updatedMedi);
      setEditPrescriptionData({
        ...editPrescriptionData,
        medicines: updatedMedi,
      });
    } else {
      const updatedMedicines = prescriptionData.medicines.filter(
        (id) => id !== mediId
      );
      setPresciptionData({
        ...prescriptionData,
        medicines: updatedMedicines,
      });
    }
  }

  function addTests(value) {
    if (isSicknessEdit) {
      const TestList = [...editPrescriptionData.tests, value];
      console.log(TestList);
      setEditPrescriptionData({
        ...editPrescriptionData,
        tests: TestList,
      });
      setTestValue("");
    } else {
      const updatedTasks = [...prescriptionData.tests, value];
      //every time it is creating the new array and adding the currrent value

      setPresciptionData({
        ...prescriptionData,
        tests: updatedTasks,
      });
      setTestValue("");
    }
  }

  function removeTests(value) {
    if (isSicknessEdit) {
      const updatedTest = editPrescriptionData.tests.filter(
        (test) => test.toLowerCase() !== value.toLowerCase()
      );
      setEditPrescriptionData({
        ...editPrescriptionData,
        tests: updatedTest,
      });
    } else {
      const updatedTests = prescriptionData.tests.filter(
        (test) => test.toLowerCase() !== value.toLowerCase()
      );
      setPresciptionData({
        ...prescriptionData,
        tests: updatedTests,
      });
    }
  }

  async function createSickness() {
    const data = {
      patient: selectedAppointment.userId,
      diagnosis: sicknessDetail.diagnosis,
      doctor: selectedAppointment.doctor,
      hospital: selectedAppointment.hospital,
      prescription: sicknessDetail.prescription,
    };
    try {
      await AxiosInstance.post("/fitsy/api/v1/sicknesses", data);
      toast.success("sickness created");
    } catch (ex) {
      toast.error("error occured try again in some time");
    }
    setShowSicknessModal(false);
    fetchSickness();
  }

  const sicknessEditChange = (event) => {
    setEditSicknessData({
      ...editSicknessData,
      [event.target.name]: event.target.value,
    });
  };
  const prescriptionsEditChange = (event) => {
    setEditPrescriptionData({
      ...editPrescriptionData,
      [event.target.name]: event.target.value,
    });
  };

  async function UpdateSickness(id) {
    try {
      await AxiosInstance.put(
        `/fitsy/api/v1/sicknesses/${id}`,
        editSicknessData
      );
      setIsSicknessEdit(false);
      setShowSicknessEditModal(false);
      setEditSicknessData({});
      fetchSickness();
    } catch (ex) {
      toast.success("sickness updated successfully");
    }
  }

  async function updatePrescriotion(id) {
    await AxiosInstance.put(
      `/fitsy/api/v1/prescriptions/${id}`,
      editPrescriptionData
    );
    setAccordionActiveKey("-1");
  }

  const editPrecriptionMedicineChange = (event) => {
    const { name, value } = event.target;
    if (isSicknessEdit) {
      if (value === "") {
        setEditPrescriptionData({
          ...editPrescriptionData,
          medicines: [],
        });
      } else {
        setEditPrescriptionData({
          ...editPrescriptionData,
          medicines: [...editPrescriptionData.medicines, value],
        });
      }
    }
  };

  return (
    <>
      {" "}
      <Modal
        show={isSicknessEdit ? showSicknessEditModal : showSicknessModal}
        onHide={
          isSicknessEdit
            ? () => setShowSicknessEditModal(false)
            : () => setShowSicknessModal(false)
        }
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
              value={
                isSicknessEdit
                  ? editSicknessData.diagnosis
                  : sicknessDetail.diagnosis
              }
              onChange={
                isSicknessEdit ? sicknessEditChange : sicknessCreateFormChange
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
              onSelect={(key) => setAccordionActiveKey(key)}
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
                      value={
                        isSicknessEdit
                          ? editPrescriptionData.medicines
                          : prescriptionData.medicines
                      }
                      onChange={
                        isSicknessEdit
                          ? editPrecriptionMedicineChange
                          : prescriptionChange
                      }
                    >
                      <option></option>

                      {medicinesList &&
                        medicinesList.map((med, index) => (
                          <option key={index} value={med._id}>
                            {med.name}
                          </option>
                        ))}
                    </select>
                    <div className="d-flex mt-2">
                      {isSicknessEdit
                        ? editPrescriptionData.medicines &&
                          editPrescriptionData.medicines.map((medId, index) => {
                            const medicine = medicinesList.find(
                              (med) => med._id === medId
                            );
                            return (
                              <Button
                                key={index}
                                variant="secondary"
                                className="me-2"
                              >
                                {medicine.name}
                                <MdOutlineCancel
                                  onClick={() => removeMedicine(medicine._id)}
                                />
                              </Button>
                            );
                          })
                        : prescriptionData.medicines &&
                          prescriptionData.medicines.map((mediId, index) => {
                            const medicine = medicinesList.find(
                              (med) => med._id === mediId
                            );
                            return (
                              <Button
                                key={index}
                                variant="secondary"
                                className="me-2"
                              >
                                {medicine ? medicine.name : "Unknown Medicine"}
                                <MdOutlineCancel
                                  onClick={() => removeMedicine(mediId)}
                                />
                              </Button>
                            );
                          })}
                    </div>

                    <div>
                      <div className="inputgroup mb-1">
                        <div>DoctorFee</div>

                        <input
                          type="number"
                          name="doctorFee"
                          value={
                            isSicknessEdit
                              ? editPrescriptionData.doctorFee
                              : prescriptionData.doctorFee
                          }
                          onChange={
                            isSicknessEdit
                              ? (event) => prescriptionsEditChange(event)
                              : prescriptionChange
                          }
                          className="form-control"
                          placeholder="enter doctorfee"
                        />
                      </div>
                      <div className="inputgroup mb-1">
                        <div>Medicines Fees</div>
                        <input
                          type="number"
                          name="medicinesFee"
                          value={
                            isSicknessEdit
                              ? editPrescriptionData.medicinesFee
                              : prescriptionData.medicinesFee
                          }
                          onChange={
                            isSicknessEdit
                              ? prescriptionsEditChange
                              : prescriptionChange
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
                            onChange={(e) => setTestValue(e.target.value)}
                            className="form-control"
                            placeholder="enter tests"
                          />
                          <IoMdAddCircle
                            onClick={() => addTests(testValue)}
                            style={{ position: "absolute", right: "50px" }}
                          />
                        </div>
                      </div>
                      <div className="tests_list">
                        {isSicknessEdit
                          ? editPrescriptionData.tests &&
                            editPrescriptionData.tests.map((test, index) => (
                              <button key={index} className="btn btn-secondary">
                                {test}
                                <MdOutlineCancel
                                  onClick={() => removeTests(test)}
                                />
                              </button>
                            ))
                          : prescriptionData.tests &&
                            prescriptionData.tests.map((test, index) => (
                              <button key={index} className="btn btn-secondary">
                                {test}
                                <MdOutlineCancel
                                  onClick={() => removeTests(test)}
                                />
                              </button>
                            ))}
                      </div>
                      <div className="inputgroup mb-1">
                        <div>Duration</div>
                        <input
                          type="number"
                          name="duration"
                          value={
                            isSicknessEdit
                              ? editPrescriptionData.duration
                              : prescriptionData.duration
                          }
                          onChange={
                            isSicknessEdit
                              ? prescriptionsEditChange
                              : prescriptionChange
                          }
                          className="form-control"
                          placeholder="enter the duration"
                        />
                      </div>
                    </div>

                    <button
                      className="btn btn-success"
                      onClick={
                        isSicknessEdit
                          ? () => updatePrescriotion(editPrescriptionData._id)
                          : () => createPrescription()
                      }
                    >
                      {isSicknessEdit
                        ? "Edit Prescription"
                        : "Create Prescription"}
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
            onClick={() => setShowSicknessModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={
              isSicknessEdit
                ? () => UpdateSickness(editSicknessData._id)
                : () => createSickness()
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

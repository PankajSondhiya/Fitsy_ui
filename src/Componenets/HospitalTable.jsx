import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { toast } from "react-toastify";
import Search from "./SearchBar";

const HospitalsList = ({
  hospitalList,
  fetchHospitals,
  showHospitalModal,
  setShowHospitalModal,
  isCreateHospital,
  setIsCreateHospital,
  setHospitalList,
}) => {
  const [hospitalDetail, setHospitalDetail] = useState({});

  const hospitalDetailFormChange = (event) => {
    setHospitalDetail({
      ...hospitalDetail,
      [event.target.name]: event.target.value,
    });
  };

  const hospitalCreateFormChange = (event) => {
    setHospitalDetail({
      ...hospitalDetail,
      [event.target.name]: event.target.value,
    });
  };
  async function createHospital() {
    const { data } = await AxiosInstance.post(
      "/fitsy/api/v1/hospitals",
      hospitalDetail
    );
    setIsCreateHospital(false);
    setHospitalDetail({});
    fetchHospitals();
    setShowHospitalModal(false);
  }

  async function handleShowHospitalModal(id) {
    const { data } = await AxiosInstance.get(`/fitsy/api/v1/hospitals/${id}`);
    setHospitalDetail(data);
    setShowHospitalModal(true);
  }

  async function handleEditHospitalDetail(id) {
    await AxiosInstance.put(`/fitsy/api/v1/hospitals/${id}`, hospitalDetail);
    toast.success("Updated successfully");
    setShowHospitalModal(false);
    setHospitalDetail({});
    fetchHospitals();
  }

  async function deleteHospital(id) {
    await AxiosInstance.delete(`/fitsy/api/v1/hospitals/${id}`);
    const filteredData = hospitalList.filter((hospital) => hospital._id !== id);
    setHospitalList(filteredData);
  }

  return (
    <>
      <div>
        <div
          className="heading_search d-flex py-5 align-items-center justify-content-between "
          style={{
            position: "sticky",
            height: "50px",
            top: "0px",
            // zIndex: "400",
            marginBottom: "4px",
          }}
        >
          <h3 className="table_heading text-light">Hospital list </h3>
          <Search />
        </div>
        <table class="table table-dark diagnosis_table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Description</th>
              <th scope="col">Bed no.</th>
              <th scope="col">Address</th>
              <th scope="col">Contact no</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hospitalList?.map((hospital, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{hospital.name}</td>
                <td>{hospital.email}</td>
                <td>{hospital.description}</td>
                <td>{hospital.noOfBeds}</td>
                <td>{hospital.address}</td>
                <td>{hospital.contactNo}</td>

                <td>
                  <div className="d-flex ">
                    <RiDeleteBin6Line
                      className="mx-3"
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => deleteHospital(hospital._id)}
                    />
                    <FiEdit
                      style={{
                        cursor: "pointer",
                        color: "green",
                      }}
                      onClick={() => {
                        handleShowHospitalModal(hospital._id);
                        setIsCreateHospital(false);
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="btn btn-success m-2"
          style={{ position: "fixed", bottom: "5px", right: "5px" }}
          onClick={() => {
            setShowHospitalModal(true);
            setIsCreateHospital(true);
          }}
        >
          Create hospital
        </button>

        <Modal
          show={showHospitalModal}
          onHide={() => setShowHospitalModal(false)}
          centered
          backdrop="static"
          variant="dark"
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {isCreateHospital ? "Create hospital" : "Edit hospital"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="inputgroup mb-1">
              <div>Name</div>
              <input
                type="text"
                name="name"
                value={hospitalDetail.name}
                onChange={
                  isCreateHospital
                    ? hospitalCreateFormChange
                    : hospitalDetailFormChange
                }
                className="form-control"
                required
              />
            </div>
            <div className="inputgroup mb-1">
              <div>Email</div>
              <input
                type="text"
                name="email"
                value={hospitalDetail.email}
                onChange={
                  isCreateHospital
                    ? hospitalCreateFormChange
                    : hospitalDetailFormChange
                }
                className="form-control"
                required
              />
            </div>

            <div className="inputgroup mb-1">
              <div>Beds No</div>
              <input
                type="number"
                className="form-control"
                required
                name="noOfBeds"
                value={hospitalDetail.noOfBeds}
                onChange={
                  isCreateHospital
                    ? hospitalCreateFormChange
                    : hospitalDetailFormChange
                }
              />
            </div>
            <div className="inputgroup mb-1">
              <div>Address</div>
              <input
                className="form-control"
                required
                name="address"
                value={hospitalDetail.address}
                onChange={
                  isCreateHospital
                    ? hospitalCreateFormChange
                    : hospitalDetailFormChange
                }
              />
            </div>
            <div className="inputgroup mb-1">
              <div>Contact no</div>
              <input
                type="number"
                className="form-control"
                required
                name="contactNo"
                value={hospitalDetail.contactNo}
                onChange={
                  isCreateHospital
                    ? hospitalCreateFormChange
                    : hospitalDetailFormChange
                }
              />
            </div>
            <div className="inputgroup mb-1">
              <div>Description</div>
              <textarea
                className="form-control"
                required
                name="description"
                value={hospitalDetail.description}
                onChange={
                  isCreateHospital
                    ? hospitalCreateFormChange
                    : hospitalDetailFormChange
                }
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowHospitalModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={
                isCreateHospital
                  ? () => createHospital()
                  : () => handleEditHospitalDetail(hospitalDetail._id)
              }
            >
              {isCreateHospital ? "create" : "edit"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default HospitalsList;

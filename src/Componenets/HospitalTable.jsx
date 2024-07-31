import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Button, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { toast } from "react-toastify";
import Search from "./SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewHospital,
  deleteHospital,
  editHospital,
  fetchHositals,
  fetchHospitals,
  hospitalById,
  setHospitalValue,
  setIsHospitalEdit,
  setShowCreateHospitalModal,
  updateHospitalValue,
} from "../Slices/hospital";
import { editHospitalById } from "../Services/hospital";
import TableHeader from "./TableHeader";
import { setFilteredData } from "../Slices/users";

const HospitalsList = () => {
  const dispatch = useDispatch();
  const {
    hospitalData,
    showCreateHospitalModal,
    hospitalValue,
    isHospitalEdit,
  } = useSelector((state) => state.hospital);
  const { hospitalList, isHospitalError, isHospitalLoading } = hospitalData;
  const { filteredData } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchHositals());
  }, [dispatch]);

  useEffect(() => {
    if (hospitalList) {
      dispatch(setFilteredData(hospitalList));
    }
  }, [hospitalList]);

  function handleSearch(term) {
    if (hospitalList) {
      const filtered = hospitalList?.filter(
        (hospital) =>
          hospital?.name &&
          hospital.name.toLowerCase().includes(term?.toLowerCase())
      );
      dispatch(setFilteredData(filtered));
    }
  }

  const isDisabled =
    !hospitalValue.name ||
    !hospitalValue.email ||
    !hospitalValue.noOfBeds ||
    !hospitalValue.address ||
    !hospitalValue.contactNo ||
    !hospitalValue.description;

  return (
    <>
      <div>
        <TableHeader title="Hospital Table" onSearch={handleSearch} />
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
            {filteredData?.map((hospital, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{hospital?.name}</td>
                <td>{hospital?.email}</td>
                <td>{hospital?.description}</td>
                <td>{hospital?.noOfBeds}</td>
                <td>{hospital?.address}</td>
                <td>{hospital?.contactNo}</td>
                <td>
                  <div className="d-flex ">
                    <RiDeleteBin6Line
                      className="mx-3"
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() =>
                        dispatch(deleteHospital({ id: hospital._id }))
                      }
                    />
                    <FiEdit
                      style={{
                        cursor: "pointer",
                        color: "green",
                      }}
                      onClick={() => {
                        dispatch(setIsHospitalEdit(true));
                        dispatch(setShowCreateHospitalModal(true));
                        dispatch(hospitalById({ id: hospital._id }));
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
            dispatch(setShowCreateHospitalModal(true));
          }}
        >
          create hospital
        </button>

        <Modal
          show={showCreateHospitalModal}
          onHide={() => {
            dispatch(setShowCreateHospitalModal(false));
            dispatch(setIsHospitalEdit(false));
            dispatch(
              setHospitalValue({
                name: "",
                email: "",
                noOfBeds: 0,
                address: "",
                contactNo: 0,
                description: "",
              })
            );
          }}
          centered
          backdrop="static"
          variant="dark"
        >
          <Modal.Header closeButton>
            <Modal.Title>{isHospitalEdit ? "Edit " : "Create"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="inputgroup mb-1">
              <div>Name</div>
              <input
                type="text"
                name="name"
                value={hospitalValue.name}
                onChange={(event) =>
                  dispatch(
                    updateHospitalValue({
                      field: "name",
                      value: event.target.value,
                    })
                  )
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
                value={hospitalValue.email}
                onChange={(event) =>
                  dispatch(
                    updateHospitalValue({
                      field: "email",
                      value: event.target.value,
                    })
                  )
                }
                className="form-control"
                required
              />
            </div>

            <div className="inputgroup mb-1">
              <div>Beds No</div>
              <input
                type="text"
                className="form-control"
                required
                name="noOfBeds"
                value={hospitalValue.noOfBeds}
                onChange={(event) =>
                  dispatch(
                    updateHospitalValue({
                      field: "noOfBeds",
                      value: event.target.value,
                    })
                  )
                }
              />
            </div>
            <div className="inputgroup mb-1">
              <div>Address</div>
              <input
                className="form-control"
                required
                name="address"
                value={hospitalValue.address}
                onChange={(event) =>
                  dispatch(
                    updateHospitalValue({
                      field: "address",
                      value: event.target.value,
                    })
                  )
                }
              />
            </div>
            <div className="inputgroup mb-1">
              <div>Contact no</div>
              <input
                type="text"
                className="form-control"
                required
                name="contactNo"
                value={hospitalValue.contactNo}
                onChange={(event) =>
                  dispatch(
                    updateHospitalValue({
                      field: "contactNo",
                      value: event.target.value,
                    })
                  )
                }
              />
            </div>
            <div className="inputgroup mb-1">
              <div>Description</div>
              <textarea
                className="form-control"
                required
                name="description"
                value={hospitalValue.description}
                onChange={(event) =>
                  dispatch(
                    updateHospitalValue({
                      field: "description",
                      value: event.target.value,
                    })
                  )
                }
              />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                dispatch(setShowCreateHospitalModal(false));
                dispatch(setIsHospitalEdit(false));
                dispatch(
                  setHospitalValue({
                    name: "",
                    email: "",
                    noOfBeds: 0,
                    address: "",
                    contactNo: 0,
                    description: "",
                  })
                );
              }}
            >
              Cancel
            </Button>
            <Button
              disabled={isDisabled}
              variant="primary"
              onClick={
                isHospitalEdit
                  ? () => {
                      dispatch(
                        editHospital({
                          id: hospitalValue._id,
                          Data: hospitalValue,
                          dispatch: dispatch,
                        })
                      );
                      dispatch(setShowCreateHospitalModal(false));
                    }
                  : () => {
                      dispatch(
                        createNewHospital({
                          Data: hospitalValue,
                          dispatch: dispatch,
                        })
                      );
                      dispatch(setShowCreateHospitalModal(false));
                    }
              }
            >
              {isHospitalEdit ? "edit hospital" : "create hospital"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default HospitalsList;

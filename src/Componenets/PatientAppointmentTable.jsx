import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import CreateAppointment from "./AddAppointmentModal";
import CreateSickness from "./SicknessModal";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteAppointment,
  fetchAppoinmentById,
  fetchAppointment,
  setIsEditMode,
  setShowAppoinmentModal,
} from "../Slices/appointment";
import { useEffect } from "react";
import { setShowSicknessModal, updateSicknessInfo } from "../Slices/sickness";

import TableHeader from "./TableHeader";
import { setFilteredData } from "../Slices/users";

export const AppointmentTable = () => {
  const { data, isError, IsLoading } = useSelector(
    (state) => state.appointment.appoinmentList
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAppointment());
  }, [dispatch]);
  const { filteredData } = useSelector((state) => state.users);

  useEffect(() => {
    if (data) {
      dispatch(setFilteredData(data));
    }
  }, [data, dispatch]);

  function handleSearch(term) {
    if (data) {
      const filtered = data.filter((appoinment) =>
        appoinment?.userId?.name.toLowerCase().includes(term?.toLowerCase())
      );
      dispatch(setFilteredData(filtered));
    }
  }
  return (
    <>
      <div>
        <TableHeader title="Appoinment Table" onSearch={handleSearch} />
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
            {filteredData?.map((appoinment, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{appoinment?.userId?.name}</td>
                <td>{appoinment?.age}</td>
                <td>{appoinment?.doctor?.user?.name}</td>
                <td>{appoinment?.hospital?.name}</td>
                <td>{new Date(appoinment?.date).toDateString()}</td>
                <td>{appoinment?.disease}</td>
                {localStorage.getItem("userType") === "ADMIN" ? (
                  ""
                ) : (
                  <td>
                    <div className="d-flex  justify-content-center align-items-center">
                      <RiDeleteBin6Line
                        className="mx-3"
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => {
                          const payload = {
                            id: appoinment._id,
                          };
                          dispatch(deleteAppointment(payload));
                        }}
                      />
                      {localStorage.getItem("userType") === "DOCTOR" ? (
                        <div>
                          <MdOutlineCreateNewFolder
                            style={{
                              cursor: "pointer",
                              color: "green",
                              fontSize: "20px",
                            }}
                            onClick={() => {
                              dispatch(setShowSicknessModal(true));
                              dispatch(
                                updateSicknessInfo({
                                  field: "patient",
                                  value: appoinment?.userId?._id,
                                })
                              );
                              dispatch(
                                updateSicknessInfo({
                                  field: "doctor",
                                  value: appoinment?.doctor?._id,
                                })
                              );
                              dispatch(
                                updateSicknessInfo({
                                  field: "hospital",
                                  value: appoinment.hospital._id,
                                })
                              );
                            }}
                          />
                        </div>
                      ) : (
                        <FiEdit
                          style={{
                            cursor: "pointer",
                            color: "green",
                          }}
                          onClick={() => {
                            const payload = {
                              id: appoinment._id,
                              dispatch: dispatch,
                            };
                            dispatch(setIsEditMode(true));
                            dispatch(setShowAppoinmentModal());
                            dispatch(fetchAppoinmentById(payload));
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
            onClick={() => {
              dispatch(setShowAppoinmentModal());
            }}
            style={{ position: "fixed", right: "10px", bottom: "10px" }}
          >
            Book appointment
          </button>
        ) : (
          ""
        )}
        <CreateAppointment />
      </div>
      <CreateSickness />
    </>
  );
};

export default AppointmentTable;

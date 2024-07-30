import { Link, useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useEffect } from "react";
import CreateSickness from "./SicknessModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteSickness,
  fetchSickness,
  setIsSicknessEdit,
  setShowSicknessModal,
  setSicknessInfo,
} from "../Slices/sickness";
import { prescriptionById, setPrescriptionInfo } from "../Slices/priscription";
import { fetchDoctorById } from "../Slices/doctor";
import { hospitalById } from "../Slices/hospital";
import TableHeader from "./TableHeader";
import { setFilteredData } from "../Slices/users";

const SicknessessTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isError, isLoading } = useSelector(
    (store) => store.sickness.sicknessList
  );
  const filteredData = useSelector((state) => state.users.filteredData);

  useEffect(() => {
    dispatch(fetchSickness());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      dispatch(setFilteredData(data));
    }
  }, [data]);

  function handleSearch(term) {
    if (data) {
      const filtered = data.filter((sickness) =>
        sickness?.patient?.name.toLowerCase().includes(term.toLowerCase())
      );
      dispatch(setFilteredData(filtered));
    }
  }
  return (
    <>
      <TableHeader title="Sickness Table" onSearch={handleSearch} />
      <div>
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
            {filteredData?.map((sickness, index) => (
              <tr key={sickness._id}>
                <th scope="row">{index + 1}</th>
                <td>{sickness?.patient?.name}</td>
                <td>{sickness?.patient?.email}</td>
                <td>{sickness?.diagnosis}</td>

                <td>
                  {" "}
                  <Link
                    to={`/doctor/${sickness?.doctor?.user?._id}`}
                    onClick={() =>
                      dispatch(
                        fetchDoctorById({ id: sickness?.doctor?.user?._id })
                      )
                    }
                  >
                    {sickness?.doctor?.user?.name}
                  </Link>
                </td>

                <td>
                  <Link
                    to={`/hospital/${sickness?.hospital?._id}`}
                    onClick={() =>
                      dispatch(hospitalById({ id: sickness?.hospital?._id }))
                    }
                  >
                    {sickness?.hospital?.name}
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/prescription/${sickness?.prescription?._id}`}
                    onClick={() =>
                      dispatch(
                        prescriptionById({ id: sickness?.prescription?._id })
                      )
                    }
                  >
                    View precription
                  </Link>
                </td>
                {localStorage.getItem("userType") === "DOCTOR" ? (
                  <td>
                    <div className="d-flex justify-content-center align-items-center">
                      <RiDeleteBin6Line
                        onClick={() =>
                          dispatch(deleteSickness({ id: sickness?._id }))
                        }
                        className="me-2"
                        style={{ fontSize: "20px", color: "red" }}
                      />
                      <FiEdit
                        onClick={() => {
                          dispatch(setShowSicknessModal(true));
                          dispatch(
                            setSicknessInfo({
                              _id: sickness?._id,
                              diagnosis: sickness?.diagnosis,
                            })
                          );
                          dispatch(setIsSicknessEdit(true));
                          dispatch(
                            setPrescriptionInfo({
                              _id: sickness?.prescription._id,
                              medicines: sickness?.prescription?.medicines.map(
                                (med) => med._id
                              ),
                              doctorFee: sickness?.prescription?.doctorFee,
                              medicinesFee:
                                sickness?.prescription?.medicinesFee,
                              tests: sickness?.prescription?.tests,
                              duration: sickness?.prescription?.duration,
                            })
                          );
                        }}
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
        <CreateSickness />
      </div>
    </>
  );
};

export default SicknessessTable;

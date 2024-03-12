import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "../Utils/AxiosInstance";
import Navbar from "../Componenets/Navbaar";

const Prescription = () => {
  const [prescriptionInfo, setPrescriptionInfo] = useState([]);
  const [isPrescriptionLoading, setIsPrescriptionLoading] = useState(false);
  const { id } = useParams();

  async function fetchPrescriptionInfo(id) {
    try {
      const { data } = await AxiosInstance.get(
        `/fitsy/api/v1/prescriptions/${id}`
      );
      setPrescriptionInfo(data);
    } catch (ex) {
      console.log(ex);
    } finally {
      setIsPrescriptionLoading(false);
    }
  }

  useEffect(() => {
    fetchPrescriptionInfo(id);
  }, [id]);
  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#1E1E1E" }}>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center mt-3">
          <h2 style={{ color: "black" }}>Prescription Details </h2>
        </div>
        <div
          className="data my-5 mx-5 p-3"
          style={{ borderBottom: "2px solid grey" }}
        >
          {isPrescriptionLoading ? (
            "Loading..."
          ) : (
            <ul
              style={{
                listStyleType: "none",
                color: "black",
                padding: 0,
                fontSize: "25px",
              }}
            >
              <li className="mb-2">
                <strong>Medicine:</strong>{" "}
                <span className="text-success">
                  {" "}
                  {prescriptionInfo.medicines &&
                    prescriptionInfo.medicines
                      .map((med) => med.name)
                      .join(", ")}
                </span>
              </li>
              <li className="mb-2">
                <strong>Doctor Fees</strong>
                <span className="text-success">
                  {" "}
                  {prescriptionInfo.doctorFee}
                </span>
              </li>
              <li className="mb-2">
                <strong>Medicines Fees:</strong>{" "}
                <span className="text-success">
                  {prescriptionInfo.medicinesFee}
                </span>
              </li>
              <li className="mb-2">
                <strong>Tests:</strong>{" "}
                <span className="text-success">
                  {prescriptionInfo.tests &&
                    prescriptionInfo.tests.map((test) => test).join(", ")}
                </span>
              </li>
              <li className="mb-2">
                <strong>Duration:</strong>{" "}
                <span className="text-success">
                  {prescriptionInfo.duration}
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Prescription;

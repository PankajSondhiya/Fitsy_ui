import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "../Utils/AxiosInstance";
import Navbar from "../Componenets/Navbaar";
import { useDispatch, useSelector } from "react-redux";

const Prescription = () => {
  const { prescriptionInfo } = useSelector((state) => state.prescription);

  const dispatch = useDispatch();

  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#1E1E1E" }}>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center mt-3">
          <h2 style={{ color: "white" }}>Prescription Details </h2>
        </div>
        <div
          className="data my-5 mx-5 p-3"
          style={{ borderBottom: "2px solid grey" }}
        >
          <ul
            style={{
              listStyleType: "none",
              color: "black",
              padding: 0,
              fontSize: "25px",
            }}
          >
            <li className="mb-2">
              <strong className="text-white">Medicine:</strong>
              {"   "}
              <span className="text-white">
                {prescriptionInfo.medicines &&
                  prescriptionInfo.medicines.map((med) => med.name).join(", ")}
              </span>
            </li>
            <li className="mb-2">
              <strong className="text-white">Doctor Fees</strong> {"   "}
              <span className="text-white">{prescriptionInfo.doctorFee}</span>
            </li>
            <li className="mb-2">
              <strong className="text-white">Medicines Fees:</strong> {"   "}
              <span className="text-white">
                {prescriptionInfo.medicinesFee}
              </span>
            </li>
            <li className="mb-2">
              <strong className="text-white">Tests:</strong> {"   "}
              <span className="text-white">
                {prescriptionInfo.tests &&
                  prescriptionInfo.tests.map((test) => test).join(", ")}
              </span>
            </li>
            <li className="mb-2">
              <strong className="text-white">Duration:</strong>
              <span className="text-white">{prescriptionInfo.duration}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Prescription;

import React, { Suspense, useEffect, useState } from "react";
import { AxiosInstance } from "../Utils/AxiosInstance";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "../Pages/homePage.css";
import Navbar from "../Componenets/Navbaar";

import { useDispatch, useSelector } from "react-redux";
import { fetchSickness, setTableToggle } from "../Slices/sickness";
import { fetchAppointment } from "../Slices/appointment";
import Loader from "../Componenets/Loader";
const DiagnosisTable = React.lazy(() =>
  import("../Componenets/PatientDiagnosisTable")
);
const AppointmentTable = React.lazy(() =>
  import("../Componenets/PatientAppointmentTable")
);
const Patient = () => {
  const { tableToggle } = useSelector((store) => store.sickness);
  const { data, isError, isLoading } = useSelector(
    (store) => store.sickness.sicknessList
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAppointment());
    dispatch(fetchSickness());
  }, [dispatch]);

  return (
    <div className="vh-100">
      <Navbar />

      <div
        className="patient_wrapper d-flex"
        style={{ backgroundColor: "#1E1E1E" }}
      >
        <div
          className="sideBar d-flex flex-column vh-100 bg-dark"
          style={{ width: "20%", position: "sticky", top: "0px" }}
        >
          <button
            className="btn btn-success my-1"
            onClick={() => dispatch(setTableToggle())}
          >
            Sickness list
          </button>
          <button
            className="btn btn-success  mb-1"
            onClick={() => dispatch(setTableToggle())}
          >
            Appointment list
          </button>
        </div>
        <div
          className="main_data d-flex flex-column p-3"
          style={{ width: "100%" }}
        >
          <div className="title mx-auto">
            <h2 className="text-light">{`Welcome ${localStorage.getItem(
              "userName"
            )}!`}</h2>
          </div>
          <div className="mx-auto text-light">
            {data.length === 0 && data.length === 0
              ? ""
              : "Take a look on your stats"}
          </div>
          <div>
            {/* {isLoading ? (
              <Loader />
            ) : ( */}
            <div className="patient_data" style={{ width: "100%" }}>
              {tableToggle ? (
                <Suspense fallback={<Loader />}>
                  <DiagnosisTable />
                </Suspense>
              ) : (
                <Suspense fallback={<Loader />}>
                  <AppointmentTable />
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Patient;

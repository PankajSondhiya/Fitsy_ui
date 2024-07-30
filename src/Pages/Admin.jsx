import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../Componenets/Navbaar";
import Loader from "../Componenets/Loader";
const SicknessessTable = React.lazy(() =>
  import("../Componenets/PatientDiagnosisTable")
);
const AppointmentTable = React.lazy(() =>
  import("../Componenets/PatientAppointmentTable")
);
const UsersList = React.lazy(() => import("../Componenets/UsersTable"));
const HospitalsList = React.lazy(() => import("../Componenets/HospitalTable"));

const Admin = () => {
  const [activeTable, setActiveTable] = useState(1);

  const renderTable = () => {
    switch (activeTable) {
      case 1:
        return (
          <Suspense fallback={<Loader />}>
            <SicknessessTable />
          </Suspense>
        );
      case 2:
        return (
          <Suspense fallback={<Loader />}>
            <UsersList />
          </Suspense>
        );
      case 3:
        return (
          <Suspense fallback={<Loader />}>
            <AppointmentTable />
          </Suspense>
        );

      case 4:
        return (
          <Suspense fallback={<Loader />}>
            <HospitalsList />
          </Suspense>
        );

      default:
        return null;
    }
  };

  return (
    <>
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
              className="btn btn-success m-1"
              onClick={() => setActiveTable(1)}
            >
              Sicknesses
            </button>
            <button
              className="btn btn-success m-1"
              onClick={() => setActiveTable(2)}
            >
              Users
            </button>
            <button
              className="btn btn-success m-1"
              onClick={() => setActiveTable(3)}
            >
              Appointments
            </button>
            <button
              className="btn btn-success m-1"
              onClick={() => setActiveTable(4)}
            >
              Hospitals
            </button>
          </div>
          <div
            className="main_data d-flex flex-column p-3"
            style={{ width: "100%" }}
          >
            <div className="title mx-auto">
              <h2 className="text-light">{`Welcome Admin ${localStorage.getItem(
                "userName"
              )}!`}</h2>
            </div>

            <div className="mx-auto text-light">Take a look on your stats</div>

            <div className="my-5">{renderTable()}</div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Admin;

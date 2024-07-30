import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "../Utils/AxiosInstance";
import Navbar from "../Componenets/Navbaar";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctorById } from "../Slices/doctor";

const DoctorInfo = () => {
  const { doctorDetail } = useSelector((state) => state.doctor);
  console.log(doctorDetail);

  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#1E1E1E" }}>
        <Navbar />
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
              <strong>Name:</strong>{" "}
              <span className="text-light"> {doctorDetail?.user?.name}</span>
            </li>
            <li className="mb-2">
              <strong>Email:</strong>
              <span className="text-light"> {doctorDetail?.user?.email}</span>
            </li>
            <li className="mb-2">
              <strong>Description:</strong>{" "}
              <span className="text-light">{doctorDetail?.description}</span>
            </li>
            <li className="mb-2">
              <strong>Doctor Type:</strong>{" "}
              <span className="text-light">{doctorDetail?.doctorType}</span>
            </li>
            <li className="mb-2">
              <strong>Experience:</strong>{" "}
              <span className="text-light">{doctorDetail?.experience}</span>
            </li>
            <li className="mb-2">
              <strong>Gender:</strong>{" "}
              <span className="text-light">{doctorDetail?.gender}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default DoctorInfo;

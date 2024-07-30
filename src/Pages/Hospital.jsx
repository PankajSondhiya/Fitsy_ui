import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "../Utils/AxiosInstance";
import Navbar from "../Componenets/Navbaar";
import { useSelector } from "react-redux";

const Hospital = () => {
  const { hospitalValue } = useSelector((state) => state.hospital);

  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#1E1E1E" }}>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center mt-3">
          <h2 style={{ color: "white" }}>Hospital Details </h2>
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
              <strong className="text-light">Name:</strong>{" "}
              <span className="text-light"> {hospitalValue.name}</span>
            </li>
            <li className="mb-2">
              <strong className="text-light">Email:</strong>
              <span className="text-light"> {hospitalValue.email}</span>
            </li>
            <li className="mb-2">
              <strong className="text-light">Description:</strong>{" "}
              <span className="text-light">{hospitalValue.description}</span>
            </li>
            <li className="mb-2">
              <strong className="text-light"> No of beds:</strong>{" "}
              <span className="text-light">{hospitalValue.noOfBeds}</span>
            </li>
            <li className="mb-2">
              <strong className="text-light">Address:</strong>{" "}
              <span className="text-light">{hospitalValue.address}</span>
            </li>
            <li className="mb-2">
              <strong className="text-light">Contact:</strong>{" "}
              <span className="text-light">{hospitalValue.contactNo}</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Hospital;

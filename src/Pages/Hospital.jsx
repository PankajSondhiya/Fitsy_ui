import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "../Utils/AxiosInstance";
import Navbar from "../Componenets/Navbaar";

const Hospital = () => {
  const [hospitalInfo, setHospitalInfo] = useState({});
  const [isHospitalLoading, setIsHospitalLoading] = useState(false);
  const { id } = useParams();

  async function fetchHospitalInfo(id) {
    setHospitalInfo(true);
    try {
      const { data } = await AxiosInstance.get(`/fitsy/api/v1/hospitals/${id}`);
      setHospitalInfo(data);
    } catch (ex) {
      console.log(ex);
    } finally {
      setIsHospitalLoading(false);
    }
  }
  console.log(hospitalInfo);

  useEffect(() => {
    fetchHospitalInfo(id);
  }, [id]);
  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#1E1E1E" }}>
        <Navbar />
        <div className="d-flex justify-content-center align-items-center mt-3">
          <h2 style={{ color: "black" }}>Hospital Details </h2>
        </div>
        <div
          className="data my-5 mx-5 p-3"
          style={{ borderBottom: "2px solid grey" }}
        >
          {isHospitalLoading ? (
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
                <strong>Name:</strong>{" "}
                <span className="text-success"> {hospitalInfo.name}</span>
              </li>
              <li className="mb-2">
                <strong>Email:</strong>
                <span className="text-success"> {hospitalInfo.email}</span>
              </li>
              <li className="mb-2">
                <strong>Description:</strong>{" "}
                <span className="text-success">{hospitalInfo.description}</span>
              </li>
              <li className="mb-2">
                <strong>No of beds:</strong>{" "}
                <span className="text-success">{hospitalInfo.noOfBeds}</span>
              </li>
              <li className="mb-2">
                <strong>Address:</strong>{" "}
                <span className="text-success">{hospitalInfo.address}</span>
              </li>
              <li className="mb-2">
                <strong>Contact:</strong>{" "}
                <span className="text-success">{hospitalInfo.contactNo}</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Hospital;

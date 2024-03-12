import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosInstance } from "../Utils/AxiosInstance";
import Navbar from "../Componenets/Navbaar";

const DoctorInfo = () => {
  const [doctorInfo, setDoctorInfo] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  async function fetchDoctorInfo(id) {
    setIsLoading(true);
    try {
      const { data } = await AxiosInstance.get(`/fitsy/api/v1/doctors/${id}`);
      setDoctorInfo(data);
    } catch (ex) {
      console.log(ex);
    } finally {
      setIsLoading(false);
    }
  }
  console.log(doctorInfo);

  useEffect(() => {
    fetchDoctorInfo(id);
  }, [id]);

  return (
    <>
      <div className="vh-100" style={{ backgroundColor: "#1E1E1E" }}>
        <Navbar />
        <div
          className="data my-5 mx-5 p-3"
          style={{ borderBottom: "2px solid grey" }}
        >
          {isLoading ? (
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
                <span className="text-success">
                  {" "}
                  {doctorInfo.user.name && doctorInfo.user.name}
                </span>
              </li>
              <li className="mb-2">
                <strong>Email:</strong>
                <span className="text-success">
                  {" "}
                  {doctorInfo.user.email && doctorInfo.user.email}
                </span>
              </li>
              <li className="mb-2">
                <strong>Description:</strong>{" "}
                <span className="text-success">
                  {doctorInfo.description && doctorInfo.description}
                </span>
              </li>
              <li className="mb-2">
                <strong>Doctor Type:</strong>{" "}
                <span className="text-success">
                  {doctorInfo.doctorType && doctorInfo.doctorType}
                </span>
              </li>
              <li className="mb-2">
                <strong>Experience:</strong>{" "}
                <span className="text-success">
                  {doctorInfo.experience && doctorInfo.experience}
                </span>
              </li>
              <li className="mb-2">
                <strong>Gender:</strong>{" "}
                <span className="text-success">
                  {doctorInfo.gender && doctorInfo.gender}
                </span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default DoctorInfo;

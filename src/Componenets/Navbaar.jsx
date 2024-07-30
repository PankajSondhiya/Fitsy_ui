import { MdHealthAndSafety } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById, setShowUserModal } from "../Slices/users";
import UserModal from "./userModal";
import "./Navbaar.css";
import { fetchDoctorById, setShowDoctorProfileModal } from "../Slices/doctor";
import DoctorProfileModal from "./DoctorPorfileModal";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { dpUrl } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function HandleLogout() {
    localStorage.clear();
    navigate("/");
  }

  useEffect(() => {
    if (localStorage.getItem("userType") === "DOCTOR") {
      dispatch(
        fetchDoctorById({ id: localStorage.getItem("_id"), dispatch: dispatch })
      );
    }
  }, [dispatch, setShowDoctorProfileModal]);

  return (
    <>
      <div
        className="navbar p-2 w-100 bg-success d-flex justify-content-spacebetween align-items-center"
        style={{ height: "60px" }}
      >
        <div className="icon d-flex align-items-center justify-content-center ">
          <MdHealthAndSafety style={{ fontSize: "40px" }} />

          <h3>Fitsy</h3>
        </div>
        {localStorage.getItem("token") && (
          <div className="d-flex justify-content-center align-items-center">
            <div className="User_image">
              <div className="avatar" style={{}}>
                {localStorage.getItem("userName").slice(0, 1).toUpperCase()}
              </div>
              <div className="drop_down">
                <div className="dropdown-content">
                  <div
                    className="text-white "
                    onClick={() => {
                      dispatch(setShowUserModal(true));
                      dispatch(
                        fetchUserById({ id: localStorage.getItem("_id") })
                      );
                    }}
                  >
                    Edit
                  </div>
                  {localStorage.getItem("userType") === "DOCTOR" && (
                    <div
                      className="text-white "
                      onClick={() => dispatch(setShowDoctorProfileModal(true))}
                    >
                      Edit profile
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="btn btn-dark" onClick={HandleLogout}>
              Logout
            </div>
          </div>
        )}
      </div>
      <UserModal />
      <DoctorProfileModal />
    </>
  );
};

export default Navbar;

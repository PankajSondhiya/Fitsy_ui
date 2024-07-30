import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setNewPassword,
  setOobCode,
  setIsPasswordVisible,
} from "../Slices/auth";
import { handlePasswordReset } from "../Services/auth";
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { useFireBase } from "../Firebase/firebaseConfig";
import Navbar from "../Componenets/Navbaar";

const PasswordResetPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { newPassword, oobCode, isPasswordVisible } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const Code = query.get("oobCode");
    if (Code) {
      dispatch(setOobCode(Code));
    }
  }, [location, dispatch]);

  const { createNewPassword } = useFireBase();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      handlePasswordReset({
        oobCode,
        newPassword,
        createNewPassword,
        navigate,
      })
    );
  };

  return (
    <div className="vh-100 bg-success d-flex justify-content-center align-items-center">
      <div className="navbar-container">
        <Navbar />
      </div>
      <div className="card p-2 d-flex justify-content-center align-items-center">
        <h3 className="mb-3">New Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="input-group flex-row mb-3 position-relative d-flex justify-content-center align-items-center">
            <input
              type={isPasswordVisible ? "text" : "password"}
              className="form-control"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => dispatch(setNewPassword(e.target.value))}
            />
            <div
              className="position-absolute d-flex justify-content-center"
              style={{ right: 5, zIndex: 10 }}
              onClick={() => dispatch(setIsPasswordVisible())}
            >
              {isPasswordVisible ? <FiEyeOff /> : <IoEyeOutline />}
            </div>
          </div>
          <button type="submit" className="btn btn-success mb-3">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetPage;

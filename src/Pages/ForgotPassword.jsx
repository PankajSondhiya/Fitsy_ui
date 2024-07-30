import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, useFireBase } from "../Firebase/firebaseConfig";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setRegisteredEmail } from "../Slices/auth";
import Navbar from "../Componenets/Navbaar";

export default function ForgotPassword() {
  const { registeredEmail } = useSelector((state) => state.auth);
  console.log(registeredEmail);
  const { resetPassword } = useFireBase();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await resetPassword(registeredEmail);
      localStorage.setItem("registeredEmail", registeredEmail);
      toast.success("Password reset email sent");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="vh-100 bg-success d-flex justify-content-center align-items-center p-1">
        <div className="navbar-container">
          <Navbar />
        </div>
        <div className="card d-flex flex-column justify-content-center align-items-center p-4">
          <h3 className="mb-3">Forgot password</h3>
          <form onSubmit={handleSubmit}>
            <div className="inputgroup mb-2">
              <input
                type="email"
                required
                value={registeredEmail}
                onChange={(e) =>
                  dispatch(setRegisteredEmail({ email: e.target.value }))
                }
                className="form-control"
                placeholder="enter your registered email address"
              />
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center p-2">
              <button type="submit" className="btn btn-success">
                send verfication link
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

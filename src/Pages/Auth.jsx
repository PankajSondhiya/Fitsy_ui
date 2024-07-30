import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline, IoHandLeft } from "react-icons/io5";
import "./Auth.css";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  setIsPasswordVisible,
  setIsSignUp,
  signUp,
  updateLoginFormValues,
  updateSignUpFormValues,
} from "../Slices/auth";
import { useFireBase } from "../Firebase/firebaseConfig";
import { useEffect } from "react";
import Navbar from "../Componenets/Navbaar";

const Auth = () => {
  const {
    signUpFormValues,
    loginFormValues,
    isSignUp,
    isPasswordVisible,
    loginData,
  } = useSelector((store) => store.auth);

  const { data, loading, isError } = loginData;
  const { firebaseLogin, firebaseSignup } = useFireBase();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (localStorage.getItem("token")) {
    switch (localStorage.getItem("userType")) {
      case "PATIENT":
        navigate("/patient/");
        break;
      case "DOCTOR":
        navigate("/doctor/");
        break;
      case "ADMIN":
        navigate("/admin");
        break;
      default:
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignUp) {
      dispatch(
        signUp({
          Data: signUpFormValues,
          navigate: navigate,
          firebaseSignup,
          dispatch: dispatch,
        })
      );
    } else {
      dispatch(
        login({
          Data: loginFormValues,
          dispatch: dispatch,
          firebaseLogin,
        })
      );
    }
  };

  return (
    <>
      <div className="login bg-success mx-auto vh-100 d-flex  justify-content-center align-items-center">
        <div className="navbar-container">
          <Navbar />
        </div>

        <div className="card  p-2">
          <div className={`auth-form ${isSignUp ? "signUp" : "Login"}`}>
            <div className="col flex-column d-flex justify-content-center align-items-center">
              <div className="title mb-2">
                {" "}
                <h3>{isSignUp ? "Sign up" : "Login"}</h3>
              </div>
              <form onSubmit={handleSubmit}>
                {!isSignUp ? (
                  <>
                    <div className="inputgroup mb-2">
                      <input
                        type="text"
                        name="email"
                        className="form-control"
                        placeholder="enter your email address"
                        required
                        value={loginFormValues.email}
                        onChange={(event) =>
                          dispatch(
                            updateLoginFormValues({
                              field: "email",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </div>
                    <div className="inputgroup  d-flex flex-row position-relative justify-content-center align-items-center">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        className="form-control"
                        placeholder="enter your password"
                        autoComplete="of"
                        required
                        value={loginFormValues.password}
                        onChange={(event) =>
                          dispatch(
                            updateLoginFormValues({
                              field: "password",
                              value: event.target.value,
                            })
                          )
                        }
                      />

                      <div
                        className="position-absolute right-"
                        style={{ right: 5 }}
                        onClick={() => dispatch(setIsPasswordVisible())}
                      >
                        {isPasswordVisible ? <FiEyeOff /> : <IoEyeOutline />}
                      </div>
                    </div>
                    <div
                      className="forgot-password mb-2"
                      onClick={() => navigate("/forgotpassword")}
                    >
                      Forgot password?
                    </div>
                  </>
                ) : (
                  <div>
                    <div className="inputgroup mb-2">
                      <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="enter your username"
                        required
                        value={signUpFormValues.name}
                        onChange={(event) =>
                          dispatch(
                            updateSignUpFormValues({
                              field: "name",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </div>
                    <div className="inputgroup mb-2">
                      <input
                        type="text"
                        name="userId"
                        className="form-control"
                        placeholder="enter your userId"
                        required
                        value={signUpFormValues.userId}
                        onChange={(event) =>
                          dispatch(
                            updateSignUpFormValues({
                              field: "userId",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </div>
                    <div className="inputgroup mb-2 d-flex flex-row position-relative justify-content-center align-items-center">
                      <input
                        type={isPasswordVisible ? "text" : "password"}
                        name="password"
                        className="form-control"
                        placeholder="enter your password"
                        required
                        value={signUpFormValues.password}
                        onChange={(event) =>
                          dispatch(
                            updateSignUpFormValues({
                              field: "password",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                      <div
                        className="position-absolute right-"
                        style={{ right: 5 }}
                        onClick={() => dispatch(setIsPasswordVisible())}
                      >
                        {isPasswordVisible ? <FiEyeOff /> : <IoEyeOutline />}
                      </div>
                    </div>
                    <div className="inputgroup mb-2">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="enter your email"
                        required
                        value={signUpFormValues.email}
                        onChange={(event) =>
                          dispatch(
                            updateSignUpFormValues({
                              field: "email",
                              value: event.target.value,
                            })
                          )
                        }
                      />
                    </div>
                    <div className="inputgroup mb-2">
                      <select
                        className="form-select"
                        name="userType"
                        value={signUpFormValues.userType}
                        onChange={(event) =>
                          dispatch(
                            updateSignUpFormValues({
                              field: "userType",
                              value: event.target.value,
                            })
                          )
                        }
                      >
                        <option value="PATIENT">PATIENT</option>
                        <option value="DOCTOR">DOCTOR</option>
                        <option value="ADMIN">ADMIN</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="d-flex justify-content-center align-items-center">
                  <button
                    type="submit"
                    className="btn btn-outline-success mb-2"
                  >
                    {isSignUp ? "Sign up" : loading ? "logging in..." : "Login"}
                  </button>
                </div>
              </form>

              <div className="toggle" onClick={() => dispatch(setIsSignUp())}>
                {isSignUp ? (
                  <>
                    Already have an account?{" "}
                    <strong className="login-text">login</strong>
                  </>
                ) : (
                  <>
                    Don't have an account?{" "}
                    <strong className="login-text">Signup</strong>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

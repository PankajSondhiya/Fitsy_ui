import { MdHealthAndSafety } from "react-icons/md";
import "bootstrap/dist/css/bootstrap.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { signIn, signUp } from "../API/auth";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isErrormessage, setIsErrorMessage] = useState("");
  const [isDataLoading, setIsDataLoading] = useState(false);
  const navigate = useNavigate();

  const initialSignUpFormValues = {
    name: "",
    userId: "",
    password: "",
    email: "",
    userType: "PATIENT",
  };
  const [signUpFormValues, setSignUpFormValues] = useState(
    initialSignUpFormValues
  );

  const initialLoginFormValues = {
    userId: "",
    password: "",
  };
  const [loginFormValues, setLoginFormValues] = useState(
    initialLoginFormValues
  );
  const handleLoginFormChange = (event) => {
    setLoginFormValues({
      ...loginFormValues,
      [event.target.name]: event.target.value,
    });
  };
  const handleSignUpFormChange = (event) => {
    setSignUpFormValues({
      ...signUpFormValues,
      [event.target.name]: event.target.value,
    });
  };

  async function handleLogin(event) {
    setIsDataLoading(true);
    event.preventDefault();

    try {
      const data = await signIn(
        loginFormValues.userId,
        loginFormValues.password
      );
      switch (data.userType) {
        case "PATIENT":
          navigate("/patient");
          break;
        case "ADMIN":
          navigate("/admin");
          break;
        case "DOCTOR":
          navigate("/doctor");
          break;
        default:
      }
    } catch (ex) {
      toast.error(ex.response.data.message);
    } finally {
      setIsDataLoading(false);
    }
  }
  async function handleSignUp(event) {
    event.preventDefault();
    try {
      await signUp(
        signUpFormValues.userId,
        signUpFormValues.password,
        signUpFormValues.email,
        signUpFormValues.name,
        signUpFormValues.userType
      );
      toast.success("Sign-up successful please login to continue");
      setIsSignUp(false);
    } catch (ex) {
      toast.error(ex.response.data.message);
    }
  }

  return (
    <>
      <div className="login bg-success mx-auto vh-100 d-flex  justify-content-center align-items-center">
        <div
          className=""
          style={{
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        >
          <div className="d-flex justify-content-center align-items-center">
            <MdHealthAndSafety style={{ fontSize: "50px" }} /> <h1>Fitsy</h1>
          </div>
        </div>
        <div className="card  p-2 ">
          <div className="row m-2">
            <div className="col flex-column d-flex justify-content-center align-items-center">
              <div className="title mb-2">
                {" "}
                <h3>{isSignUp ? "Sign up" : "Login"}</h3>
              </div>
              {!isSignUp ? (
                <div>
                  <div className="inputgroup mb-2">
                    <input
                      type="text"
                      name="userId"
                      className="form-control"
                      placeholder="enter your userId"
                      required
                      value={loginFormValues.userId}
                      onChange={handleLoginFormChange}
                    />
                  </div>
                  <div className="inputgroup mb-2">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="enter your password"
                      required
                      value={loginFormValues.password}
                      onChange={handleLoginFormChange}
                    />
                  </div>
                </div>
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
                      onChange={handleSignUpFormChange}
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
                      onChange={handleSignUpFormChange}
                    />
                  </div>
                  <div className="inputgroup mb-2">
                    <input
                      type="password"
                      name="password"
                      className="form-control"
                      placeholder="enter your password"
                      required
                      value={signUpFormValues.password}
                      onChange={handleSignUpFormChange}
                    />
                  </div>
                  <div className="inputgroup mb-2">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="enter your email"
                      required
                      value={signUpFormValues.email}
                      onChange={handleSignUpFormChange}
                    />
                  </div>
                  <div className="inputgroup mb-2">
                    <select
                      className="form-select"
                      name="userType"
                      value={signUpFormValues.userType}
                      onChange={handleSignUpFormChange}
                    >
                      <option value="PATIENT">PATIENT</option>
                      <option value="DOCTOR">DOCTOR</option>
                      <option value="HOSPITAL">HOSPITAL</option>
                    </select>
                  </div>
                </div>
              )}
              <div
                className="btn btn-outline-success mb-2"
                onClick={isSignUp ? handleSignUp : handleLogin}
              >
                {isSignUp
                  ? "Sign up"
                  : isDataLoading
                  ? "logging in..."
                  : "Login"}
              </div>
              <div className="toggle" onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp
                  ? "Already have an account?login"
                  : "Dont have an account? Sign up"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;

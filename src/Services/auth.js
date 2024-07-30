import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { NavbarOffcanvas } from "react-bootstrap";
import { updateLoginFormValues } from "../Slices/auth";
import { useFireBase } from "../Firebase/firebaseConfig";

export const loginService = async ({ Data, dispatch, firebaseLogin }) => {
  const { email, password } = Data;
  try {
    const { data } = await AxiosInstance.post(
      "/fitsy/api/v1/auth/signin",
      Data
    );
    await firebaseLogin(email, password);

    toast.success("Welcome to the app!");
    localStorage.setItem("userId", data.userId);
    localStorage.setItem("userType", data.userType);
    localStorage.setItem("token", data.accessToken);
    localStorage.setItem("userName", data.userName);
    localStorage.setItem("_id", data.user_id);

    dispatch(updateLoginFormValues({ field: "email", value: "" }));
    dispatch(updateLoginFormValues({ field: "password", value: "" }));

    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "An error occurred";
    toast.error(errorMessage);
  }
};

export const signUpService = async ({ Data, navigate, firebaseSignup }) => {
  try {
    await AxiosInstance.post("/fitsy/api/v1/auth/signup", Data);

    toast.success("login to continue");
    window.location.reload();
  } catch (error) {
    toast.error(error.message);
  }
};

export const handlePasswordReset =
  ({ oobCode, newPassword, createNewPassword, navigate }) =>
  async (getState, dispatch) => {
    if (oobCode && newPassword) {
      try {
        await createNewPassword(oobCode, newPassword);
        await AxiosInstance.put(`/fitsy/api/v1/auth/resetpassword`, {
          email: localStorage.getItem("registeredEmail"),
          newPassword,
        });
        toast.success(
          "Password has been successfully reset. Login to continue"
        );
        dispatch(navigate("/"));
      } catch (error) {
        console.error("Error resetting password:", error.message);
        toast.error("Failed to reset password");
      }
    }
  };

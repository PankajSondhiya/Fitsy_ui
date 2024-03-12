import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";

export const signIn = async function (userId, password) {
  const { data } = await AxiosInstance.post("/fitsy/api/v1/auth/signin", {
    userId: userId,
    password: password,
  });
  toast.success("Welcome to the app!");
  localStorage.setItem("userId", data.userId);
  localStorage.setItem("userType", data.userType);
  localStorage.setItem("token", data.accessToken);
  localStorage.setItem("userName", data.userName);
  localStorage.setItem("_id", data.user_id);

  return data;
};

export const signUp = async function (userId, password, email, name, userType) {
  await AxiosInstance.post("/fitsy/api/v1/auth/signup", {
    name: name,
    userId: userId,
    password: password,
    email: email,
    userType: userType,
  });
};

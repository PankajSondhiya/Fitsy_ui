import axios, { Axios } from "axios";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { fetchAppointment, setAppoinmentData } from "../Slices/appointment";
import { toast } from "react-toastify";

export const getAppoinment = async () => {
  try {
    const { data } = await AxiosInstance.get("/fitsy/api/v1/appointment");
    data.length === 0
      ? toast.warning("No appoinment found")
      : toast.success("appoinment fetched successfully");
    return data;
  } catch (error) {
    toast.error(error);
  }
};

export const appointment = async ({ Data, dispatch }) => {
  const { data } = await AxiosInstance.post("/fitsy/api/v1/appointment", Data);
  dispatch(
    setAppoinmentData({
      userId: localStorage.getItem("_id"),
      age: "",
      doctor: "",
      date: "",
      hospital: "",
      disease: "",
    })
  );
  toast.success("appoinment created successfully");
  dispatch(fetchAppointment());
  return data;
};

export const getAppointmentById = async ({ id, dispatch }) => {
  const { data } = await AxiosInstance.get(`/fitsy/api/v1/appointment/${id}`);
  console.log("ID", data);
  dispatch(setAppoinmentData(data));
  return data;
};

export const updateAppoinment = async ({ id, data, dispatch }) => {
  const response = await AxiosInstance.put(
    `/fitsy/api/v1/appointment/${id}`,
    data
  );
  console.log(response.data);
  return response.data;
};

export const deleteAppointmentById = async ({ id }) => {
  console.log(id);
  await AxiosInstance.delete(`/fitsy/api/v1/appointment/${id}`);
  toast.success("appoinment delete successfully");
  return id;
};

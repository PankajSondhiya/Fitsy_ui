import axios from "axios";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { toast } from "react-toastify";
import {
  fetchHositals,
  setHospitalValue,
  setShowCreateHospitalModal,
} from "../Slices/hospital";

export const getAllHospital = async () => {
  try {
    const { data } = await AxiosInstance.get("/fitsy/api/v1/hospitals");

    // toast.success("Hospital fetched successfully");
    return data;
  } catch (error) {
    toast.error("error fetched successfully");
  }
};
export const editHospitalById = async ({ id, Data, dispatch }) => {
  try {
    const { data } = await AxiosInstance.put(
      `/fitsy/api/v1/hospitals/${id}`,
      Data
    );

    return data;
  } catch (error) {
    toast.error("error ocurred!");
  }
};
export const getHospitalById = async ({ id }) => {
  try {
    const { data } = await AxiosInstance.get(`/fitsy/api/v1/hospitals/${id}`);

    return data;
  } catch (error) {
    toast.error("error occured!");
  }
};
export const createHospital = async ({ Data, dispatch }) => {
  try {
    const { data } = await AxiosInstance.post("/fitsy/api/v1/hospitals", Data);
    toast.success("Hospital created successfully");

    return data;
  } catch (error) {
    toast.error(" error ocurred! refresh the page or try again");
  }
};

export const deleteHospitalById = async ({ id, dispatch }) => {
  try {
    await AxiosInstance.delete(`/fitsy/api/v1/hospitals/${id}`);
    toast.success("Hospital deleted");
    return id;
  } catch (error) {
    toast.error(error);
  }
};

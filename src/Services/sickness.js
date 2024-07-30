import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";
import {
  setShowSicknessModal,
  setSicknessInfo,
  updateSicknessInfo,
} from "../Slices/sickness";

export const getSicknesses = async () => {
  try {
    const { data } = await AxiosInstance.get(`/fitsy/api/v1/sicknesses`);
    data.length === 0
      ? toast.warning("on sicknesses found")
      : toast.success("Sickness fetched successfully");

    return data;
  } catch (error) {
    toast.error("error occured");
  }
};

export const newSickness = async ({ Data, dispatch }) => {
  try {
    const { data } = await AxiosInstance.post("/fitsy/api/v1/sicknesses", Data);
    toast.success("sickness created successfully");
    dispatch(setShowSicknessModal(false));
    return data;
  } catch (error) {
    toast.error("error occured");
  }
};

export const deleteSicknessById = async ({ id }) => {
  try {
    await AxiosInstance.delete(`/fitsy/api/v1/sicknesses/${id}`);
    toast.success("sickness deleted successfully");
    return id;
  } catch (error) {
    toast.error("error occured try again after some time ");
  }
};

export const updateSicknessById = async ({ id, Data, dispatch }) => {
  try {
    const { data } = await AxiosInstance.put(
      `/fitsy/api/v1/sicknesses/${id}`,
      Data
    );
    dispatch(setShowSicknessModal(false));
    return data;
  } catch (error) {
    toast.error("error occured");
  }
};

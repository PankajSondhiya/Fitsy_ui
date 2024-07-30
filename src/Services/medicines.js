import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";

export const getAllMedicines = async () => {
  try {
    const { data } = await AxiosInstance.get("/fitsy/api/v1/medicines");
    return data;
  } catch (error) {
    toast.error("error occured");
  }
};

export const addMedicines = async (id, getState) => {
  const { prescriptionInfo } = getState().prescription;
};

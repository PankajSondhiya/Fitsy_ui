import { toast } from "react-toastify";
import {
  setPrescriptionInfo,
  updatePrescriptionInfo,
} from "../Slices/priscription";
import { AxiosInstance } from "../Utils/AxiosInstance";
import { setAccordianActiveKey, updateSicknessInfo } from "../Slices/sickness";
import { AxiosError } from "axios";

export const getPrescription = async () => {
  const { data } = await AxiosInstance.get("/fitsy/api/v1/prescriptions");
  return data;
};

export const addmedicinesToPrescription = (id) => (dispatch, getState) => {
  const { prescriptionInfo } = getState().prescription;
  const updatedMedicnes = [...prescriptionInfo.medicines, id];
  dispatch(
    updatePrescriptionInfo({ field: "medicines", value: updatedMedicnes })
  );
};

export const removeMedicinestoPrescription = (id) => (dispatch, getState) => {
  const { prescriptionInfo } = getState().prescription;
  const updatedMedicnes = prescriptionInfo.medicines.filter(
    (medicine) => medicine !== id
  );
  dispatch(
    updatePrescriptionInfo({ field: "medicines", value: updatedMedicnes })
  );
};

export const addTest = (test) => (dispatch, getState) => {
  const { prescriptionInfo } = getState().prescription;
  const updatedTests = [...prescriptionInfo.tests, test];
  dispatch(updatePrescriptionInfo({ field: "tests", value: updatedTests }));
};

export const removeTest = (test) => (dispatch, getState) => {
  const { prescriptionInfo } = getState().prescription;
  const updatedTests = prescriptionInfo.tests.filter((t) => t !== test);
  dispatch(updatePrescriptionInfo({ field: "tests", value: updatedTests }));
};

export const newPrescription = async ({ Data, dispatch }) => {
  console.log(dispatch);
  try {
    const { data } = await AxiosInstance.post(
      "/fitsy/api/v1/prescriptions",
      Data
    );
    dispatch(updateSicknessInfo({ field: "prescription", value: data?._id }));
    dispatch(setAccordianActiveKey("0"));

    return data;
  } catch (error) {
    toast.error("error occured");
  }
};

export const updatePrecriptionById = async ({ id, Data, dispatch }) => {
  try {
    const { data } = await AxiosInstance.put(
      `/fitsy/api/v1/prescriptions/${id}`,
      Data
    );
    dispatch(setAccordianActiveKey("0"));
    return data;
  } catch (error) {
    toast.error(error);
  }
};

export const getPrescriptionById = async ({ id }) => {
  console.log(id);
  try {
    const { data } = await AxiosInstance.get(
      `/fitsy/api/v1/prescriptions/${id}`
    );
    return data;
  } catch (error) {
    toast.error(error);
  }
};

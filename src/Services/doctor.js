import { toast } from "react-toastify";
import { AxiosInstance } from "../Utils/AxiosInstance";
import {
  setdoctorDetail,
  setDoctorInfo,
  setIsEditMode,
  setShowDoctorProfileModal,
  updateDoctorInfo,
} from "../Slices/doctor";
import { useSelector } from "react-redux";

export async function getAllDoctor() {
  const { data } = await AxiosInstance.get("/fitsy/api/v1/doctors");
  return data;
}

export async function createDoctor({ Data, dispatch }) {
  try {
    const { data } = await AxiosInstance.post("/fitsy/api/v1/doctors", Data);
    dispatch(setShowDoctorProfileModal(false));
    dispatch(
      setDoctorInfo({
        user: localStorage.getItem("_id"),
        description: "",
        experience: "",
        doctorType: "",
        gender: "",
        hospitals: [],
      })
    );
    return data;
  } catch (error) {
    toast.error("Profile created successfully");
  }
}

export async function updatedDoctorById({ id, Data, dispatch }) {
  console.log(id);
  try {
    const { data } = await AxiosInstance.put(
      `/fitsy/api/v1/doctors/${id}`,
      Data
    );
    toast.success("Profile updated successfully");
    dispatch(setShowDoctorProfileModal(false));
    return data;
  } catch (error) {
    toast.error("error occured try again later ");
  }
}

export const getDoctorById = async ({ id, dispatch }) => {
  try {
    const { data } = await AxiosInstance.get(`/fitsy/api/v1/doctors/${id}`);
    dispatch(setIsEditMode(true));
    dispatch(
      setDoctorInfo({
        _id: data._id,
        user: localStorage.getItem("_id"),
        description: data.description,
        experience: data.experience,
        doctorType: data.doctorType,
        gender: data.gender,
        hospitals: data.hospital.map((hospital) => hospital._id),
      })
    );
    dispatch(setdoctorDetail(data));

    return data;
  } catch (error) {
    // toast.error(`Doctor with ${id} does'nt exist`);
  }
};

export const addHospitalToDoctor = (hospitalId) => (dispatch, getState) => {
  const { doctorInfo } = getState().doctor;
  const updatedHospitals = [...doctorInfo.hospitals, hospitalId];

  dispatch(updateDoctorInfo({ field: "hospitals", value: updatedHospitals }));
};

export const removeHospitalFromDoctor =
  (hospitalId) => (dispatch, getState) => {
    const { doctorInfo } = getState().doctor;
    const updatedHospitals = doctorInfo.hospitals.filter(
      (id) => id !== hospitalId
    );

    dispatch(updateDoctorInfo({ field: "hospitals", value: updatedHospitals }));
  };

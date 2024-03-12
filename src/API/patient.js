import { AxiosInstance } from "../Utils/AxiosInstance";

export const GetAppointment = async function (id) {
  const { data } = await AxiosInstance.get(`/fitsy/api/v1/appointment/${id}`);
  return data;
};

export const DeleteAppointment = async function (id) {
  await AxiosInstance.delete(`/fitsy/api/v1/appointment/${id}`);
};

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  appointment,
  deleteAppointmentById,
  getAppoinment,
  getAppointmentById,
  updateAppoinment,
} from "../Services/appoinment";
import { isEditable } from "@testing-library/user-event/dist/utils";

export const fetchAppointment = createAsyncThunk(
  "fetchAppoinment",
  getAppoinment
);
export const createAppoinment = createAsyncThunk(
  "createAppoinment",
  appointment
);
export const fetchAppoinmentById = createAsyncThunk(
  "getAppoinmentById",
  getAppointmentById
);
export const updateAppointment = createAsyncThunk(
  "updateappointment",
  updateAppoinment
);
export const deleteAppointment = createAsyncThunk(
  "deleteAppionment",
  deleteAppointmentById
);
const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appoinmentData: {
      userId: localStorage.getItem("_id"),
      age: "",
      doctor: "",
      date: "",
      hospital: "",
      disease: "",
    },
    appointmentById: {
      isError: false,
      isLoading: false,
      appointmentByIdData: {},
    },
    showAppointmenModal: false,
    appoinmentList: {
      isError: false,
      isLoading: true,
      data: [],
    },
    selectedDoctor: "",
    isEditMode: false,
    searchText: "",
  },

  reducers: {
    setAppoinmentData(state, action) {
      state.appoinmentData = action.payload;
    },
    setShowAppoinmentModal(state, action) {
      state.showAppointmenModal = !state.showAppointmenModal;
    },
    updateAppoinmentvalue(state, { payload }) {
      const key = payload.field;
      const value = payload.value;
      state.appoinmentData[key] = value;
    },
    setSelectedDoctor(state, action) {
      state.selectedDoctor = action.payload;
    },
    setIsEditMode(state, action) {
      state.isEditMode = action.payload;
    },
    setSearchText(state, action) {
      state.searchText = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAppointment.pending, (state, action) => {
      state.appoinmentList.isError = false;
      state.appoinmentList.isLoading = true;
    });
    builder.addCase(fetchAppointment.fulfilled, (state, action) => {
      state.appoinmentList.isError = false;
      state.appoinmentList.isLoading = false;
      state.appoinmentList.data = action.payload;
    });
    builder.addCase(fetchAppointment.rejected, (state, action) => {
      state.appoinmentList.isError = true;
      state.appoinmentList.isLoading = false;
      state.appoinmentList.data = [];
    });

    builder.addCase(fetchAppoinmentById.pending, (state, action) => {
      state.appointmentById.isError = false;
      state.appointmentById.isLoading = true;
    });
    builder.addCase(fetchAppoinmentById.fulfilled, (state, action) => {
      state.appointmentById.isError = false;
      state.appointmentById.isLoading = false;
      state.appointmentById.appointmentByIdData = action.payload;
    });
    builder.addCase(fetchAppoinmentById.rejected, (state, action) => {
      state.appointmentById.isError = true;
      state.appointmentById.isLoading = false;
    });
    builder.addCase(deleteAppointment.fulfilled, (state, action) => {
      const ID = action.payload;
      state.appoinmentList.data = state.appoinmentList.data.filter(
        (appointment) => appointment._id !== ID
      );
    });

    builder.addCase(updateAppointment.fulfilled, (state, action) => {
      const updatedAppoinment = action.payload.appointment;

      state.appoinmentList.data = state.appoinmentList.data.map((appointment) =>
        appointment._id === updatedAppoinment._id
          ? updatedAppoinment
          : appointment
      );
    });
  },
});

export const {
  setShowAppoinmentModal,
  updateAppoinmentvalue,
  setSelectedDoctor,
  setIsEditMode,
  setAppoinmentData,
  setSearchText,
} = appointmentSlice.actions;
export default appointmentSlice.reducer;

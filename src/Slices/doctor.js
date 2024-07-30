import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllDoctor,
  createDoctor,
  updatedDoctorById,
  getDoctorById,
} from "../Services/doctor";
import { Fullscreen } from "react-bootstrap-icons";
import { TbGlassFullFilled } from "react-icons/tb";

export const fetchDoctor = createAsyncThunk("fetchDoctor", getAllDoctor);
export const createNewDoctor = createAsyncThunk(
  "createDoctorModal",
  createDoctor
);
export const updatedDoctorProfile = createAsyncThunk(
  "updatedDoctor",
  updatedDoctorById
);

export const fetchDoctorById = createAsyncThunk(
  "fetchDoctorById",
  getDoctorById
);
const doctorSlice = createSlice({
  name: "doctor",
  initialState: {
    doctorData: {
      doctorList: [],
      isDoctorListError: false,
      isDoctorListLoading: true,
    },
    doctorDetail: {},

    doctorInfo: {
      user: localStorage.getItem("_id"),
      description: "",
      experience: "",
      doctorType: "",
      gender: "",
      hospitals: [],
    },
    showDoctorProfileModal: false,
    isEditMode: false,
  },
  reducers: {
    updatedDoctorInfo(state, action) {
      const key = action.payload.field;
      const value = action.payload.value;
      state.doctorInfo[key] = value;
    },

    setShowDoctorProfileModal(state, action) {
      state.showDoctorProfileModal = action.payload;
    },
    updateDoctorInfo(state, action) {
      const key = action.payload.field;
      const value = action.payload.value;

      state.doctorInfo[key] = value;
    },
    setDoctorInfo(state, action) {
      state.doctorInfo = action.payload;
    },
    setIsEditMode(state, action) {
      state.isEditMode = action.payload;
    },
    setdoctorDetail(state, action) {
      state.doctorDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDoctor.pending, (state, action) => {
      state.doctorData.isDoctorListError = false;
      state.doctorData.isDoctorListLoading = true;
    });
    builder.addCase(fetchDoctor.fulfilled, (state, action) => {
      state.doctorData.isDoctorListError = false;
      state.doctorData.isDoctorListLoading = false;
      state.doctorData.doctorList = action.payload;
    });
    builder.addCase(fetchDoctor.rejected, (state, action) => {
      state.doctorData.isDoctorListError = true;
      state.doctorData.isDoctorListLoading = false;
      state.doctorData.doctorList = [];
    });
    builder.addCase(createNewDoctor.fulfilled, (state, action) => {
      state.doctorInfo = action.payload;
    });
  },
});

export const {
  setShowDoctorProfileModal,
  updateDoctorInfo,
  setDoctorInfo,
  setIsEditMode,
  setdoctorDetail,
} = doctorSlice.actions;
export default doctorSlice.reducer;

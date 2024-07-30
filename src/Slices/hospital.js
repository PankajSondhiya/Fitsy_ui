import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createHospital,
  deleteHospitalById,
  editHospitalById,
  getAllHospital,
  getHospitalById,
} from "../Services/hospital";

export const fetchHositals = createAsyncThunk("fetchDoctor", getAllHospital);

export const createNewHospital = createAsyncThunk(
  "createHospital",
  createHospital
);
export const editHospital = createAsyncThunk(
  "updateappointmen",
  editHospitalById
);
export const hospitalById = createAsyncThunk("hospitalByid", getHospitalById);
export const deleteHospital = createAsyncThunk(
  "deleteHospital",
  deleteHospitalById
);
const hospitalSlice = createSlice({
  name: "hospital",
  initialState: {
    hospitalData: {
      hospitalList: [],
      isHospitalError: false,
      isHospitalLoading: true,
    },
    hospitalValue: {
      name: "",
      email: "",
      noOfBeds: "",
      address: "",
      contactNo: "",
      description: "",
    },
    isHospitalEdit: false,
    showCreateHospitalModal: false,
  },
  reducers: {
    setShowCreateHospitalModal(state, action) {
      state.showCreateHospitalModal = action.payload;
    },
    updateHospitalValue(state, action) {
      const key = action.payload.field;
      const value = action.payload.value;
      state.hospitalValue[key] = value;
    },
    setHospitalValue(state, action) {
      state.hospitalValue = action.payload;
    },
    setIsHospitalEdit(state, action) {
      state.isHospitalEdit = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchHositals.pending, (state, action) => {
      state.hospitalData.isHospitalError = false;
      state.hospitalData.isHospitalLoading = true;
    });
    builder.addCase(fetchHositals.fulfilled, (state, action) => {
      state.hospitalData.isHospitalLoading = false;
      state.hospitalData.isHospitalError = false;
      state.hospitalData.hospitalList = action.payload;
    });
    builder.addCase(fetchHositals.rejected, (state, action) => {
      state.hospitalData.isHospitalLoading = false;
      state.hospitalData.isHospitalError = true;
    });
    builder.addCase(hospitalById.fulfilled, (state, action) => {
      state.hospitalValue = action.payload;
    });
    builder.addCase(deleteHospital.fulfilled, (state, action) => {
      const hospitalId = action.payload;
      console.log(hospitalId);
      console.log(state.hospitalData.hospitalList);
      state.hospitalData.hospitalList = state.hospitalData.hospitalList.filter(
        (hospital) => hospital._id !== hospitalId
      );
      console.log(state.hospitalData.hospitalList);
    });
    builder.addCase(createNewHospital.fulfilled, (state, action) => {
      state.hospitalData.hospitalList = [
        ...state.hospitalData.hospitalList,
        action.payload,
      ];

      state.showCreateHospitalModal = false;
      state.hospitalValue = {
        name: "",
        email: "",
        noOfBeds: "",
        address: "",
        contactNo: "",
        description: "",
      };
    });
    builder.addCase(editHospital.fulfilled, (state, action) => {
      const updatedHospital = action.payload.UpdatedHospital;
      console.log(updatedHospital);
      state.hospitalData.hospitalList = state.hospitalData.hospitalList.map(
        (hospital) =>
          hospital._id === updatedHospital._id ? updatedHospital : hospital
      );
      console.log("Updated Hospital List:", state.hospitalData.hospitalList);
      state.showCreateHospitalModal = false;
      state.hospitalValue = {
        name: "",
        email: "",
        noOfBeds: "",
        address: "",
        contactNo: "",
        description: "",
      };
    });
  },
});

export const {
  setShowCreateHospitalModal,
  setHospitalValue,
  updateHospitalValue,
  setIsHospitalEdit,
} = hospitalSlice.actions;
export default hospitalSlice.reducer;

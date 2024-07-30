import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getPrescription,
  getPrescriptionById,
  newPrescription,
  updatePrecriptionById,
} from "../Services/prescription";

const fetchPrescription = createAsyncThunk(
  "fetchPrescription",
  getPrescription
);

export const createPrescription = createAsyncThunk(
  "createPrescription",
  newPrescription
);

export const updatePrescription = createAsyncThunk(
  "prescriptionToEdit",
  updatePrecriptionById
);
export const prescriptionById = createAsyncThunk(
  "prescriptionById",
  getPrescriptionById
);

const prescriptionSlice = createSlice({
  name: "prescription",
  initialState: {
    prescriptionInfo: {
      medicines: [],
      doctorFee: "",
      medicinesFee: "",
      tests: [],
      duration: "",
    },
    prescriptionData: {
      prescriptionList: [],
      isError: false,
      isLoading: false,
    },
    isPrescriptionEdit: false,
  },
  reducers: {
    updatePrescriptionInfo(state, action) {
      const key = action.payload.field;
      const value = action.payload.value;

      state.prescriptionInfo[key] = value;
    },
    setIsPrescriptionEdit(state, action) {
      state.isSicknessEdit = action.payload;
    },
    setPrescriptionInfo(state, action) {
      state.prescriptionInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPrescription.pending, (state, action) => {
      state.prescriptionData.isLoading = true;
      state.prescriptionData.isError = false;
    });
    builder.addCase(fetchPrescription.fulfilled, (state, action) => {
      state.prescriptionData.isError = false;
      state.prescriptionData.isLoading = false;
      state.prescriptionData.prescriptionList = action.payload;
    });
    builder.addCase(fetchPrescription.rejected, (state, action) => {
      state.prescriptionData.isLoading = false;
      state.prescriptionData.isError = true;
    });

    builder.addCase(updatePrescription.fulfilled, (state, action) => {
      const updatedPrescription = action.payload.updatedPrescription;
      state.prescriptionData.prescriptionList.map((prescription) =>
        prescription._id === updatedPrescription._id
          ? updatedPrescription
          : prescription
      );
    });
    builder.addCase(prescriptionById.fulfilled, (state, action) => {
      state.prescriptionInfo = action.payload;
    });
  },
});

export const {
  updatePrescriptionInfo,
  setIsPrescriptionEdit,
  setPrescriptionInfo,
} = prescriptionSlice.actions;

export default prescriptionSlice.reducer;

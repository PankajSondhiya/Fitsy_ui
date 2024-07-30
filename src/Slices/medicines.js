import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllMedicines } from "../Services/medicines";

export const fetchMedicines = createAsyncThunk(
  "fetchMedicines",
  getAllMedicines
);

const mediciedSlice = createSlice({
  name: "medicines",
  initialState: {
    medicineInfo: {
      name: "",
      bestBefore: "",
      manufacturer: "",
      manufacturerAddress: "",
      price: "",
      dosage: "",
    },
    medicinesData: {
      medicinesList: [],
      isLoading: false,
      isError: false,
    },
  },

  reducers: {
    updateMedicinesInfo(state, action) {
      const key = action.payload.field;
      const value = action.payload.value;

      state.medicineInfo[key] = value;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMedicines.pending, (state, action) => {
      state.medicinesData.isError = false;
      state.medicinesData.isLoading = true;
    });

    builder.addCase(fetchMedicines.fulfilled, (state, action) => {
      state.medicinesData.medicinesList = action.payload;
      state.medicinesData.isError = false;
      state.medicinesData.isLoading = false;
    });
    builder.addCase(fetchMedicines.rejected, (state, action) => {
      state.medicinesData.isError = true;
      state.medicinesData.isLoading = false;
    });
  },
});
export const { updateMedicinesInfo } = mediciedSlice.actions;
export default mediciedSlice.reducer;

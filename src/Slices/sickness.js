import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MdDisabledByDefault } from "react-icons/md";
import {
  deleteSicknessById,
  getSicknessById,
  getSicknesses,
  newSickness,
  updateSicknessById,
} from "../Services/sickness";

export const fetchSickness = createAsyncThunk("fetchSickness", getSicknesses);
export const createSickness = createAsyncThunk("createSickness", newSickness);
export const deleteSickness = createAsyncThunk(
  "deleteSickness",
  deleteSicknessById
);

export const updateSickness = createAsyncThunk(
  "updateSickness",
  updateSicknessById
);
const sicknessSlice = createSlice({
  name: "sickness",

  initialState: {
    sicknessInfo: {
      diagnosis: "",
      patient: "",
      prescription: "",
      hospital: "",
    },
    tableToggle: false,
    showSicknessModal: false,
    isSicknessEdit: false,
    sicknessList: {
      data: [],
      isError: false,
      isLoading: true,
    },
    accordionActiveKey: "0",
  },
  reducers: {
    setShowSicknessModal(state, action) {
      state.showSicknessModal = !state.showSicknessModal;
    },
    setTableToggle(state, action) {
      state.tableToggle = !state.tableToggle;
    },
    setAccordianActiveKey(state, action) {
      state.accordionActiveKey = action.payload;
    },
    updateSicknessInfo(state, action) {
      const key = action.payload.field;
      const value = action.payload.value;

      state.sicknessInfo[key] = value;
    },
    setIsSicknessEdit(state, action) {
      state.isSicknessEdit = action.payload;
    },
    setSicknessInfo(state, action) {
      state.sicknessInfo = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSickness.pending, (state, action) => {
      state.sicknessList.isError = false;
      state.sicknessList.isLoading = true;
    });
    builder.addCase(fetchSickness.fulfilled, (state, action) => {
      state.sicknessList.isError = false;
      state.sicknessList.data = action.payload;
      state.sicknessList.isLoading = false;
    });
    builder.addCase(fetchSickness.rejected, (state, action) => {
      state.sicknessList.isError = true;
      state.sicknessList.isLoading = false;
    });
    builder.addCase(deleteSickness.fulfilled, (state, action) => {
      const sicknessToBeDeleted = action.payload;
      state.sicknessList.data.filter(
        (sickness) => sickness._id !== sicknessToBeDeleted
      );
    });
    builder.addCase(updateSickness.fulfilled, (state, action) => {
      const updatedSickness = action.payload.updatedSickness;
      state.sicknessList.data.map((sickness) =>
        sickness._id === updatedSickness._id ? updatedSickness : sickness
      );
    });
  },
});

export const {
  setShowSicknessModal,
  setTableToggle,
  setAccordianActiveKey,
  updateSicknessInfo,
  setIsSicknessEdit,
  setSicknessInfo,
} = sicknessSlice.actions;

export default sicknessSlice.reducer;

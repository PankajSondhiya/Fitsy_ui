import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  deleteUserbyId,
  getAllUsers,
  getUserById,
  updateUserById,
} from "../Services/users";

export const fetchUsers = createAsyncThunk("fetchUsers", getAllUsers);
export const deleteUser = createAsyncThunk("deleteUser", deleteUserbyId);
export const fetchUserById = createAsyncThunk("fetchUserById", getUserById);
export const updateUser = createAsyncThunk("updateUserById", updateUserById);
const usersSlice = createSlice({
  name: "users",

  initialState: {
    userData: {
      usersList: [],
      isLoading: true,
      isError: false,
    },
    userInfo: {},
    showUserModal: false,
    filteredData: [],
    dpUrl: "",
  },

  reducers: {
    setShowUserModal(state, action) {
      state.showUserModal = action.payload;
    },
    setUserInfo(state, action) {
      state.userInfo = action.payload;
    },
    updateUserInfo(state, action) {
      const key = action.payload.field;
      const value = action.payload.value;
      state.userInfo[key] = value;
    },
    setFilteredData(state, action) {
      state.filteredData = action.payload;
    },
    setDpUrl(state, action) {
      state.dpUrl = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.userData.isLoading = true;
      state.userData.isError = false;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.userData.isError = false;
      state.userData.isLoading = false;
      state.userData.usersList = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.userData.isError = true;
      state.userData.isLoading = false;
      state.userData.usersList = [];
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const userId = action.payload;
      state.userData.usersList = state.userData.usersList.filter(
        (user) => user._id !== userId
      );
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      const updatedUser = action.payload.updatedUser;
      state.userData.usersList = state.userData.usersList.map((user) =>
        user._id === updatedUser._id ? updatedUser : user
      );
      state.showUserModal = false;
      state.userInfo = {};
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      const userToBeUpdated = action.payload;
      state.userInfo = userToBeUpdated;
    });
  },
});
export const {
  setShowUserModal,
  setUserInfo,
  updateUserInfo,
  setFilteredData,
  setDpUrl,
} = usersSlice.actions;
export default usersSlice.reducer;

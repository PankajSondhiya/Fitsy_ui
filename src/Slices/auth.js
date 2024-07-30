import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createContext } from "react";
import { loginService, signUpService } from "../Services/auth.js";

export const login = createAsyncThunk("login", loginService);
export const signUp = createAsyncThunk("signUp", signUpService);

const authSlice = createSlice({
  name: "auth",

  initialState: {
    isSignUp: false,
    isPasswordVisible: false,
    signUpFormValues: {
      name: "",
      userId: "",
      password: "",
      email: "",
      userType: "PATIENT",
    },
    loginFormValues: {
      userId: "",
      password: "",
    },
    loginData: {
      loading: false,
      data: {},
      isError: false,
    },
    signUpData: {
      loading: false,
      data: {},
      isError: false,
    },
    newPassword: "",
    oobCode: "",
    registeredEmail: "",
  },

  reducers: {
    setIsSignUp(state, action) {
      state.isSignUp = !state.isSignUp;
    },
    updateLoginFormValues(state, { payload }) {
      const key = payload.field;
      const value = payload.value;
      state.loginFormValues[key] = value;
    },
    updateSignUpFormValues(state, { payload }) {
      const key = payload.field;
      const value = payload.value;
      state.signUpFormValues[key] = value;
    },
    setIsPasswordVisible(state, action) {
      state.isPasswordVisible = !state.isPasswordVisible;
    },
    setIsForgotPassword(state, action) {
      state.isForgotPassword = action.payload;
    },
    setNewPassword(state, action) {
      state.newPassword = action.payload;
    },
    setOobCode(state, action) {
      state.oobCode = action.payload;
    },
    setRegisteredEmail(state, action) {
      const { email } = action.payload;
      state.registeredEmail = email;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(login.pending, (state, action) => {
      state.loginData.loading = true;
      state.loginData.isError = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginData.loading = false;
      state.loginData.isError = false;
      state.loginData.data = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isError = true;
      state.loginData.loading = true;
    });
    builder.addCase(signUp.pending, (state, action) => {
      state.signUpData.loading = true;
      state.signUpData.isError = false;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.signUpData.loading = false;
      state.signUpData.isError = false;
      state.signUpData.data = action.payload;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.signUpData.loading = false;
      state.signUpData.isError = true;
    });
  },
});

export const {
  updateLoginFormValues,
  updateSignUpFormValues,
  setIsSignUp,
  setIsPasswordVisible,
  setIsForgotPassword,
  setOobCode,
  setNewPassword,
  setRegisteredEmail,
} = authSlice.actions;

export default authSlice.reducer;

import { configureStore } from "@reduxjs/toolkit";
import auth from "../Slices/auth";
import sickness from "../Slices/sickness";
import appointment from "../Slices/appointment";
import prescription from "../Slices/priscription";
import doctor from "../Slices/doctor";
import hospital from "../Slices/hospital";
import users from "../Slices/users";
import medicines from "../Slices/medicines";

export const store = configureStore({
  reducer: {
    auth,
    sickness,
    appointment,
    prescription,
    doctor,
    hospital,
    users,
    medicines,
  },
});

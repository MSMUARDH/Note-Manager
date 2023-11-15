import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/Notes/noteSlice";
import { userSlice } from "../features/Users/userSlice";
import { alertsSlice } from "../features/Alert/alertSlice";

export const store = configureStore({
  reducer: {
    Notes: notesReducer,
    user: userSlice.reducer,
    alerts: alertsSlice.reducer,
  },
});

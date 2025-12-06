import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import peopleReducer from "../slices/peopleSlice";
import eventsReducer from "../slices/eventsSlice";

const memoraStore = configureStore({
  reducer: {
    auth: authReducer,
    people: peopleReducer,
    events: eventsReducer,
  },
});

export default memoraStore;

// src/slices/eventsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_VARIABLE || "http://localhost:5000";

export const fetchEventsByPersonThunk = createAsyncThunk(
  "events/fetchEventsByPersonThunk",
  async (personId, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/people/${personId}/events`);
      // نتوقع هنا أن السيرفر يرجع مصفوفة من الأحداث
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Failed to fetch events");
    }
  }
);

export const saveEventThunk = createAsyncThunk(
  "events/saveEventThunk",
  async ({ personId, eventData }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/people/${personId}/events`,
        eventData
      );
      // نتوقع هنا أن السيرفر يرجع { message, events }
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Failed to save event");
    }
  }
);

const initialState = {
  list: [],
  currentEvent: null,
  msg: null,
  loading: false,
};

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    setCurrentEvent(state, action) {
      state.currentEvent = action.payload;
    },
    clearEventsMessage(state) {
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchEventsByPersonThunk.pending, (state) => {
      state.loading = true;
      state.msg = null;
    });
    builder.addCase(fetchEventsByPersonThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload || [];
    });
    builder.addCase(fetchEventsByPersonThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload || action.error.message;
    });

    // save
    builder.addCase(saveEventThunk.pending, (state) => {
      state.loading = true;
      state.msg = null;
    });
    builder.addCase(saveEventThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.msg = action.payload?.message || "Event saved";
      if (action.payload?.events) {
        state.list = action.payload.events;
      }
    });
    builder.addCase(saveEventThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload || action.error.message;
    });
  },
});

export const { setCurrentEvent, clearEventsMessage } = eventsSlice.actions;
export default eventsSlice.reducer;

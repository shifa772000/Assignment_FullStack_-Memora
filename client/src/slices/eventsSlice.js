// src/slices/eventsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_VARIABLE || "http://localhost:5000";

export const fetchEventsByPersonThunk = createAsyncThunk(
  "events/fetchEventsByPersonThunk",
  async (personId, thunkAPI) => {
    try {
      const res = await axios.get(`${API_URL}/api/people/${personId}/events`);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data?.error) {
        return thunkAPI.rejectWithValue(err.response.data.error);
      }
      return thunkAPI.rejectWithValue("Failed to fetch events");
    }
  }
);


// الثنك المحدث للحذف مع استدعاء الـ API
export const deleteEventThunk = createAsyncThunk(
  "events/deleteEvent",
  async ({ personId, eventId }, { rejectWithValue }) => {
    try {
      // 💡 خطوة API: إرسال طلب الحذف
      const res = await axios.delete(`${API_URL}/api/people/${personId}/events/${eventId}`);

      // نُعيد الـ eventId لنتعرف على العنصر الذي سنحذفه من القائمة
      return { eventId, message: res.data?.message || "Event deleted successfully" };
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Failed to delete event");
    }
  }
);

export const saveEventThunk = createAsyncThunk(
  "events/save",
  async ({ personId, eventData }, thunkAPI) => {  // <-- thunkAPI هنا
    try {
      const res = await axios.post(`${API_URL}/events/${personId}`, eventData);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data?.error) {
        return thunkAPI.rejectWithValue(err.response.data.error);
      }
      return thunkAPI.rejectWithValue("Failed to save event");     
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


    // DELETE
    builder.addCase(deleteEventThunk.pending, (state) => {
      state.loading = true;
      state.msg = null;
    });
    builder.addCase(deleteEventThunk.fulfilled, (state, action) => {
      state.loading = false;
      const { eventId, message } = action.payload;
      state.msg = message;

      // 💡 خطوة Redux: إزالة الحدث من القائمة
      if (state.list) {
        state.list = state.list.filter(event => event._id !== eventId);
      }
      state.currentEvent = null;
    });
    builder.addCase(deleteEventThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload || action.error.message;
    });

  },

});


export const { setCurrentEvent, clearEventsMessage } = eventsSlice.actions;
export default eventsSlice.reducer;
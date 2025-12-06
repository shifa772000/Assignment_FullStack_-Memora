// src/slices/peopleSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_VARIABLE
 || "http://localhost:5000";

export const fetchPeopleThunk = createAsyncThunk(
  "people/fetchPeopleThunk",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${API_URL}/api/people`);
      return res.data; // نتوقع مصفوفة أشخاص
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Failed to fetch people");
    }
  }
);

export const addPersonThunk = createAsyncThunk(
  "people/addPersonThunk",
  async (personData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/people`, personData);
      // نتوقع { message, person }
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data?.error) {
        return rejectWithValue(err.response.data.error);
      }
      return rejectWithValue("Failed to add person");
    }
  }
);

const initialState = {
  list: [],
  selectedPerson: null,
  msg: null,
  loading: false,
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setSelectedPerson(state, action) {
      state.selectedPerson = action.payload;
    },
    clearPeopleMessage(state) {
      state.msg = null;
    },
  },
  extraReducers: (builder) => {
    // fetch
    builder.addCase(fetchPeopleThunk.pending, (state) => {
      state.loading = true;
      state.msg = null;
    });
    builder.addCase(fetchPeopleThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.list = action.payload || [];
    });
    builder.addCase(fetchPeopleThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload || action.error.message;
    });

    // add
    builder.addCase(addPersonThunk.pending, (state) => {
      state.loading = true;
      state.msg = null;
    });
    builder.addCase(addPersonThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.msg = action.payload?.message || "Person added";
      if (action.payload?.person) {
        state.list.push(action.payload.person);
      }
    });
    builder.addCase(addPersonThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload || action.error.message;
    });
  },
});

export const { setSelectedPerson, clearPeopleMessage } = peopleSlice.actions;
export default peopleSlice.reducer;

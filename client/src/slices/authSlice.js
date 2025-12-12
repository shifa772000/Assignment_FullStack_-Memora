// src/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.REACT_APP_VARIABLE || "http://localhost:5000";

const savedUser = JSON.parse(localStorage.getItem("memora_user") || "null");
const savedToken = localStorage.getItem("memora_token") || null;

export const registerThunk = createAsyncThunk(
  "auth/registerThunk",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, userData);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Registration failed");
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/loginThunk",
  async (userData, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, userData);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data?.message) {
        return rejectWithValue(err.response.data.message);
      }
      return rejectWithValue("Login failed");
    }
  }
);

const initialState = {
  user: savedUser,
  token: savedToken,
  msg: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.msg = null;
      localStorage.removeItem("memora_user");
      localStorage.removeItem("memora_token");
    },
  },
  extraReducers: (builder) => {
    // register
    builder.addCase(registerThunk.pending, (state) => {
      state.loading = true;
      state.msg = null;
    });
    builder.addCase(registerThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.msg = action.payload?.message || "Registered successfully";
    });
    builder.addCase(registerThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload || action.error.message;
    });

    // login
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
      state.msg = null;
    });
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload?.user || null;
      state.token = action.payload?.token || null;
      state.msg = action.payload?.message || "Welcome";

      if (state.user && state.token) {
        localStorage.setItem("memora_user", JSON.stringify(state.user));
        localStorage.setItem("memora_token", state.token);
      }
    });
    builder.addCase(loginThunk.rejected, (state, action) => {
      state.loading = false;
      state.msg = action.payload || action.error.message;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

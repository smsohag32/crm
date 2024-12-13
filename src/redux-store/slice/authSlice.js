import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { deleteCookie, getCookie, setCookie } from "@/utils/helper";
import { loginApi } from "../api/loginApi";
const getPersistedToken = getCookie("access_token");
const getPersistedUser = JSON.parse(getCookie("crm-user"));

const initialState = {
   token: getPersistedToken || null,
   user: getPersistedUser || null,
   isLoading: false,
   error: null,
};

export const loginUser = createAsyncThunk(
   "auth/loginUser",
   async (credentials, { rejectWithValue }) => {
      try {
         const response = await loginApi(credentials);
         return response?.data;
      } catch (error) {
         return rejectWithValue(error.message || "Login failed");
      }
   }
);

// Redux slice
const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {
      logoutUser: (state) => {
         state.token = null;
         state.user = null;
         deleteCookie("access_token");
         deleteCookie("refresh_token");
         deleteCookie("crm-user");
      },
   },
   extraReducers: (builder) => {
      builder
         .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.error = null;
         })
         .addCase(loginUser.fulfilled, (state, action) => {
            console.log("action", action?.payload);
            const { tokens, ...user } = action.payload;
            state.isLoading = false;
            state.token = tokens?.access_token;
            state.user = user;
            if (tokens?.access_token) setCookie("access_token", tokens?.access_token);
            if (tokens?.refresh_token) setCookie("refresh_token", tokens?.refresh_token);
            if (user) setCookie("crm-user", JSON.stringify(user));
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Login failed";
         });
   },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
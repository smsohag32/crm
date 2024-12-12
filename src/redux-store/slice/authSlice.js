import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { deleteCookie, getCookie, setCookie } from "@/utils/helper";
import { loginApi } from "../api/loginApi";
const getPersistedToken = getCookie("accessToken");
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
         deleteCookie("accessToken");
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
            const { token, dto } = action.payload.data;
            state.isLoading = false;
            state.token = token;
            state.user = dto;
            if (token) setCookie("accessToken", token);
            if (dto) setCookie("crm-user", JSON.stringify(dto));
         })
         .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload || "Login failed";
         });
   },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;

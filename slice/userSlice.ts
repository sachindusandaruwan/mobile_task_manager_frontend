import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import setupApi from "../api/setupApi"; // ✅ use the shared axios instance

// State typing
interface UserState {
    jwtToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    isRegistered: boolean;
    loading: boolean;
    error: string | null;
    userId: string;
    name: string;
    email: string;
}

const initialState: UserState = {
    jwtToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isRegistered: false,
    loading: false,
    error: null,
    userId: "",
    name: "",
    email: "",
};

// ✅ Async thunks
export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            console.log("loginUser called");
            const response = await setupApi.post("/user/signIn", { email, password });
            return response.data;
            console.log('loginUser response');
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Login failed");
        }
    }
);

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData: any, { rejectWithValue }) => {
        try {
            const response = await setupApi.post("/user/register", userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Registration failed");
        }
    }
);

export const refreshToken = createAsyncThunk(
    "user/refreshToken",
    async (refresh_token: string, { rejectWithValue }) => {
        try {
            const response = await setupApi.post(
                "/auth/refresh-token",
                null,
                {
                    headers: { Authorization: `Bearer ${refresh_token}` },
                }
            );
            return response.data;
        } catch (err) {
            const error = err as AxiosError;
            return rejectWithValue(error.response?.data || "Token refresh failed");
        }
    }
);

// ✅ Slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutUser: (state) => {
            state.jwtToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.userId = "";
            state.name = "";
            state.email = "";
        },
    },
    extraReducers: (builder) => {
        builder
            // Register user
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, { payload }: any) => {
                state.loading = false;
                state.isRegistered = true;
                state.jwtToken = payload.accessToken;
                state.refreshToken = payload.refreshToken;
                state.isAuthenticated = true;
                state.userId = payload._id;
                state.name = payload.name;
                state.email = payload.email;
            })
            .addCase(registerUser.rejected, (state, { payload }: any) => {
                state.loading = false;
                state.error = payload;
            })
            // Login user
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, { payload }: any) => {
                state.loading = false;
                state.jwtToken = payload.accessToken;
                state.refreshToken = payload.refreshToken;
                state.isAuthenticated = true;
                state.userId = payload._id;
                state.name = payload.name;
                state.email = payload.email;
            })
            .addCase(loginUser.rejected, (state, { payload }: any) => {
                state.loading = false;
                state.error = payload;
            })
            // Refresh token
            .addCase(refreshToken.fulfilled, (state, { payload }: any) => {
                state.jwtToken = payload.accessToken; // ✅ update JWT on refresh
            });
    },
});

export default userSlice.reducer;
export const { logoutUser } = userSlice.actions;

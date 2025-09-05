import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const intializedState={
    jwtToken: null,
    refreshToken: null,
    isAuthenticated: false,
    loading: false,
    error: "",
    userId: "",
    name: "",
    email: "",
}

const api=axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const sendData =
                {
                    email: email,
                    password: password
                }
            const response = await api.post("/user/signIn", sendData);
            console.log(response.data);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "An error occurred");
        }
    }
)

export const registerUser=createAsyncThunk("user/registerUser",
    async (userData: any)=>{
        try {
            alert("hii");
            const response=await api.post("/user/register", userData);
            alert(userData);
            return response.data;
        }catch (error) {
            console.log(error);

        }

    });

const userSlice=createSlice({
    name: "user",
    initialState: intializedState,
    reducers: {
        logoutUser: (state)=>{
            state.jwtToken=null;
            state.refreshToken=null;
            state.isAuthenticated=false;
            state.userId="";
            state.name="";
            state.email="";
            console.log("User logged out");
        },
    },
    extraReducers(builder){
        builder.addCase(registerUser.pending, (state)=>{
            state.loading=true;
        });
        builder.addCase(registerUser.fulfilled, (state, {payload}:any)=>{
            console.log("hiii : "+payload);
            state.loading=false;
            state.jwtToken=payload.accessToken;
            state.refreshToken=payload.refreshToken;
            state.isAuthenticated=true;
            state.userId=payload._id;
            state.name=payload.name;
            state.email=payload.email;
            alert("User registered successfully");
        });

        builder.addCase(registerUser.rejected, (state, {payload}:any)=>{
            state.loading=false;
            state.error=payload;
            alert("User registration failed");
        });
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = "";
            })
            .addCase(loginUser.fulfilled, (state, { payload }:any) => {
                state.jwtToken = payload.accessToken;
                state.refreshToken = payload.refreshToken;
                state.isAuthenticated = true;
                state.userId = payload._id;
                state.name = payload.name;
                state.email = payload.email;
            })
            .addCase(loginUser.rejected, (state:any, { payload }) => {
                state.loading = false;
                state.error = payload;
            });
    }
});

export default userSlice.reducer;
export const {logoutUser}=userSlice.actions;
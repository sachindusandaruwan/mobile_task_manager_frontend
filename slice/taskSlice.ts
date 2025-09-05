import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../model/task";
import axios from "axios";

// Define initial state
const initialTasks: Task[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Fetch tasks by user ID
export const getTasksByUserId = createAsyncThunk(
    "tasks/getTasksByUserId",
    async ({ userId, jwtToken }: { userId: string; jwtToken: string }) => {
        const response = await api.get(`/task/getTaskByUser/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        return response.data;
    }
);

// Add a new task
export const addTask = createAsyncThunk(
    "tasks/addTask",
    async ({ task, jwtToken }: { task: Task; jwtToken: string }, { dispatch }) => {
        const response = await api.post("/task/add", task, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });

        // After adding the task, fetch the tasks again to ensure the state is updated
        dispatch(getTasksByUserId({ userId: task.userId, jwtToken }));
        return response.data;
    }
);

// Delete a task
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async ({ _id, jwtToken }: { _id: string; jwtToken: string }, { rejectWithValue }) => {
        try {
            await api.delete(`/task/delete/${_id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });
            return _id; // Return only the ID so we can remove it from state
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Task deletion failed");
        }
    }
);

// Update a task
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async ({ task, jwtToken }: { task: Task; jwtToken: string }, { rejectWithValue, dispatch }) => {
        try {
            const response = await api.put(`/task/update/${task._id}`, task, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            // After updating the task, we can fetch the tasks again to ensure the state is updated
            dispatch(getTasksByUserId({ userId: task.userId, jwtToken }));
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Task update failed");
        }
    }
);

// Create the slice
const taskSlice = createSlice({
    name: "tasks",
    initialState: initialTasks,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTasksByUserId.fulfilled, (_, action) => {
                return action.payload; // Replace state with fetched tasks
            })
            .addCase(addTask.fulfilled, (state, action) => {
                console.log("Added task:", action.payload);
                // Optimistically update the state with the new task
                return [...state, action.payload]; // Return new state array
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                console.log("Deleted task:", action.payload);
                // Remove the task from the state by filtering it out
                return state.filter((task) => task._id !== action.payload); // Return new state array
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                console.log("Updated task:", action.payload);
                // Optimistically update the task in the state
                return state.map((task) =>
                    task._id === action.payload._id ? { ...task, ...action.payload } : task
                );
            });
    },
});

export default taskSlice.reducer;

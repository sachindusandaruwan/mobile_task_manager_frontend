import setupApi from "@/api/setupApi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Task } from "../model/task";

// Define initial state
const initialTasks: Task[] = [];

// Using setupApi instead of creating a separate instance

// Fetch tasks by user ID
export const getTasksByUserId = createAsyncThunk(
    "tasks/getTasksByUserId",
    async ({ userId, jwtToken }: { userId: string; jwtToken: string }) => {
        console.log(jwtToken, " and jwt enawa", userId);
        const response = await setupApi.get(`/task/getTaskByUser/${userId}`, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        console.log(response);
        return response.data;
    }
);

// Add a new task
export const addTask = createAsyncThunk(
    "tasks/addTask",
    async (
        { task, jwtToken }: { task: Task; jwtToken: string },
        { dispatch }
    ) => {
        const response = await setupApi.post("/task/add", task, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        console.log("////////////////////////////////////////////////////////");
        console.log(response);
        console.log("////////////////////////////////////////////////////////");

        // After adding the task, fetch the tasks again to ensure the state is updated
        dispatch(getTasksByUserId({ userId: task.userId, jwtToken }));
        return response.data;
    }
);

// Delete a task
export const deleteTask = createAsyncThunk(
    "tasks/deleteTask",
    async (
        { _id, jwtToken }: { _id: string; jwtToken: string },
        { rejectWithValue }
    ) => {
        try {
            console.log("Deleting task with ID:", _id);
            console.log("JWT Token:", jwtToken);

            const response = await setupApi.delete(`/task/delete/${_id}`, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            console.log("Delete response:", response.data);
            return _id; // Return only the ID so we can remove it from state
        } catch (error: any) {
            console.error("Delete task error:", error);
            return rejectWithValue(error.response?.data || "Task deletion failed");
        }
    }
);

// Update a task
export const updateTask = createAsyncThunk(
    "tasks/updateTask",
    async (
        { task, jwtToken }: { task: Task; jwtToken: string },
        { rejectWithValue, dispatch }
    ) => {
        try {
            console.log("Updating task:", task);
            console.log("JWT Token:", jwtToken);

            const response = await setupApi.put(`/task/update/${task._id}`, task, {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
            });

            console.log("Update response:", response.data);

            // After updating the task, we can fetch the tasks again to ensure the state is updated
            dispatch(getTasksByUserId({ userId: task.userId, jwtToken }));
            return response.data;
        } catch (error: any) {
            console.error("Update task error:", error);
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
                    task._id === action.payload._id
                        ? { ...task, ...action.payload }
                        : task
                );
            });
    },
});

export default taskSlice.reducer;

import { Task } from "@/model/task";
import { deleteTask, updateTask } from "@/slice/taskSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

const updateDeletePop = () => {
    const { taskId, mode } = useLocalSearchParams();
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    const tasks = useSelector((state: RootState) => state.tasks);
    const { jwtToken } = useSelector((state: RootState) => state.userReducer);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isUpdateMode, setIsUpdateMode] = useState(false);

    // Form fields for update
    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [status, setStatus] = useState("");
    const [startDateTime, setStartDateTime] = useState("");
    const [endDateTime, setEndDateTime] = useState("");

    useEffect(() => {
        if (taskId && tasks.length > 0) {
            const task = tasks.find((t) => t._id === taskId);
            if (task) {
                setSelectedTask(task);
                setTitle(task.title);
                setPlace(task.place);
                setStatus(task.status);
                setStartDateTime(task.startDateTime);
                setEndDateTime(task.endDateTime);
                setIsUpdateMode(mode === "update");
            }
        }
    }, [taskId, tasks, mode]);

    const handleDelete = () => {
        if (selectedTask && jwtToken) {
            Alert.alert(
                "Delete Task",
                `Are you sure you want to delete "${selectedTask.title}"?`,
                [
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                    {
                        text: "Delete",
                        style: "destructive",
                        onPress: async () => {
                            try {
                                await dispatch(deleteTask({ _id: selectedTask._id, jwtToken }));
                                Alert.alert("Success", "Task deleted successfully", [
                                    { text: "OK", onPress: () => router.back() },
                                ]);
                            } catch (error) {
                                console.error("Error deleting task:", error);
                                Alert.alert("Error", "Failed to delete task");
                            }
                        },
                    },
                ]
            );
        }
    };

    const handleUpdate = () => {
        if (selectedTask && jwtToken) {
            const updatedTask: Task = {
                ...selectedTask,
                title,
                place,
                status,
                startDateTime,
                endDateTime,
            };

            Alert.alert("Update Task", "Are you sure you want to update this task?", [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Update",
                    onPress: async () => {
                        try {
                            await dispatch(updateTask({ task: updatedTask, jwtToken }));
                            Alert.alert("Success", "Task updated successfully", [
                                { text: "OK", onPress: () => router.back() },
                            ]);
                        } catch (error) {
                            console.error("Error updating task:", error);
                            Alert.alert("Error", "Failed to update task");
                        }
                    },
                },
            ]);
        }
    };

    if (!selectedTask) {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isUpdateMode ? "Update Task" : "Delete Task"}
            </Text>

            {isUpdateMode ? (
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Task Title:</Text>
                    <TextInput
                        style={styles.input}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Enter task title"
                    />

                    <Text style={styles.label}>Place:</Text>
                    <TextInput
                        style={styles.input}
                        value={place}
                        onChangeText={setPlace}
                        placeholder="Enter place"
                    />

                    <Text style={styles.label}>Status:</Text>
                    <TextInput
                        style={styles.input}
                        value={status}
                        onChangeText={setStatus}
                        placeholder="Enter status"
                    />

                    <Text style={styles.label}>Start Date & Time:</Text>
                    <TextInput
                        style={styles.input}
                        value={startDateTime}
                        onChangeText={setStartDateTime}
                        placeholder="YYYY-MM-DDTHH:mm:ss"
                    />

                    <Text style={styles.label}>End Date & Time:</Text>
                    <TextInput
                        style={styles.input}
                        value={endDateTime}
                        onChangeText={setEndDateTime}
                        placeholder="YYYY-MM-DDTHH:mm:ss"
                    />

                    <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
                        <Text style={styles.buttonText}>Update Task</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.deleteContainer}>
                    <Text style={styles.taskInfo}>Task: {selectedTask.title}</Text>
                    <Text style={styles.taskInfo}>Place: {selectedTask.place}</Text>
                    <Text style={styles.taskInfo}>Status: {selectedTask.status}</Text>
                    <Text style={styles.taskInfo}>
                        Date:{" "}
                        {selectedTask.startDateTime
                            ? selectedTask.startDateTime.split("T")[0]
                            : "No date"}
                    </Text>

                    <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Delete Task</Text>
                    </TouchableOpacity>
                </View>
            )}

            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>← Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
        color: "#333",
    },
    formContainer: {
        flex: 1,
    },
    deleteContainer: {
        flex: 1,
        justifyContent: "center",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 5,
        marginTop: 15,
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: "#f9f9f9",
    },
    taskInfo: {
        fontSize: 16,
        marginBottom: 10,
        padding: 10,
        backgroundColor: "#f0f0f0",
        borderRadius: 8,
    },
    updateButton: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: "#dc3545",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        backgroundColor: "#6c757d",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    backButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default updateDeletePop;

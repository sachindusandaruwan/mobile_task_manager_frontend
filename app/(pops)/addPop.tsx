
import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { addTask } from "@/slice/taskSlice";
import { Task } from "@/model/task";
import { useRouter } from "expo-router";

const AddPop = () => {
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();

    const { userId, jwtToken } = useSelector((state: RootState) => state.userReducer);

    const [title, setTitle] = useState("");
    const [place, setPlace] = useState("");
    const [status, setStatus] = useState("pending");

    const [startDateTime, setStartDateTime] = useState(new Date());
    const [endDateTime, setEndDateTime] = useState(new Date());

    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
    const [isPickingStart, setIsPickingStart] = useState(true);

    const handlePickerChange = (event: DateTimePickerEvent, date?: Date) => {
        if (!date) return;

        if (isPickingStart) {
            if (pickerMode === "date") {
                setStartDateTime(date);
                setPickerMode("time");
                setShowStartPicker(true);
            } else {
                const newDate = new Date(startDateTime);
                newDate.setHours(date.getHours());
                newDate.setMinutes(date.getMinutes());
                setStartDateTime(newDate);
                setShowStartPicker(false);
                setPickerMode("date");
            }
        } else {
            if (pickerMode === "date") {
                setEndDateTime(date);
                setPickerMode("time");
                setShowEndPicker(true);
            } else {
                const newDate = new Date(endDateTime);
                newDate.setHours(date.getHours());
                newDate.setMinutes(date.getMinutes());
                setEndDateTime(newDate);
                setShowEndPicker(false);
                setPickerMode("date");
            }
        }
    };

    const handleSave = async () => {
        if (!title || !place) {
            Alert.alert("Validation", "Please fill all fields");
            return;
        }

        if (!userId || !jwtToken) {
            Alert.alert("Error", "User not authenticated");
            return;
        }

        const newTask: Omit<Task, "_id"> = {
            title,
            place,
            status,
            startDateTime: startDateTime.toISOString(),
            endDateTime: endDateTime.toISOString(),
            userId,
        };

        try {
            await dispatch(addTask({ task: newTask as Task, jwtToken })).unwrap();
            Alert.alert("Success", "Task added successfully");

            // Navigate to dashboard explicitly after saving
            setTimeout(() => {
                router.push("/dashboardfooter"); // <-- replace with your dashboard route
            }, 100);
        } catch (error) {
            console.error("Add task failed:", error);
            Alert.alert("Error", "Failed to add task");
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>➕ Add New Task</Text>

            <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Place"
                value={place}
                onChangeText={setPlace}
            />
            <TextInput
                style={styles.input}
                placeholder="Status (Pending / Done)"
                value={status}
                onChangeText={setStatus}
            />

            <TouchableOpacity
                onPress={() => {
                    setIsPickingStart(true);
                    setShowStartPicker(true);
                }}
            >
                <Text style={styles.pickerLabel}>
                    Start: {startDateTime.toLocaleString()}
                </Text>
            </TouchableOpacity>
            {showStartPicker && (
                <DateTimePicker
                    value={startDateTime}
                    mode={pickerMode}
                    display="default"
                    onChange={handlePickerChange}
                />
            )}

            <TouchableOpacity
                onPress={() => {
                    setIsPickingStart(false);
                    setShowEndPicker(true);
                }}
            >
                <Text style={styles.pickerLabel}>
                    End: {endDateTime.toLocaleString()}
                </Text>
            </TouchableOpacity>
            {showEndPicker && (
                <DateTimePicker
                    value={endDateTime}
                    mode={pickerMode}
                    display="default"
                    onChange={handlePickerChange}
                />
            )}

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save Task</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default AddPop;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 25,
        textAlign: "center",
        color: "#333",
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: "#fafafa",
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 15,
        color: "#007bff",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        backgroundColor: "#f9f9f9",
    },
    button: {
        backgroundColor: "#007bff",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

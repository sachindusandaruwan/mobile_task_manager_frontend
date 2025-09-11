
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { registerUser } from "@/slice/userSlice";
import { useRouter } from "expo-router";

const RegisterScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch<AppDispatch>();
    const { loading, error, isRegistered } = useSelector(
        (state: RootState) => state.userReducer
    );

    const router = useRouter();

    useEffect(() => {
        if (isRegistered) {
            Alert.alert("Success", "Registration successful! Please login.");
            router.replace("/login");
        }
    }, [isRegistered]);

    useEffect(() => {
        if (error) {
            Alert.alert("Registration Failed", error);
        }
    }, [error]);

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleRegister = () => {
        if (!name.trim()) {
            Alert.alert("Invalid Input", "Name is required");
            return;
        }
        if (!email || !validateEmail(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email");
            return;
        }
        if (!password || password.length < 6) {
            Alert.alert("Invalid Password", "Password must be at least 6 characters");
            return;
        }

        dispatch(registerUser({ name, email, password }));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>

            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
            />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <Button
                title={loading ? "Registering..." : "Register"}
                onPress={handleRegister}
                disabled={loading}
            />
        </View>
    );
};

export default RegisterScreen;

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", padding: 20 },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        padding: 10,
        marginBottom: 12,
        borderRadius: 6,
    },
});

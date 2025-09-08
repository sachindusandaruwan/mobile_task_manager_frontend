import React, {useEffect, useState} from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";
import {router, useRouter} from "expo-router";
import {AppDispatch, RootState} from "@/store/store";
import {useDispatch, useSelector} from "react-redux";
import {loginUser} from "@/slice/userSlice";

const LoginScreen: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const isAuthenticated = useSelector(
        (state:RootState)=>state.userReducer.isAuthenticated
    );


    const router = useRouter();

    useEffect(()=>{
        if(isAuthenticated){
            router.replace("../")
        }
    },[isAuthenticated,router]
    )

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };


    const handleLogin = () => {
        alert("enawa")
        console.log("Login pressed:");

        dispatch(loginUser({email, password}));
        console.log(email , 'and' , password);

        router.push("/(dashboard)/dashboardfooter")
        // Later connect with backend or Firebase
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>

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

            <Button title="Login" onPress={handleLogin} />

            <Pressable style={styles.registerButton} onPress={() => router.push("/register")}>
                <Text style={styles.registerText}>
                    Do not have an account? Register
                </Text>
            </Pressable>
        </View>
    );
};

export default LoginScreen;

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
    registerButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 6,
        backgroundColor: "#f0f0f0",
    },
    registerText: {
        color: "blue",
        fontSize: 16,
        textAlign: "center",
    },
});

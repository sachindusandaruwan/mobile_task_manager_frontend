
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Slot } from "expo-router";
import React from "react";

export default function RootLayout() {
    return (
        <Provider store={store}>
            <Slot />
        </Provider>
    );
}






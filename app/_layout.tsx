// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';
//
// import { useColorScheme } from '@/hooks/useColorScheme';
//
// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });
//
//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }
//
//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }





//gpt eka denna kalin eka


// import {Provider} from "react-redux";
// import {store} from "@/store/store";
// import {Stack} from "expo-router";
//
// export default function RootLayout() {
//     return (
//         <Provider store={store}>
//             <Stack>
//                 <Stack.Screen name="(auth)" options={{ headerShown: false }} />
//                 <Stack.Screen name="(dashboard)" options={{ headerShown: false }} />
//                 <Stack.Screen name="(pops)" options={{ headerShown: false }} />
//             </Stack>
//         </Provider>
//     );
// }


// import { Provider } from "react-redux";
// import { store } from "@/store/store";
// import { Slot, Stack } from "expo-router";
// import React from "react";
//
// export default function RootLayout() {
//     return (
//         <Provider store={store}>
//             <Stack screenOptions={{ headerShown: false }}>
//                 {/* Slot renders child folders like (auth), (dashboard), or (pops) */}
//                 <Slot />
//             </Stack>
//         </Provider>
//     );
// }


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






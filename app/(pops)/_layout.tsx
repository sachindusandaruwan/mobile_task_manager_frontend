//gpt denna kalin eka

// import { Stack } from "expo-router";
//
// export default function PopLayout() {
//     return (
//         <Stack screenOptions={{headerShown: false}}>
//             <Stack.Screen name="addPop"/>
//             <Stack.Screen name="updateDeletePop"/>
//         </Stack>
//     );
// }


// import { Stack } from "expo-router";
//
// export default function PopsLayout() {
//     return (
//         <Stack screenOptions={{ headerShown: false }}>
//             <Stack.Screen name="addPop" />
//             <Stack.Screen name="updateDeletePop" />
//         </Stack>
//     );
// }


import { Stack } from "expo-router";

export default function PopsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="addPop" />
      <Stack.Screen name="updateDeletePop" />
    </Stack>
  );
}
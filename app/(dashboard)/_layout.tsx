// // app/(dashboard)/_layout.tsx
// import { Slot, Stack } from "expo-router";
//
// export default function DashboardLayout() {
//     return (
//         <Stack screenOptions={{ headerShown: false }}>
//             <Slot />
//         </Stack>
//     );
// }



// import { Slot, Stack } from "expo-router";
//
// export default function DashboardLayout() {
//     return (
//         <Stack screenOptions={{ headerShown: false }}>
//             <Slot />
//         </Stack>
//     );
// }

// import { Stack, Slot } from "expo-router";

// export default function DashboardLayout() {
//     return (
//         <Stack screenOptions={{ headerShown: false }}>
//             <Slot />
//         </Stack>
//     );
// }



//gpt denna kalin eka

// import { Stack } from "expo-router";
//
// export default function DashboardLayout() {
//     return (
//         <Stack screenOptions={{ headerShown: false }} />
//     );
// }




import { Slot, Stack } from "expo-router";

export default function DashboardLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Slot />
    </Stack>
  );
}

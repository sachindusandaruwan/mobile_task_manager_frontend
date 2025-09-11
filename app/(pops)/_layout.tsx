
import { Stack } from "expo-router";

export default function PopsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="addPop" />
      <Stack.Screen name="updateDeletePop" />
    </Stack>
  );
}
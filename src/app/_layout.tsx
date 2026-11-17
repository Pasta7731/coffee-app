import { Stack } from "expo-router/stack";
import { StatusBar } from "expo-status-bar";

import { CoffeeProvider } from "@/context/coffee-context";

export default function RootLayout() {
  return (
    <CoffeeProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#FCF8F1" },
          headerTintColor: "#1F4D3A",
          headerTitleStyle: { fontWeight: "700" },
          headerBackButtonDisplayMode: "minimal",
          contentStyle: { backgroundColor: "#FCF8F1" },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="menu" options={{ title: "เมนูทั้งหมด" }} />
        <Stack.Screen name="customize" options={{ title: "ปรับแก้วของคุณ" }} />
        <Stack.Screen name="cart" options={{ title: "ตะกร้าของคุณ" }} />
        <Stack.Screen name="checkout" options={{ title: "ยืนยันคำสั่งซื้อ" }} />
        <Stack.Screen
          name="confirmation"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen name="owner" options={{ title: "จัดการร้าน" }} />
      </Stack>
    </CoffeeProvider>
  );
}

import "../global.css";

import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

// Keep the splash screen visible until fonts are loaded
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    // Primary FZ Poppins font keys
    "FZPoppins-Regular": require("../assets/fonts/FZ Poppins-Regular.ttf"),
    "FZPoppins-Medium": require("../assets/fonts/FZ Poppins-Medium.ttf"),
    "FZPoppins-SemiBold": require("../assets/fonts/FZ Poppins-SemiBold.ttf"),
    "FZPoppins-Bold": require("../assets/fonts/FZ Poppins-Bold.ttf"),
    // Registered aliases for format variations & backwards compatibility
    "FZ Poppins-Regular": require("../assets/fonts/FZ Poppins-Regular.ttf"),
    "FZ Poppins-Medium": require("../assets/fonts/FZ Poppins-Medium.ttf"),
    "FZ Poppins-SemiBold": require("../assets/fonts/FZ Poppins-SemiBold.ttf"),
    "FZ Poppins-Bold": require("../assets/fonts/FZ Poppins-Bold.ttf"),
    "Poppins-Regular": require("../assets/fonts/FZ Poppins-Regular.ttf"),
    "Poppins-Medium": require("../assets/fonts/FZ Poppins-Medium.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/FZ Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/FZ Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Don't render until fonts are ready (avoids FOUT / layout shift)
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#FFFFFF" },
          animation: "slide_from_right",
        }}
      />
    </>
  );
}

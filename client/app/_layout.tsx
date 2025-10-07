import "./styles/global.css";
import { SplashScreen, Stack } from "expo-router";
import { Lobster_400Regular, useFonts } from "@expo-google-fonts/lobster";
import {
  LobsterTwo_400Regular,
  LobsterTwo_400Regular_Italic,
  LobsterTwo_700Bold,
  LobsterTwo_700Bold_Italic,
} from "@expo-google-fonts/lobster-two";
import { SUSEMono_400Regular } from "@expo-google-fonts/suse-mono";
import {
  AlanSans_400Regular,
  AlanSans_900Black,
  AlanSans_500Medium,
} from "@expo-google-fonts/alan-sans";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
    Lobster_400Regular,
    LobsterTwo_400Regular,
    LobsterTwo_400Regular_Italic,
    LobsterTwo_700Bold,
    LobsterTwo_700Bold_Italic,
    SUSEMono_400Regular,
    AlanSans_400Regular,
    AlanSans_900Black,
    AlanSans_500Medium,
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <StatusBar style="dark" />
    </Stack>
  );
}

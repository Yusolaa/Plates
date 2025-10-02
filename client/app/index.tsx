import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import GoogleSignIn from "../components/GoggleSignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  const checkExistingAuth = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (token) {
        // User is already logged in
        // router.replace("/home"); // Navigate to main app
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSignInSuccess = (userData: { user: { name: any } }) => {
    console.log("User signed in:", userData.user.name);
    // router.replace("/home"); // Navigate to main app
  };

  if (isChecking) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plates</Text>
      <Text style={styles.subtitle}>Sign in to get started</Text>

      <GoogleSignIn onSignInSuccess={handleSignInSuccess} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#d1d4d2ff",
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 30,
  },
  subtitle: {
    fontSize: 12,
    color: "#666666ff",
  },
});

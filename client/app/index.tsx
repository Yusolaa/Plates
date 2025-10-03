// app/index.tsx (Login Screen)
import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import GoogleSignIn from "../components/GoggleSignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

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
      {/* Centered content wrapper */}
      <View style={styles.contentWrapper}>
        <Text style={styles.title}>Plates</Text>
        <Text style={styles.subtitle}>License Plate Scanner</Text>
        <GoogleSignIn onSignInSuccess={handleSignInSuccess} />
      </View>

      {/* Dev link - optional, can be removed */}
      {/* <Link style={styles.link} href="/home">
        Go to home
      </Link> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#d1d4d2ff",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 45,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
    textAlign: "center",
  },
  link: {
    fontStyle: "italic",
    color: "blue",
    textAlign: "center",
    padding: 20,
  },
});

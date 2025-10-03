import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import GoogleSignIn from "../components/GoogleSignIn";
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
        // router.replace("/home");
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleSignInSuccess = (userData: { user: { name: any } }) => {
    console.log("User signed in:", userData.user.name);
    // router.replace("/home");
  };

  if (isChecking) {
    return (
      <View className="flex-1 justify-center items-center bg-[#d1d4d2]">
        <Text className="text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#d1d4d2]">
      <View className="flex-1 justify-center items-center px-5">
        <Text className="text-5xl font-bold mb-2">Plates</Text>
        <Text className="text-base text-gray-600 mb-8 text-center">
          License Plate Scanner
        </Text>
        <GoogleSignIn onSignInSuccess={handleSignInSuccess} />
      </View>

      <Link className="text-blue-600 italic text-center p-5" href="/home">
        Go to home
      </Link>
    </View>
  );
}

import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

interface GetStartedProps {
  onGetStarted?: () => void;
}

export default function GetStarted({ onGetStarted }: GetStartedProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleGetStarted = async () => {
    setLoading(true);
    try {
      // Generate anonymous user ID
      const existingUserId = await AsyncStorage.getItem("anonymousUserId");

      if (!existingUserId) {
        const anonymousUserId = `user_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;
        await AsyncStorage.setItem("anonymousUserId", anonymousUserId);
        await AsyncStorage.setItem("firstLaunchDate", new Date().toISOString());
        console.log(" New anonymous user created:", anonymousUserId);
      } else {
        console.log("Returning user:", existingUserId);
      }

      // Mark onboarding as complete
      await AsyncStorage.setItem("hasCompletedOnboarding", "true");

      // Navigate to sign-in
      if (onGetStarted) {
        onGetStarted();
      } else {
        router.replace("/sign-in");
      }
    } catch (error) {
      console.error("Get started error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="items-center w-full absolute bottom-32">
      {loading ? (
        <ActivityIndicator size="large" color="#0a6b07" />
      ) : (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleGetStarted}
          disabled={loading}
          className="flex-row items-center justify-center bg-blue-700 p-2 rounded-md shadow-xs animate-pulse"
        >
          <Text className="text-white text-sm font-normal mr-2 font-alan">
            Get Started
          </Text>
          <FontAwesome name="arrow-right" size={12} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

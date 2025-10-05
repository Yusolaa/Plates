import { useState, useEffect } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import GetStarted from "../components/GetStarted";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export default function LoginScreen() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.5);
  const subtitleOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(50);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (!isChecking) {
      // Animate title
      titleOpacity.value = withTiming(1, { duration: 600 });
      titleScale.value = withSpring(1);

      // Animate subtitle (delayed)
      setTimeout(() => {
        subtitleOpacity.value = withTiming(1, { duration: 500 });
      }, 300);

      // Animate button (delayed)
      setTimeout(() => {
        buttonTranslateY.value = withTiming(0, { duration: 600 });
      }, 500);
    }
  }, [isChecking]);

  const checkOnboardingStatus = async () => {
    try {
      const hasCompleted = await AsyncStorage.getItem("hasCompletedOnboarding");
      if (hasCompleted === "true") {
        // User has already onboarded, go to sign-in
        router.replace("/sign-in");
      }
    } catch (error) {
      console.error("Error checking onboarding:", error);
    } finally {
      setIsChecking(false);
    }
  };

  const handleGetStarted = () => {
    console.log("User started the app");
    router.replace("/sign-in");
  };

  // Animated styles
  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
      transform: [{ scale: titleScale.value }],
    };
  });

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: subtitleOpacity.value,
    };
  });

  if (isChecking) {
    return (
      <View className="flex-1 justify-center items-center bg-[#d1d4d2]">
        <ActivityIndicator size="large" color="#0a6b07" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-wintergreen-dark justify-center">
      <View className="flex-1 justify-center items-center px-5">
        {/* Animated Title */}
        <Animated.View style={titleAnimatedStyle}>
          <Text className="text-5xl mb-2 font-lobster">Plates</Text>
        </Animated.View>

        {/* Animated Subtitle */}
        <Animated.View style={subtitleAnimatedStyle}>
          <Text className="text-base text-gray-600 mb-8 text-center font-lobster-two">
            License Plate Scanner
          </Text>
        </Animated.View>

        {/* Animated Button */}

        <GetStarted onGetStarted={handleGetStarted} />
      </View>
    </View>
  );
}

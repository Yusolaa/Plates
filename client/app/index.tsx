import { useState, useEffect } from "react";
import { View, Text } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
} from "react-native-reanimated";
import GoogleSignIn from "../components/GoogleSignIn";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";

export default function LoginScreen() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleScale = useSharedValue(0.5);
  const subtitleOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(0);

  useEffect(() => {
    checkExistingAuth();
  }, []);

  useEffect(() => {
    if (!isChecking) {
      titleOpacity.value = withTiming(1, { duration: 600 });
      titleScale.value = withSpring(1);
      setTimeout(() => {
        subtitleOpacity.value = withTiming(1, { duration: 500 });
      }, 300);

      setTimeout(() => {
        buttonTranslateY.value = withTiming(0, {
          duration: 600,
          easing: Easing.out(Easing.exp),
        });
      }, 500);
    }
  }, [isChecking]);

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
        <Text className="text-lg">Loading...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#d1d4d2]">
      <View className="flex-1 justify-center items-center px-5">
        {/* Animated Title */}
        <Animated.View style={titleAnimatedStyle}>
          <Text className="text-5xl mb-2 tracking-widest">Plates</Text>
        </Animated.View>

        {/* Animated Subtitle */}
        <Animated.View style={subtitleAnimatedStyle}>
          <Text className="text-base text-gray-600 mb-8 text-center font-lobster-two tracking-widest">
            License Plate Scanner
          </Text>
        </Animated.View>

        <GoogleSignIn onSignInSuccess={handleSignInSuccess} />
      </View>

      {/* <Link className="text-blue-600 text-center p-5" href="/home">
        Go to home
      </Link> */}
    </View>
  );
}

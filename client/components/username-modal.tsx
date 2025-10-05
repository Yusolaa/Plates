import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";

interface UsernameModalProps {
  visible: boolean;
  onComplete: (username: string) => void;
}

export default function UsernameModal({
  visible,
  onComplete,
}: UsernameModalProps) {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleContinue = async () => {
    if (!username.trim()) {
      setError("Username is required");
      return;
    }

    if (username.trim().length < 3) {
      setError("Username must be at least 3 characters");
      return;
    }

    if (username.trim().length > 10) {
      setError("Username must be less than 10 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const existingUserId = await AsyncStorage.getItem("anonymousUserId");

      if (!existingUserId) {
        const anonymousUserId = `user_${Date.now()}_${Math.random()
          .toString(36)
          .substr(2, 9)}`;

        await AsyncStorage.multiSet([
          ["anonymousUserId", anonymousUserId],
          ["username", username.trim()],
          ["firstLaunchDate", new Date().toISOString()],
          ["hasCompletedOnboarding", "true"],
        ]);

        console.log("New user created:", {
          userId: anonymousUserId,
          username: username.trim(),
        });
      } else {
        await AsyncStorage.multiSet([
          ["username", username.trim()],
          ["hasCompletedOnboarding", "true"],
        ]);

        console.log("Username updated for existing user:", username.trim());
      }

      onComplete(username.trim());
    } catch (err) {
      console.error("Error saving data:", err);
      setError("Failed to save. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    if (!loading) {
      setUsername("");
      setError("");
      router.replace("/");
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center bg-black/50 px-6">
          <View className="bg-white rounded-2xl w-full max-w-sm p-6">
            {/* Close Button - Fixed */}
            <TouchableOpacity
              onPress={closeModal}
              disabled={loading}
              className="absolute top-4 right-4 z-10"
            >
              <FontAwesome name="close" size={24} color="#888" />
            </TouchableOpacity>

            {/* Header */}
            <View className="items-center mb-6">
              <FontAwesome name="user-circle" size={48} color="#0a6b07" />
              <Text className="text-xl font-bold mt-3 font-lobster-two">
                Choose Your Username
              </Text>
              <Text className="text-sm text-gray-600 mt-1 text-center font-lobster-two">
                This will be your identity in the app
              </Text>
            </View>

            {/* Input */}
            <View className="mb-4">
              <TextInput
                className="border border-gray-300 rounded-lg px-4 py-3 text-base"
                placeholder="Enter username"
                value={username}
                onChangeText={(text) => {
                  setUsername(text);
                  setError("");
                }}
                autoCapitalize="none"
                autoCorrect={false}
                maxLength={20}
                editable={!loading}
                autoFocus
              />
              <Text className="text-xs text-gray-500 mt-1 ml-1">
                {username.length}/20 characters
              </Text>
            </View>

            {/* Error Message */}
            {error ? (
              <Text className="text-red-600 text-sm mb-3 text-center">
                {error}
              </Text>
            ) : null}

            {/* Continue Button */}
            <TouchableOpacity
              className={`py-3 rounded-lg flex-row items-center justify-center ${
                loading || !username.trim() ? "bg-gray-300" : "bg-blue-700"
              }`}
              onPress={handleContinue}
              disabled={loading || !username.trim()}
              activeOpacity={0.8}
            >
              {loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Text className="text-white font-bold text-base mr-2 font-alan">
                    Continue
                  </Text>
                  <FontAwesome name="arrow-right" size={14} color="#fff" />
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

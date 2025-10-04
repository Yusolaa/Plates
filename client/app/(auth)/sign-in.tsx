import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const signIn = () => {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleContinue = async () => {
    if (!username.trim()) {
      Alert.alert(
        "Username Required",
        "Please enter your username to continue."
      );
      return;
    }

    setLoading(true);
    try {
      await AsyncStorage.setItem("username", username.trim());
      router.replace("/home");
    } catch (error) {
      console.error("Error saving username:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="min-h-80 flex-1 justify-center p-6">
      <Text className="text-3xl font-bold text-center mb-8 text-blue-800 font-alan">
        Choose a Username
      </Text>

      <TextInput
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
        className="border border-gray-300 rounded-xl px-4 py-3 text-lg mb-6"
        autoCapitalize="none"
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleContinue}
        disabled={loading}
        className={`${
          loading ? "bg-blue-400" : "bg-blue-700"
        } py-3 rounded-xl shadow-lg`}
      >
        <Text className="text-white text-center text-lg font-semibold">
          {loading ? "Please wait..." : "Continue"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default signIn;

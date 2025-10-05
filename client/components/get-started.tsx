import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import UsernameModal from "./username-modal";

interface GetStartedProps {
  onComplete: (username: string) => void;
}

export default function GetStarted({ onComplete }: GetStartedProps) {
  const [showModal, setShowModal] = useState(false);

  const handleGetStarted = () => {
    setShowModal(true);
  };

  const handleUsernameComplete = (username: string) => {
    setShowModal(false);
    onComplete(username);
  };

  return (
    <>
      <View className="items-center w-full absolute bottom-32">
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleGetStarted}
          className="flex-row items-center justify-center bg-blue-700 p-2 rounded-md shadow-xs"
        >
          <Text className="text-white font-bold text-base mr-2 font-alan">
            Get Started
          </Text>
          <FontAwesome name="arrow-right" size={12} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Username Modal */}
      <UsernameModal visible={showModal} onComplete={handleUsernameComplete} />
    </>
  );
}

import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Scan = () => {
  return (
    <SafeAreaView className="flex-1 bg-white mb-20">
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={() => (
          <View className="px-6 pt-10">
            {/* Welcome Header */}
            <View className="mb-8">
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Scan
              </Text>
            </View>

            <View className="flex-1 items-center justify-center"></View>
            <Ionicons name="camera" size={100} color="#D1D5DB" />
            <Text className="text-lg text-gray-400 mt-4">
              Camera Screen Placeholder
            </Text>
          </View>
        )}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Scan;

import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const keyFeatures = [
  { id: "1", name: "Fast Scanning", icon: "speed", bgcolour: "#e0301e" },
  { id: "2", name: "Scan History", icon: "history", bgcolour: "#646f58" },
  { id: "3", name: "Secure Storage", icon: "lock", bgcolour: "#d0b783" },
  { id: "4", name: "Export Data", icon: "cloud-upload", bgcolour: "#204c39" },
];

const Home = () => {
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeHome();
  }, []);

  const initializeHome = async () => {
    try {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    } catch (error) {
      console.error("Error loading username:", error);
    } finally {
      setLoading(false);
    }
  };

  // Loading State
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white items-center justify-center">
        <ActivityIndicator size="large" color="#4F46E5" />
      </SafeAreaView>
    );
  }

  // First Time User / Empty State Screen
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
                Welcome, {username || "User"}!
              </Text>
              <Text className="text-base text-gray-600 leading-6">
                Let's get started by scanning your first license plate
              </Text>
            </View>

            {/* Primary Action */}
            <TouchableOpacity
              className="bg-[#8c9e75] rounded-2xl p-6 mb-8 shadow-lg"
              activeOpacity={0.8}
              onPress={() => router.push("/scan")}
            >
              <View className="flex-row items-center justify-between">
                <View className="flex-1">
                  <Text className="text-2xl font-bold text-white mb-2">
                    Scan Your First Plate
                  </Text>
                  <Text className="text-sm text-indigo-100">
                    Tap to open camera
                  </Text>
                </View>
                <View className="w-14 h-14 bg-white/20 rounded-bl-2xl rounded-tr-2xl items-center justify-center">
                  <Ionicons name="camera" size={28} color="white" />
                </View>
              </View>
            </TouchableOpacity>

            {/* How It Works */}
            <View className="bg-gray-100 p-6 mb-8 rounded-br-2xl rounded-tl-2xl">
              <Text className="font-alan-medium text-lg  text-gray-900 mb-4">
                How It Works
              </Text>

              <View className="mb-4">
                <View className="flex-row items-start ">
                  <View className="w-10 h-10 bg-[#e0301e] rounded-bl-2xl rounded-tr-2xl items-center justify-center mr-4">
                    <Text className="font-suse text-white font-bold text-base">
                      1
                    </Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-alan-medium text-base text-gray-900 mb-1">
                      Point Camera
                    </Text>
                    <Text className="font-suse text-sm text-gray-600">
                      Aim camera at the license plate
                    </Text>
                  </View>
                </View>
              </View>

              <View className="mb-4">
                <View className="flex-row items-start">
                  <View className="w-10 h-10 bg-[#646f58] rounded-bl-2xl rounded-tr-2xl items-center justify-center mr-4">
                    <Text className="text-white font-bold text-base">2</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-alan-medium text-base text-gray-900 mb-1">
                      Auto Recognition
                    </Text>
                    <Text className=" font-suse text-sm text-gray-600">
                      Read the plate number instantly
                    </Text>
                  </View>
                </View>
              </View>

              <View>
                <View className="flex-row items-start">
                  <View className="w-10 h-10 bg-[#d0b783] rounded-bl-2xl rounded-tr-2xl items-center justify-center mr-4">
                    <Text className="text-white font-bold text-base">3</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-alan-medium text-base text-gray-900 mb-1">
                      Save & Manage
                    </Text>
                    <Text className="font-suse text-sm text-gray-600">
                      Access history anytime
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Features */}
            <View className="mb-8">
              <Text className="font-alan-medium text-lg text-gray-900 mb-4">
                Key Features
              </Text>
              <View className="flex-row flex-wrap -mx-2">
                {keyFeatures.map((feature) => (
                  <View key={feature.id} className="w-1/2 px-2 mb-4">
                    <View
                      className="border border-gray-200 rounded-br-2xl rounded-tl-2xl p-4 items-center"
                      {...{
                        style: { backgroundColor: feature.bgcolour + "20" },
                      }}
                    >
                      <MaterialIcons
                        name={
                          feature.icon as React.ComponentProps<
                            typeof MaterialIcons
                          >["name"]
                        }
                        size={24}
                        color={feature.bgcolour}
                      />
                      <Text className="text-sm text-gray-900 mt-2 text-center font-alan-medium">
                        {feature.name}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>

            {/* Quick Actions */}
            <View className="mb-8">
              <Text className="font-alan-medium text-lg text-gray-900 mb-4">
                Quick Access
              </Text>
              <View className="flex-row -mx-2">
                <TouchableOpacity
                  className="flex-1 mx-2 bg-gray-50 border border-gray-200 rounded-br-2xl rounded-tl-2xl p-4 items-center"
                  activeOpacity={0.7}
                  onPress={() => router.push("/scan")}
                >
                  <MaterialIcons name="camera" size={24} color="#4F46E5" />
                  <Text className="text-sm font-alan-medium text-gray-900 mt-2">
                    Scan
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 mx-2 bg-gray-50 border border-gray-200 rounded-br-2xl rounded-tl-2xl p-4 items-center"
                  activeOpacity={0.7}
                  onPress={() => router.push("/history")}
                >
                  <MaterialIcons name="history" size={24} color="#4F46E5" />
                  <Text className="text-sm font-alan-medium text-gray-900 mt-2">
                    History
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
      <StatusBar style="dark" />
    </SafeAreaView>
  );
};

export default Home;

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
const steps = [
  {
    id: 1,
    title: "Point Camera",
    description: "Aim camera at the license plate",
    bgColor: "#e0301e",
  },
  {
    id: 2,
    title: "Auto Recognition",
    description: "Read the plate number instantly",
    bgColor: "#8fbc9b",
  },
  {
    id: 3,
    title: "Save & Manage",
    description: "Access history anytime",
    bgColor: "#204c39",
  },
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
          <View className="flex gap-10 px-6 py-10">
            {/* Welcome Header */}
            <View>
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
                <View className="w-14 h-14  border border-white rounded-bl-2xl rounded-tr-2xl items-center justify-center">
                  <Ionicons
                    name="camera"
                    size={28}
                    color="white"
                    className="animate-pulse"
                  />
                </View>
              </View>
            </TouchableOpacity>

            <View>
              {steps.map((step) => (
                <View key={step.id}>
                  <View
                    className="p-4 mb-8 rounded-2xl"
                    style={{ backgroundColor: step.bgColor + "20" }}
                  >
                    {/* Step Content */}
                    <View className="flex-1">
                      <Text className="text-base font-alan-medium text-gray-900 mb-1">
                        {step.title}
                      </Text>
                      <Text className="text-sm text-gray-600 font-suse">
                        {step.description}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Features */}
            <View>
              <Text className="font-alan-medium text-lg text-gray-900 mb-4">
                Key Features
              </Text>
              <View className="flex-row flex-wrap ">
                {keyFeatures.map((feature) => (
                  <View key={feature.id} className="w-1/2 h-1/2 px-2 mb-4 ">
                    <View
                      className="border border-gray-200 rounded-2xl p-4 items-center"
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
            <View>
              <Text className="font-alan-medium text-lg text-gray-900 mb-4">
                Quick Access
              </Text>
              <View className="flex-row -mx-2">
                <TouchableOpacity
                  className="flex-1 mx-2 bg-white shadow-md border border-wintergreen rounded-2xl rounded-tl-2xl p-4 items-center"
                  activeOpacity={0.7}
                  onPress={() => router.push("/scan")}
                >
                  <MaterialIcons
                    name="photo-camera"
                    size={24}
                    color="#204c39"
                  />
                  <Text className="text-sm font-alan-medium text-gray-900 mt-2">
                    Scan
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 mx-2 bg-white shadow-md border border-wintergreen rounded-2xl rounded-tl-2xl p-4 items-center"
                  activeOpacity={0.7}
                  onPress={() => router.push("/history")}
                >
                  <MaterialIcons name="history" size={24} color="#204c39" />
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

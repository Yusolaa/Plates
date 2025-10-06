import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const Home = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
      }
    };
    fetchUsername();
  }, []);

  const features = [
    {
      id: "1",
      title: "AI-Powered Recognition",
      description:
        "Advanced OCR technology accurately reads license plates from any angle in real-time",
      icon: "🤖",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      id: "2",
      title: "Instant Capture & Save",
      description:
        "Scan plates on the go and automatically save to your history with timestamps and location",
      icon: "📸",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      id: "3",
      title: "Secure Storage",
      description:
        "All scanned plates are encrypted and stored securely on your device with cloud backup",
      icon: "🔒",
      color: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  const capabilities = [
    {
      id: "1",
      title: "Quick Scan",
      description: "Capture plates in under 2 seconds",
      icon: "⚡",
    },
    {
      id: "2",
      title: "Batch Processing",
      description: "Scan multiple plates at once",
      icon: "📋",
    },
    {
      id: "3",
      title: "Export Data",
      description: "Export scans as CSV or PDF",
      icon: "📤",
    },
    {
      id: "4",
      title: "Search History",
      description: "Find any scanned plate instantly",
      icon: "🔍",
    },
  ];

  const stats = [
    {
      label: "Plates Scanned",
      value: "500K+",
      color: "bg-indigo-500",
      icon: "🚗",
    },
    {
      label: "Accuracy Rate",
      value: "99.8%",
      color: "bg-emerald-500",
      icon: "✓",
    },
    { label: "Active Users", value: "15K+", color: "bg-pink-500", icon: "👥" },
    { label: "Countries", value: "30+", color: "bg-amber-500", icon: "🌍" },
  ];

  const renderHeader = () => (
    <View className="px-5">
      {/* Welcome Section */}
      <View className="mt-6 mb-8">
        <Text className="text-3xl font-lobster-two-bold text-gray-800 mb-2">
          Welcome back,
        </Text>
        <Text className="text-3xl font-lobster-two-bold text-indigo-600">
          {username || "User"}!
        </Text>
        <Text className="text-base text-gray-500 mt-3 font-alan-medium">
          Your smart license plate scanner is ready to capture
        </Text>
      </View>

      {/* Quick Action Card */}
      <TouchableOpacity
        className="bg-green-gc-dark rounded-2xl p-6 mb-8 shadow-lg"
        activeOpacity={0.8}
      >
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <Text className="text-2xl text-white mb-2 font-alan-medium">
              Start Scanning
            </Text>
            <Text className="text-sm text-white font-alan">
              Tap to open camera and scan a plate
            </Text>
          </View>
          <View className="w-16 h-16 bg-white/20 rounded-bl-2xl rounded-tr-2xl items-center justify-center">
            <FontAwesome name="camera" size={28} color="#fff" />
          </View>
        </View>
      </TouchableOpacity>

      {/* Stats Grid */}
      <View className="mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Platform Stats
        </Text>
        <View className="flex-row flex-wrap -mx-2">
          {stats.map((stat, index) => (
            <View key={index} className="w-1/2 px-2 mb-4">
              <View className="bg-white rounded-br-2xl rounded-tl-2xl p-4 shadow-md">
                <View
                  className={`w-12 h-12 ${stat.color} rounded-xl items-center justify-center mb-3`}
                >
                  <Text className="text-2xl">{stat.icon}</Text>
                </View>
                <Text className="text-2xl font-bold text-gray-800">
                  {stat.value}
                </Text>
                <Text className="text-sm text-gray-500 mt-1">{stat.label}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* About Section - What the app is */}
      <View className="mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Why Choose Our Scanner
        </Text>
        {features.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            className={`${feature.color} rounded-2xl p-5 mb-4 border ${feature.borderColor}`}
            activeOpacity={0.7}
          >
            <View className="flex-row items-start">
              <View className="w-14 h-14 bg-white rounded-xl items-center justify-center mr-4 shadow-sm">
                <Text className="text-3xl">{feature.icon}</Text>
              </View>
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800 mb-1">
                  {feature.title}
                </Text>
                <Text className="text-sm text-gray-600 leading-5">
                  {feature.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Capabilities Grid - What you can do */}
      <View className="mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Key Features
        </Text>
        <View className="flex-row flex-wrap -mx-2">
          {capabilities.map((capability) => (
            <TouchableOpacity
              key={capability.id}
              className="w-1/2 px-2 mb-4"
              activeOpacity={0.7}
            >
              <View className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-5 h-40 justify-between border border-gray-200">
                <View className="w-12 h-12 bg-white rounded-xl items-center justify-center shadow-sm">
                  <Text className="text-2xl">{capability.icon}</Text>
                </View>
                <View>
                  <Text className="text-base font-bold text-gray-800 mb-1">
                    {capability.title}
                  </Text>
                  <Text className="text-xs text-gray-600 leading-4">
                    {capability.description}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Bento Grid Section - Use Cases */}
      <View className="mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Perfect For
        </Text>

        {/* First Row - Large + Small stack */}
        <View className="flex-row mb-4">
          <TouchableOpacity
            className="flex-1 mr-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl p-6 h-48 justify-end"
            activeOpacity={0.7}
          >
            <Text className="text-4xl mb-3">🅿️</Text>
            <Text className="text-xl font-bold text-white mb-1">
              Parking Management
            </Text>
            <Text className="text-sm text-violet-100">
              Track vehicles entering and exiting lots
            </Text>
          </TouchableOpacity>

          <View className="flex-1 ml-2">
            <TouchableOpacity
              className="bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 mb-4 h-[88px] justify-end"
              activeOpacity={0.7}
            >
              <Text className="text-2xl mb-1">🚓</Text>
              <Text className="text-sm font-bold text-white">
                Law Enforcement
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl p-5 h-[88px] justify-end"
              activeOpacity={0.7}
            >
              <Text className="text-2xl mb-1">🏢</Text>
              <Text className="text-sm font-bold text-white">
                Access Control
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Second Row - Small + Large */}
        <View className="flex-row">
          <TouchableOpacity
            className="w-1/3 mr-2 bg-gradient-to-br from-rose-400 to-pink-500 rounded-2xl p-5 h-36 justify-end"
            activeOpacity={0.7}
          >
            <Text className="text-3xl mb-2">🔧</Text>
            <Text className="text-sm font-bold text-white">Auto Repair</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1 ml-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl p-6 h-36 justify-end"
            activeOpacity={0.7}
          >
            <Text className="text-3xl mb-2">🚚</Text>
            <Text className="text-lg font-bold text-white mb-1">
              Fleet Management
            </Text>
            <Text className="text-xs text-cyan-100">
              Monitor company vehicles
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* How It Works Section */}
      <View className="mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          How It Works
        </Text>
        <View className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <View className="flex-row items-start mb-4">
            <View className="w-8 h-8 bg-indigo-500 rounded-full items-center justify-center mr-4">
              <Text className="text-white font-bold">1</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800 mb-1">
                Point & Capture
              </Text>
              <Text className="text-sm text-gray-600">
                Open the camera and point at any license plate
              </Text>
            </View>
          </View>

          <View className="flex-row items-start mb-4">
            <View className="w-8 h-8 bg-indigo-500 rounded-full items-center justify-center mr-4">
              <Text className="text-white font-bold">2</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800 mb-1">
                Auto Recognition
              </Text>
              <Text className="text-sm text-gray-600">
                AI instantly reads and extracts the plate number
              </Text>
            </View>
          </View>

          <View className="flex-row items-start">
            <View className="w-8 h-8 bg-indigo-500 rounded-full items-center justify-center mr-4">
              <Text className="text-white font-bold">3</Text>
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800 mb-1">
                Save & Manage
              </Text>
              <Text className="text-sm text-gray-600">
                Review, edit, and organize in your history
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Supported Formats Section */}
      <View className="mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Local support for current version
        </Text>
        <View className="bg-white rounded-2xl p-6 border border-gray-200">
          <Text className="text-base font-semibold text-gray-800 mb-3">
            Supports License Plates From:
          </Text>
          <View className="flex-row flex-wrap">
            {["Nigeria 🇳🇬"].map((country, index) => (
              <View
                key={index}
                className="bg-gray-50 rounded-lg px-3 py-2 mr-2 mb-2"
              >
                <Text className="text-sm text-gray-700">{country}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View className="mb-8">
        <View className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8">
          <Text className="text-2xl font-bold text-white mb-2">
            Ready to scan?
          </Text>
          <Text className="text-base text-indigo-100 mb-6">
            Start capturing license plates with professional accuracy
          </Text>
          <TouchableOpacity
            className="bg-white rounded-xl py-4 items-center"
            activeOpacity={0.8}
          >
            <Link href="/scan" className="text-base font-bold text-indigo-600">
              Open Scanner
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Links */}
      <View className="mb-8">
        <Text className="text-xl font-bold text-gray-800 mb-4">
          Quick Access
        </Text>
        <View className="flex-row justify-between">
          {["View History", "Settings", "Help"].map((link, index) => (
            <TouchableOpacity
              key={index}
              className="flex-1 mx-1 bg-gray-50 rounded-xl py-4 items-center border border-gray-200"
              activeOpacity={0.7}
            >
              <Text className="text-sm font-semibold text-gray-700">
                {link}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Footer Info */}
      <View className="mb-12 items-center">
        <Text className="text-xs text-gray-400 mb-2">
          PlateScanner Pro v1.0.0
        </Text>
        <Text className="text-xs text-gray-400">
          Powered by advanced OCR technology
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default Home;

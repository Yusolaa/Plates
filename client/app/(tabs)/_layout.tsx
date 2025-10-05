import React from "react";
import { View, TouchableOpacity } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
// import { BlurView } from "expo-blur";

const TabsLayout = () => {
  const router = useRouter();

  return (
    <View className="flex-1 bg-black">
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#000",
            borderTopWidth: 0,
            height: 80,
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            borderTopLeftRadius: 35,
            borderTopRightRadius: 35,
            elevation: 20,
          },
        }}
      >
        {/* LEFT TAB */}
        <Tabs.Screen
          name="home"
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <FontAwesome
                  name="th-large"
                  size={24}
                  color={focused ? "#ffb800" : "#aaaaaa"}
                />
              </View>
            ),
          }}
        />

        {/* PLACEHOLDER CENTER TAB */}
        <Tabs.Screen
          name="scan"
          options={{
            tabBarButton: () => (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => router.push("/scan")}
                className="absolute -top-8 bg-black rounded-full p-4 shadow-lg"
                style={{
                  alignSelf: "center",
                  elevation: 10,
                }}
              >
                <View className="bg-[#1a1a1a] rounded-full p-5 border border-gray-700">
                  <FontAwesome name="qrcode" size={26} color="#ffffff" />
                </View>
              </TouchableOpacity>
            ),
          }}
        />

        {/* RIGHT TAB */}
        <Tabs.Screen
          name="history"
          options={{
            tabBarIcon: ({ focused }) => (
              <View className="items-center justify-center">
                <FontAwesome
                  name="history"
                  size={24}
                  color={focused ? "#ffb800" : "#aaaaaa"}
                />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
};

export default TabsLayout;

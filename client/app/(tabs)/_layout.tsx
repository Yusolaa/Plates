import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";

const TabsLayout = () => {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          marginRight: 20,
          marginLeft: 20,
          height: 70,
          borderRadius: 20,
          backgroundColor: "rgba(26, 26, 26, 0.95)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.1)",
          paddingBottom: 0,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          elevation: 10,
        },
      }}
    >
      {/* HOME TAB */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeDot} />}
              <FontAwesome
                name="home"
                size={24}
                color={focused ? "#ffffff" : "#8c9e75"}
              />
            </View>
          ),
        }}
      />

      {/* SCAN TAB */}
      <Tabs.Screen
        name="scan"
        options={{
          tabBarButton: () => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => router.push("/scan")}
              style={styles.centerButton}
            >
              <View style={styles.scanButton}>
                <FontAwesome
                  name="camera"
                  size={26}
                  className="text-green-gc"
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />

      {/* HISTORY TAB */}
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.iconContainer}>
              {focused && <View style={styles.activeDot} />}
              <FontAwesome
                name="history"
                size={24}
                color={focused ? "#ffffff" : "#8c9e75"}
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  activeDot: {
    position: "absolute",
    transform: [{ translateY: 10 }],
    bottom: -10,
    width: 20,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
  },
  centerButton: {
    top: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  scanButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 10px rgba(5, 5, 0, 0.3)",
    elevation: 10,
  },
});

export default TabsLayout;

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const UserLayout = () => {
  return (
    <View>
      <Stack>
        <Stack.Screen
          name="sign-in"
          options={{ headerShown: false, animation: "slide_from_right" }}
        />
      </Stack>
    </View>
  );
};

export default UserLayout;

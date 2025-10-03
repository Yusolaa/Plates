import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import { TouchableOpacity, View, Text, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthSessionResult } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

interface GoogleSignInProps {
  onSignInSuccess?: (data: { token: string; user: any }) => void;
}

export default function GoogleSignIn({ onSignInSuccess }: GoogleSignInProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "ANDROID_CLIENT_ID.apps.googleusercontent.com",
    webClientId: "WEB_CLIENT_ID.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleSignInResponse(response);
  }, [response]);

  const handleSignInResponse = async (resp: AuthSessionResult | null) => {
    if (resp?.type === "success" && resp.authentication?.idToken) {
      setLoading(true);
      setError(null);

      try {
        const backendResponse = await fetch(
          "http://BACKEND_IP:5000/api/auth/google",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ idToken: resp.authentication.idToken }),
          }
        );

        const data = await backendResponse.json();

        if (data.success && data.data) {
          await AsyncStorage.setItem("userToken", data.data.token);
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(data.data.user)
          );
          console.log("Sign in successful:", data.data.user.name);
          if (onSignInSuccess) onSignInSuccess(data.data);
        } else {
          setError(data.message || "Authentication failed");
        }
      } catch (err) {
        console.error("Sign in error:", err);
        setError("Failed to connect to server");
      } finally {
        setLoading(false);
      }
    } else if (resp?.type === "error") {
      setError("Google Sign-In failed");
    }
  };

  const handleSignIn = () => {
    setError(null);
    promptAsync();
  };

  return (
    <View className="items-center w-full">
      {error && (
        <Text className="text-red-600 text-center mb-4 px-5">{error}</Text>
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#0a6b07" />
      ) : (
        <TouchableOpacity
          className={`py-3.5 px-8 rounded-full w-70 shadow-lg ${
            !request || loading ? "bg-blue-300" : "bg-[#0a6b07b7]"
          }`}
          onPress={handleSignIn}
          disabled={!request || loading}
        >
          <Text className="text-white text-center font-bold text-base">
            Sign in with Google
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

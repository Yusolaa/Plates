// components/GoogleSignIn.tsx
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
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
    // iosClientId: "IOS_CLIENT_ID.apps.googleusercontent.com",
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
          "http://YOUR_BACKEND_IP:5000/api/auth/google",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              idToken: resp.authentication.idToken,
            }),
          }
        );

        const data: {
          success: boolean;
          message?: string;
          data?: { token: string; user: any };
        } = await backendResponse.json();

        if (data.success && data.data) {
          await AsyncStorage.setItem("userToken", data.data.token);
          await AsyncStorage.setItem(
            "userData",
            JSON.stringify(data.data.user)
          );

          console.log("✅ Sign in successful:", data.data.user.name);

          if (onSignInSuccess) {
            onSignInSuccess(data.data);
          }
        } else {
          setError(data.message || "Authentication failed");
        }
      } catch (err) {
        console.error("❌ Sign in error:", err);
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
    <View style={styles.container}>
      {error && <Text style={styles.errorText}>{error}</Text>}

      {loading ? (
        <ActivityIndicator size="large" color="#0a6b07b7" />
      ) : (
        <TouchableOpacity
          style={[
            styles.button,
            (!request || loading) && styles.buttonDisabled,
          ]}
          onPress={handleSignIn}
          disabled={!request || loading}
        >
          <Text style={styles.buttonText}>Sign in with Google</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    position: "fixed",
    bottom: 120,
    width: "100%",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#0a6b07b7",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 40,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonDisabled: {
    backgroundColor: "#A0C3FF",
    elevation: 0,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
});

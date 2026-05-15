import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signIn } from "../services/AuthService";
import { TacticalInput } from "../components/TacticalInput";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      await signIn(email, password);
      console.log("--- ACCESS GRANTED: OPERATOR LEVEL ---");
      // Navigarea se va face automat prin RootLayout (onAuthStateChange)
    } catch (error: any) {
      console.log("--- ACCESS DENIED: " + error.message + " ---");
      Alert.alert("ACCESS DENIED", error.message);
    }
  };

  return (
    <View className="flex-1 bg-[#0e0e0e] px-8 justify-center">
      <View className="items-center mb-12">
        <View className="border-2 border-[#00e639] w-14 h-14 items-center justify-center mb-4">
          <Text className="text-[#00e639] font-bold">CS2</Text>
        </View>
        <Text className="text-white font-bold tracking-[4px] text-[12px]">
          TACTICAL COMMAND CENTER
        </Text>
        <Text className="text-white opacity-50 font-bold text-[9px] mt-1">
          AUTHENTICATION REQUIRED
        </Text>
      </View>

      <TacticalInput
        label="OPERATOR ID"
        value={email}
        onChangeText={setEmail}
        placeholder="name@command.int"
      />
      <TacticalInput
        label="ACCESS KEY"
        value={password}
        onChangeText={setPassword}
        placeholder="••••••••"
        secureTextEntry
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-[#00e639] py-4 items-center mt-6"
      >
        <Text className="text-black font-bold tracking-[2px] text-[12px]">
          INITIALIZE CONNECTION
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => router.push("/register")}
        className="mt-8 items-center"
      >
        <Text className="text-[#00e639] font-bold text-[10px]">
          NEW OPERATOR? ESTABLISH REGISTRY
        </Text>
      </TouchableOpacity>
    </View>
  );
}

import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { signUp } from "../services/AuthService";
import { TacticalInput } from "../components/TacticalInput";

export default function RegisterScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // Apelăm serviciul care face push în Supabase Auth și Profiles
      await signUp(email, password, fullName);

      Alert.alert(
        "REGISTRY COMPLETE",
        "Operator profile established. System access keys initialized.",
        [{ text: "PROCEED TO LOGIN", onPress: () => router.replace("/login") }]
      );
    } catch (error: any) {
      console.log("--- REGISTRY ERROR: " + error.message + " ---");
      Alert.alert("REGISTRY FAILED", error.message);
    }
  };

  return (
    <ScrollView className="flex-1 bg-[#0e0e0e]">
      <View className="px-8 pt-20 pb-10">
        <View className="items-center mb-10">
          <Text className="text-white font-bold tracking-[3px] text-[18px] uppercase">
            Establish Registry
          </Text>
          <Text className="text-white opacity-50 text-[10px] mt-2 font-bold tracking-[1px]">
            SECURE ENROLLMENT PROTOCOL // V.2.0.26
          </Text>
        </View>

        <View className="space-y-2">
          <TacticalInput
            label="Full Name"
            value={fullName}
            onChangeText={setFullName}
            placeholder="OPERATOR NAME"
          />

          <TacticalInput
            label="Assigned Email"
            value={email}
            onChangeText={setEmail}
            placeholder="EMAIL@COMMAND.INT"
          />

          <TacticalInput
            label="Security Key"
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity
          onPress={handleRegister}
          className="bg-[#00e639] py-4 items-center mt-10"
        >
          <Text className="text-black font-bold tracking-[2px] text-[12px]">
            CREATE OPERATOR ACCOUNT
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.back()}
          className="mt-8 items-center"
        >
          <Text className="text-gray-500 font-bold text-[10px] tracking-[1px]">
            ABORT AND RETURN TO LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

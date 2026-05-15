import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { updatePassword, signOut } from "../../services/AuthService";
import { useRouter } from "expo-router";

export default function SettingsView() {
  const [password, setPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdatePassword = async () => {
    if (!password || password.length < 6) {
      Alert.alert("INVALID INPUT", "Password must be at least 6 characters.");
      return;
    }
    
    setIsUpdating(true);
    try {
      await updatePassword(password);
      Alert.alert("SUCCESS", "Operator access key updated successfully.");
      setPassword("");
    } catch (error: any) {
      Alert.alert("UPDATE FAILED", error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace("/login");
    } catch (error: any) {
      Alert.alert("TERMINATION FAILED", error.message);
    }
  };

  return (
    <View className="flex-1 bg-[#111111]">
      {/* HEADER */}
      <View className="pt-14 pb-4 px-4 flex-row items-center justify-between border-b border-white/5 bg-black/50">
        <View className="flex-row items-center">
          <Ionicons name="terminal-outline" size={16} color="#00e639" />
          <Text className="ml-2 text-[#00e639] font-bold text-[10px] tracking-[2px] uppercase">
            Situation Report // Overview
          </Text>
        </View>
        <Ionicons name="radio-outline" size={16} color="#00e639" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="p-4">
        {/* MAIN TITLE */}
        <View className="flex-row items-baseline mb-8 mt-4">
          <Text className="text-[#00e639] font-bold text-[10px] tracking-[2px] mr-4">
            SEC_LVL_04
          </Text>
          <Text className="text-white font-black text-3xl leading-tight uppercase flex-1 tracking-widest">
            System{"\n"}Configuration
          </Text>
        </View>

        {/* SECTION: COMM-LINK PROTOCOL (Password) */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Ionicons name="git-network-outline" size={16} color="#00e639" />
            <Text className="ml-2 text-gray-400 font-bold text-[11px] tracking-[2px] uppercase">
              Security Protocol
            </Text>
          </View>
          
          <View className="bg-[#161616] p-4 border-l-2 border-[#00e639]">
            <Text className="text-gray-500 font-bold text-[9px] mb-2 uppercase tracking-widest">
              Operator Access Key
            </Text>
            <View className="flex-row items-center bg-[#0a0a0a] border border-white/10 px-3 py-3 mb-3">
              <TextInput
                className="flex-1 text-white font-mono text-[12px] h-full"
                placeholder="Enter new access key..."
                placeholderTextColor="#555"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity onPress={handleUpdatePassword} disabled={isUpdating}>
                {isUpdating ? (
                  <ActivityIndicator size="small" color="#00e639" />
                ) : (
                  <Ionicons name="checkmark-circle-outline" size={18} color="#00e639" />
                )}
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              onPress={handleUpdatePassword} 
              disabled={isUpdating}
              className="bg-[#00e639] py-2 items-center mb-3"
            >
              <Text className="text-black font-bold text-[10px] tracking-[2px] uppercase">
                {isUpdating ? "UPDATING..." : "CONFIRM NEW KEY"}
              </Text>
            </TouchableOpacity>
            <Text className="text-[#666] italic text-[10px]">
              Update primary channel key for mission-critical access.
            </Text>
          </View>
        </View>

        {/* SECTION: DEPLOYMENT REGION */}
        <View className="mb-8">
          <View className="flex-row items-center mb-4">
            <Ionicons name="globe-outline" size={16} color="#eab308" />
            <Text className="ml-2 text-gray-400 font-bold text-[11px] tracking-[2px] uppercase">
              Deployment Region
            </Text>
          </View>
          
          <View className="bg-[#161616] p-4 border-l-2 border-[#eab308]">
            <Text className="text-gray-500 font-bold text-[9px] mb-2 uppercase tracking-widest">
              Active Trading Sector
            </Text>
            <TouchableOpacity className="flex-row items-center justify-between bg-[#0a0a0a] border border-white/10 px-3 py-3 mb-4">
              <Text className="text-white font-bold text-[12px] tracking-widest">
                EUROPE - CORE SECTOR
              </Text>
              <Ionicons name="pulse-outline" size={16} color="#eab308" />
            </TouchableOpacity>

            <View className="flex-row justify-between">
              <View className="bg-[#202020] flex-1 py-3 items-center mr-2">
                <Text className="text-gray-500 font-bold text-[8px] uppercase tracking-widest mb-1">
                  Latency
                </Text>
                <Text className="text-[#00e639] font-bold text-[11px]">14ms</Text>
              </View>
              <View className="bg-[#202020] flex-1 py-3 items-center mx-1">
                <Text className="text-gray-500 font-bold text-[8px] uppercase tracking-widest mb-1">
                  Uptime
                </Text>
                <Text className="text-[#00e639] font-bold text-[11px]">99.98%</Text>
              </View>
              <View className="bg-[#202020] flex-1 py-3 items-center ml-2">
                <Text className="text-gray-500 font-bold text-[8px] uppercase tracking-widest mb-1">
                  Nodes
                </Text>
                <Text className="text-white font-bold text-[11px]">128</Text>
              </View>
            </View>
          </View>
        </View>

        {/* SECTION: SYSTEM MAINTENANCE */}
        <View className="mb-10">
          <View className="flex-row items-center mb-4">
            <Ionicons name="construct-outline" size={16} color="#ef4444" />
            <Text className="ml-2 text-gray-400 font-bold text-[11px] tracking-[2px] uppercase">
              System Maintenance
            </Text>
          </View>
          
          <View className="bg-[#161616] border-l-2 border-[#ef4444]">
            {/* WIPE CACHE */}
            <View className="p-4 border-b border-white/5">
              <Text className="text-white font-bold text-[11px] tracking-widest mb-1">
                LOCAL STORAGE INTEGRITY
              </Text>
              <Text className="text-gray-500 text-[10px] mb-4 leading-relaxed">
                Purge all session logs, temporary caches, and local telemetry data.
              </Text>
              <TouchableOpacity className="bg-[#202020] py-3 items-center">
                <Text className="text-[#eab308] font-bold text-[10px] tracking-[2px] uppercase">
                  Wipe Local Cache
                </Text>
              </TouchableOpacity>
            </View>

            {/* TERMINATION */}
            <View className="p-4">
              <Text className="text-[#ef4444] font-bold text-[11px] tracking-widest mb-1">
                CRITICAL TERMINATION
              </Text>
              <Text className="text-gray-500 text-[10px] mb-4 leading-relaxed">
                Sever current operator link and encrypt local terminal access.
              </Text>
              <TouchableOpacity 
                className="bg-[#ff6b6b] py-3 items-center"
                onPress={handleSignOut}
              >
                <Text className="text-black font-black text-[10px] tracking-[2px] uppercase">
                  Disconnect Operator
                </Text>
              </TouchableOpacity>
            </View>

            {/* FIRMWARE */}
            <View className="px-4 pb-4 flex-row justify-between items-center mt-2">
              <Text className="text-gray-600 font-mono text-[9px] uppercase tracking-widest">
                Firmware: V4.2.0-STABLE
              </Text>
              <Text className="text-[#00e639] font-mono text-[9px] tracking-widest">
                SYNCED
              </Text>
            </View>
          </View>
        </View>

        {/* FOOTER */}
        <View className="flex-row justify-center items-center pb-8 mt-4">
          <Text className="text-gray-600 font-mono text-[9px] tracking-[3px] uppercase mr-2">
            Local Data Persistence Active
          </Text>
          <View className="w-1.5 h-1.5 rounded-full bg-[#00e639]" />
        </View>
        
      </ScrollView>
    </View>
  );
}

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { db } from "../../services/Database";
import { Ionicons } from "@expo/vector-icons";

export default function AssetSpecificationsView() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [asset, setAsset] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        // Fix pentru eroarea de tip: ne asigurăm că id-ul este string
        const cleanId = Array.isArray(id) ? id[0] : id;
        const result = await db.getFirstAsync(
          "SELECT * FROM weapons WHERE id = ?",
          [cleanId]
        );
        setAsset(result);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchAsset();
  }, [id]);

  if (loading)
    return (
      <View className="flex-1 bg-[#0e0e0e] items-center justify-center">
        <ActivityIndicator color="#00e639" />
      </View>
    );

  if (!asset)
    return (
      <View className="flex-1 bg-[#0e0e0e] items-center justify-center">
        <Text className="text-white">ASSET NOT FOUND</Text>
      </View>
    );

  return (
    <View className="flex-1 bg-[#0e0e0e]">
      {/* Top Bar - Back Navigation */}
      <View className="pt-14 pb-4 px-4 flex-row items-center border-b border-white/5">
        <TouchableOpacity onPress={() => router.back()} className="mr-4">
          <Ionicons name="chevron-back" size={24} color="#00e639" />
        </TouchableOpacity>
        <Text className="text-[#00e639] font-bold text-[10px] tracking-[2px] uppercase">
          Asset Intelligence // {asset.id}
        </Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Visual Identifier - Replica "Scope" din Swift */}
        <View className="h-80 bg-white/[0.02] items-center justify-center relative">
          <View className="absolute opacity-[0.03]">
            <Ionicons name="scan-outline" size={250} color="white" />
          </View>
          <Image
            source={{ uri: asset.imageURL }}
            className="w-64 h-64"
            resizeMode="contain"
            style={{
              shadowColor: asset.rarityColor,
              shadowRadius: 25,
              shadowOpacity: 0.4,
              shadowOffset: { width: 0, height: 0 },
            }}
          />
        </View>

        <View className="p-6">
          <Text className="text-gray-500 font-bold text-[10px] tracking-widest uppercase mb-1">
            Technical Data
          </Text>
          <Text className="text-white text-3xl font-bold uppercase mb-8 tracking-tighter">
            {asset.name}
          </Text>

          {/* Spec Rows - Replica struct SpecRow din Swift */}
          <SpecRow
            label="RARITY"
            value={asset.rarity.toUpperCase()}
            color={asset.rarityColor}
          />
          <SpecRow label="COLLECTION" value={asset.collection.toUpperCase()} />
          <SpecRow label="FLOAT VALUE" value={asset.floatValue.toFixed(10)} />
          <SpecRow label="PRICE" value={`$${asset.price.toFixed(2)}`} isLast />

          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                "REPORT GENERATED",
                `Technical specifications for ${asset.name} exported.`
              )
            }
            activeOpacity={0.8}
            className="bg-[#00e639] py-5 mt-10 items-center rounded-sm"
          >
            <Text className="text-black font-black tracking-widest text-[12px]">
              GENERATE REPORT
            </Text>
          </TouchableOpacity>
        </View>
        <View className="h-20" />
      </ScrollView>
    </View>
  );
}

const SpecRow = ({ label, value, color, isLast }: any) => (
  <View
    className={`flex-row justify-between p-4 bg-[#131313] ${
      !isLast ? "mb-[1px]" : ""
    }`}
  >
    <Text className="text-gray-500 font-bold text-[9px] tracking-wider">
      {label}
    </Text>
    <Text
      className="font-mono text-[11px] font-bold"
      style={{ color: color || "white" }}
    >
      {value}
    </Text>
  </View>
);

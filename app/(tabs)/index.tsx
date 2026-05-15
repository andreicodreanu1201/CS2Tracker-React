import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { useSkins } from "../../hooks/useSkin";
import { db } from "../../services/Database";
import { Ionicons } from "@expo/vector-icons";

export default function MainDashboard() {
  const { isSyncing } = useSkins();
  const router = useRouter();
  const [assets, setAssets] = useState<any[]>([]);

  const fetchLocalData = async () => {
    const result = await db.getAllAsync(
      "SELECT * FROM weapons ORDER BY RANDOM()"
    );
    setAssets(result);
  };

  useEffect(() => {
    fetchLocalData();
  }, [isSyncing]);

  const handleAlertPress = (searchTerm: string, fallbackIndex: number) => {
    let asset = assets.find((a) =>
      a.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (!asset && assets.length > fallbackIndex) {
      asset = assets[fallbackIndex];
    }
    if (asset) {
      router.push(`/details/${asset.id}` as any);
    }
  };

  const totalMarketValue = assets.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <View className="flex-1 bg-[#0e0e0e]">
      {/* --- TOP APP BAR --- */}
      <View className="flex-row items-center px-4 py-5 bg-black/50 pt-14">
        <View className="flex-row items-center space-x-2">
          <Ionicons name="terminal" size={18} color="#00e639" />
          <Text className="text-[#00e639] font-bold text-[14px] tracking-tight">
            SITUATION REPORT // OVERVIEW
          </Text>
        </View>
        <View className="flex-1" />
        <Ionicons name="radio-outline" size={18} color="#00e639" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="py-5">
          {/* --- SUMMARY SECTION --- */}
          <View className="flex-row px-2">
            <StatCard
              label="TOTAL ITEMS"
              value={`${assets.length}`}
              trend="+12 THIS WEEK"
              trendColor="#00e639"
            />
            <StatCard
              label="MARKET VALUE"
              value={`$${totalMarketValue.toFixed(2)}`}
              trend="LIVE FEED ACTIVE"
              trendColor="#ffd709"
            />
            <StatCard
              label="REGION"
              value="EUROPE - CORE"
              trend="3 ACTION REQ"
              trendColor="#ff7162"
            />
          </View>

          {/* --- PRIORITY ASSET SECTION --- */}
          <View className="px-4 mt-6">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-500 font-bold text-[10px]">
                PRIORITY ASSET // ITEM OF THE DAY
              </Text>
              <Text className="text-[#00e639] font-bold text-[10px]">
                ID: 8842-PX-01
              </Text>
            </View>

            <View className="overflow-hidden">
              <View className="h-[250px] bg-white/5 items-center justify-center">
                {assets[0] ? (
                  <Image
                    source={{ uri: assets[0].imageURL }}
                    className="w-56 h-56"
                    resizeMode="contain"
                  />
                ) : (
                  <Ionicons name="shield" size={48} color="#484848" />
                )}
              </View>

              <View className="p-5 bg-[#131313]">
                <Text className="text-white font-bold text-[22px] uppercase mb-2">
                  {assets[0]?.name || "INITIALIZING..."}
                </Text>

                <Text className="text-[#00e639] font-bold text-[10px] tracking-[2px] mb-4 uppercase">
                  COVERT RIFLE
                </Text>

                <View className="h-[1px] bg-white/10 mb-5" />

                <TouchableOpacity
                  onPress={() => {
                    if (assets[0]) {
                      router.push(`/details/${assets[0].id}` as any);
                    }
                  }}
                  activeOpacity={0.8}
                  className="bg-[#00e639] py-4 items-center"
                >
                  <Text className="text-black font-bold text-[11px] uppercase">
                    VIEW IN DATABASE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* --- MARKET ALERTS SECTION --- */}
          <View className="px-4 mt-8">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-500 font-bold text-[10px]">
                MARKET ALERTS
              </Text>
              <Ionicons
                name="refresh"
                size={14}
                color="#00e639"
                style={{
                  transform: [{ rotate: isSyncing ? "180deg" : "0deg" }],
                }}
              />
            </View>

            <View className="space-y-[1px]">
              {assets.slice(1, 4).map((asset) => (
                <AlertRow
                  key={asset.id}
                  name={asset.name}
                  desc={asset.collection || "Unknown Collection"}
                  change={`$${asset.price.toFixed(2)}`}
                  color={asset.rarityColor || "#00e639"}
                  onPress={() => router.push(`/details/${asset.id}` as any)}
                />
              ))}
            </View>
          </View>

          {/* --- SYSTEM FOOTER --- */}
          <View className="mt-8 px-5 py-4 bg-black/30">
            <View className="flex-row items-center mb-1">
              <View className="w-1.5 h-1.5 rounded-full bg-[#00e639] mr-2" />
              <Text className="text-[#00e639] font-bold text-[10px]">
                SYSTEM STATUS: NOMINAL
              </Text>
            </View>
            <Text className="text-gray-500 font-mono text-[8px] uppercase">
              {isSyncing
                ? "> SYNCHRONIZING ASSET DATABASE... [ACTIVE]"
                : "> SYNCHRONIZING ASSET DATABASE... [COMPLETE]"}
            </Text>
          </View>

          <View className="h-10" />
        </View>
      </ScrollView>
    </View>
  );
}

// Sub-componente identice cu versiunea Swift
const AlertRow = ({ name, desc, change, color, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.8}
    className="flex-row items-center p-4 bg-[#131313]"
  >
    <View className="w-[3px] h-8 mr-4" style={{ backgroundColor: color }} />
    <View className="flex-1">
      <Text className="text-white font-bold text-[11px]">{name}</Text>
      <Text className="text-gray-500 text-[9px]">{desc}</Text>
    </View>
    <Text className="font-bold text-[11px]" style={{ color }}>
      {change}
    </Text>
  </TouchableOpacity>
);

const StatCard = ({ label, value, trend, trendColor }: any) => (
  <View
    className="flex-1 bg-[#131313] p-4 mx-1 border-l-2"
    style={{ borderLeftColor: trendColor }}
  >
    <Text className="text-gray-500 font-bold text-[8px] mb-1">{label}</Text>
    <Text className="text-white font-bold text-[18px] mb-1">{value}</Text>
    <Text className="font-bold text-[8px]" style={{ color: trendColor }}>
      {trend}
    </Text>
  </View>
);

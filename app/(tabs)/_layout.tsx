import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: "#0e0e0e", borderTopColor: "#484848" },
        tabBarActiveTintColor: "#00e639",
        tabBarInactiveTintColor: "#acabaa",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "DASHBOARD",
          tabBarIcon: ({ color }) => (
            <Ionicons name="stats-chart" size={20} color={color} />
          ),
        }}
      />
      {/* Aici vom adăuga Skins și Settings ulterior */}
    </Tabs>
  );
}

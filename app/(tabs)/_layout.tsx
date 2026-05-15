import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        // Replica accentColor verde și fundal negru din Swift
        tabBarStyle: {
          backgroundColor: "#000000",
          borderTopColor: "#1a1a1a",
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: "#00e639",
        tabBarInactiveTintColor: "#acabaa",
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: 1,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "DASHBOARD",
          tabBarIcon: ({ color }) => (
            <Ionicons name="terminal" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="database"
        options={{
          title: "DATABASE",
          tabBarIcon: ({ color }) => (
            <Ionicons name="layers" size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "SETTINGS",
          tabBarIcon: ({ color }) => (
            <Ionicons name="settings" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

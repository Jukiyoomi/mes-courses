import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lists/index"
        options={{
          title: "Mes Listes",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list" : "list-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lists/new"
        options={{
          title: "Nouvelle Liste",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "folder" : "folder-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lists/details/[id]/index"
        options={{
          title: "Une Liste",
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lists/index"
        options={{
          title: "Mes Listes",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "list" : "list-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lists/new"
        options={{
          title: "Nouvelle Liste",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "folder" : "folder-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="lists/[id]"
        options={{
          lazy: true,
          title: "Une Liste",
          tabBarButton: () => null,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "folder" : "folder-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}

import React from "react";
import { View, Text, Image, Platform } from "react-native";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";
import { images } from "@/constants/images";

export default function TabLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const insets = useSafeAreaInsets();
  const bottomPadding =
    Platform.OS === "ios"
      ? Math.max(insets.bottom, 12)
      : Math.max(insets.bottom, 10);
  const tabHeight = 62 + bottomPadding;

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "#F0EFEA",
          borderTopWidth: 1,
          height: tabHeight,
          paddingTop: 8,
          paddingBottom: bottomPadding,
          elevation: 8,
          shadowColor: "#0D132B",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.04,
          shadowRadius: 6,
        },
      }}
    >
      {/* 1. Trang chủ (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={24}
              color={focused ? "#FEB11F" : "#0D132B"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <View className="items-center justify-center">
              <Text
                style={{
                  fontFamily: focused ? "FZPoppins-Bold" : "FZPoppins-Medium",
                  fontSize: 11,
                  color: focused ? "#FEB11F" : "#0D132B",
                  marginTop: 2,
                }}
                numberOfLines={1}
              >
                Trang chủ
              </Text>
              <View style={{ height: 3, marginTop: 3 }}>
                {focused && (
                  <View
                    style={{
                      width: 32,
                      height: 3,
                      backgroundColor: "#FEB11F",
                      borderRadius: 2,
                    }}
                  />
                )}
              </View>
            </View>
          ),
        }}
      />

      {/* 2. Khám phá (Explore) */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Khám phá",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "search" : "search-outline"}
              size={24}
              color={focused ? "#FEB11F" : "#0D132B"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <View className="items-center justify-center">
              <Text
                style={{
                  fontFamily: focused ? "FZPoppins-Bold" : "FZPoppins-Medium",
                  fontSize: 11,
                  color: focused ? "#FEB11F" : "#0D132B",
                  marginTop: 2,
                }}
                numberOfLines={1}
              >
                Khám phá
              </Text>
              <View style={{ height: 3, marginTop: 3 }}>
                {focused && (
                  <View
                    style={{
                      width: 32,
                      height: 3,
                      backgroundColor: "#FEB11F",
                      borderRadius: 2,
                    }}
                  />
                )}
              </View>
            </View>
          ),
        }}
      />

      {/* 3. Tủ lạnh (Fridge) */}
      <Tabs.Screen
        name="fridge"
        options={{
          title: "Tủ lạnh",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "fridge" : "fridge-outline"}
              size={24}
              color={focused ? "#FEB11F" : "#0D132B"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <View className="items-center justify-center">
              <Text
                style={{
                  fontFamily: focused ? "FZPoppins-Bold" : "FZPoppins-Medium",
                  fontSize: 11,
                  color: focused ? "#FEB11F" : "#0D132B",
                  marginTop: 2,
                }}
                numberOfLines={1}
              >
                Tủ lạnh
              </Text>
              <View style={{ height: 3, marginTop: 3 }}>
                {focused && (
                  <View
                    style={{
                      width: 32,
                      height: 3,
                      backgroundColor: "#FEB11F",
                      borderRadius: 2,
                    }}
                  />
                )}
              </View>
            </View>
          ),
        }}
      />

      {/* 4. Thực đơn (Meal Plan) */}
      <Tabs.Screen
        name="meal-plan"
        options={{
          title: "Thực đơn",
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "calendar-heart" : "calendar-heart-outline"}
              size={24}
              color={focused ? "#FEB11F" : "#0D132B"}
            />
          ),
          tabBarLabel: ({ focused }) => (
            <View className="items-center justify-center">
              <Text
                style={{
                  fontFamily: focused ? "FZPoppins-Bold" : "FZPoppins-Medium",
                  fontSize: 11,
                  color: focused ? "#FEB11F" : "#0D132B",
                  marginTop: 2,
                }}
                numberOfLines={1}
              >
                Thực đơn
              </Text>
              <View style={{ height: 3, marginTop: 3 }}>
                {focused && (
                  <View
                    style={{
                      width: 32,
                      height: 3,
                      backgroundColor: "#FEB11F",
                      borderRadius: 2,
                    }}
                  />
                )}
              </View>
            </View>
          ),
        }}
      />

      {/* 5. Cá nhân (Profile) */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Cá nhân",
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                width: 28,
                height: 28,
                borderRadius: 14,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
                borderWidth: focused ? 2 : 0,
                borderColor: "#FEB11F",
              }}
            >
              <Image
                source={images.tabChick}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <View className="items-center justify-center">
              <Text
                style={{
                  fontFamily: focused ? "FZPoppins-Bold" : "FZPoppins-Medium",
                  fontSize: 11,
                  color: focused ? "#FEB11F" : "#0D132B",
                  marginTop: 2,
                }}
                numberOfLines={1}
              >
                Cá nhân
              </Text>
              <View style={{ height: 3, marginTop: 3 }}>
                {focused && (
                  <View
                    style={{
                      width: 32,
                      height: 3,
                      backgroundColor: "#FEB11F",
                      borderRadius: 2,
                    }}
                  />
                )}
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

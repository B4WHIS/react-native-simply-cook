import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Redirect, Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useAuth } from "@clerk/expo";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
} from "react-native-reanimated";
import { images } from "@/constants/images";

type TabsTabBarProps = Parameters<
  NonNullable<React.ComponentProps<typeof Tabs>["tabBar"]>
>[0];

const INDICATOR_WIDTH = 32;

/**
 * Animated icon wrapper providing a spring scale bounce micro-interaction on tap/focus
 */
function AnimatedTabIcon({
  focused,
  children,
}: {
  focused: boolean;
  children: React.ReactNode;
}) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      scale.value = withSequence(
        withSpring(1.2, { damping: 10, stiffness: 350 }),
        withSpring(1.0, { damping: 14, stiffness: 220 })
      );
    } else {
      scale.value = withSpring(1.0, { damping: 14, stiffness: 220 });
    }
  }, [focused, scale]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      className="w-[30px] h-7 items-center justify-center"
      style={animatedStyle}
    >
      {children}
    </Animated.View>
  );
}

/**
 * Custom Tab Bar with smoothly sliding indicator line using Reanimated
 */
function CustomTabBar({
  state,
  descriptors,
  emitter,
  navigateToTab,
  bottomPadding,
  tabHeight,
}: TabsTabBarProps & { bottomPadding: number; tabHeight: number }) {
  const windowWidth = Dimensions.get("window").width;
  const [barWidth, setBarWidth] = useState(windowWidth);

  const getTargetX = (index: number, width: number) => {
    const tabWidth = width / 5;
    return tabWidth * index + (tabWidth - INDICATOR_WIDTH) / 2;
  };

  const indicatorTranslateX = useSharedValue(
    getTargetX(state.index, windowWidth)
  );

  useEffect(() => {
    const target = getTargetX(state.index, barWidth);
    indicatorTranslateX.value = withSpring(target, {
      damping: 22,
      stiffness: 220,
      mass: 0.8,
    });
  }, [state.index, barWidth, indicatorTranslateX]);

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: indicatorTranslateX.value }],
  }));

  const renderIcon = (routeName: string, focused: boolean) => {
    switch (routeName) {
      case "index":
        return (
          <Ionicons
            name={focused ? "home" : "home-outline"}
            size={24}
            color={focused ? "#FEB11F" : "#0D132B"}
          />
        );
      case "explore":
        return (
          <Ionicons
            name={focused ? "search" : "search-outline"}
            size={24}
            color={focused ? "#FEB11F" : "#0D132B"}
          />
        );
      case "fridge":
        return (
          <MaterialCommunityIcons
            name={focused ? "fridge" : "fridge-outline"}
            size={24}
            color={focused ? "#FEB11F" : "#0D132B"}
          />
        );
      case "meal-plan":
        return (
          <MaterialCommunityIcons
            name={focused ? "calendar-heart" : "calendar-heart-outline"}
            size={24}
            color={focused ? "#FEB11F" : "#0D132B"}
          />
        );
      case "profile":
        return (
          <View
            className={`w-7 h-7 rounded-full overflow-hidden items-center justify-center ${
              focused ? "border-2 border-[#FEB11F]" : ""
            }`}
          >
            <Image
              source={images.tabChick}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        );
      default:
        return null;
    }
  };

  const getLabel = (routeName: string) => {
    switch (routeName) {
      case "index":
        return "Trang chủ";
      case "explore":
        return "Khám phá";
      case "fridge":
        return "Tủ lạnh";
      case "meal-plan":
        return "Thực đơn";
      case "profile":
        return "Cá nhân";
      default:
        return routeName;
    }
  };

  return (
    <View
      onLayout={(e) => setBarWidth(e.nativeEvent.layout.width)}
      className="flex-row bg-white border-t border-[#F0EFEA] pt-2 relative"
      style={{
        height: tabHeight,
        paddingBottom: bottomPadding,
        elevation: 8,
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.04,
        shadowRadius: 6,
      }}
    >
      {/* 2. Animated Sliding Active Indicator */}
      <Animated.View
        className="absolute left-0 w-8 h-[3px] bg-[#FEB11F] rounded-[2px] z-10"
        style={[
          {
            bottom: bottomPadding + 3,
          },
          indicatorStyle,
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = getLabel(route.name);

        const onPress = () => {
          const event = emitter.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigateToTab(route.key);
          }
        };

        const onLongPress = () => {
          emitter.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            activeOpacity={0.7}
            className="flex-1 items-center justify-start"
          >
            {/* 3. Micro-interaction: Spring scale on tap/focus */}
            <AnimatedTabIcon focused={isFocused}>
              {renderIcon(route.name, isFocused)}
            </AnimatedTabIcon>

            <Text
              className={`text-[11px] mt-0.5 ${
                isFocused ? "font-bold text-[#FEB11F]" : "font-medium text-ink"
              }`}
              numberOfLines={1}
            >
              {label}
            </Text>

            {/* Spacer to guarantee height alignment matching indicator */}
            <View className="h-[3px] mt-[3px]" />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

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
      tabBar={(props) => (
        <CustomTabBar
          {...props}
          bottomPadding={bottomPadding}
          tabHeight={tabHeight}
        />
      )}
      screenOptions={{
        headerShown: false,
        // 1. Screen Transition: Smooth cross-fade animation between tabs
        animation: "fade",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Trang chủ",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Khám phá",
        }}
      />
      <Tabs.Screen
        name="fridge"
        options={{
          title: "Tủ lạnh",
        }}
      />
      <Tabs.Screen
        name="meal-plan"
        options={{
          title: "Thực đơn",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Cá nhân",
        }}
      />
    </Tabs>
  );
}

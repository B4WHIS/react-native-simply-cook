import React, { useEffect, useRef, useState } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, Redirect } from "expo-router";
import { useUser, useClerk, useAuth } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants/images";
import { colors } from "@/constants/theme";
import { useFavoritesStore } from "@/store/useFavoritesStore";

const PRIMARY_COLORS = [
  { name: "LINGUA GREEN", hex: "#B7E8A0", bgClass: "bg-green" },
  { name: "LINGUA YELLOW", hex: "#FFE69B", bgClass: "bg-yellow" },
  { name: "LINGUA ORANGE", hex: "#FFB873", bgClass: "bg-orange" },
  { name: "LINGUA CREAM", hex: "#FFF6E6", bgClass: "bg-cream", border: true },
];

const SEMANTIC_COLORS = [
  { name: "SUCCESS", hex: "#21C16B", bgClass: "bg-success" },
  { name: "WARNING", hex: "#FFC800", bgClass: "bg-warning" },
  { name: "STREAK", hex: "#FF8A00", bgClass: "bg-streak" },
  { name: "ERROR", hex: "#FF4D4F", bgClass: "bg-error" },
  { name: "INFO", hex: "#4D8BFF", bgClass: "bg-info" },
];

const NEUTRAL_COLORS = [
  { name: "TEXT / PRIMARY", hex: "#0D132B", bgClass: "bg-ink" },
  { name: "TEXT / SECONDARY", hex: "#6B7280", bgClass: "bg-muted" },
  { name: "BORDER", hex: "#E5E7EB", bgClass: "bg-border" },
  { name: "SURFACE", hex: "#F6F7FB", bgClass: "bg-surface" },
  { name: "BACKGROUND", hex: "#FFFFFF", bgClass: "bg-background", border: true },
];

const TYPE_SCALE = [
  {
    level: "H1",
    name: "Page / Screen Title",
    size: "32px",
    weight: "Bold",
    lineHeight: "1.2",
    styleClass: "h1",
  },
  {
    level: "H2",
    name: "Section Title",
    size: "24px",
    weight: "SemiBold",
    lineHeight: "1.3",
    styleClass: "h2",
  },
  {
    level: "H3",
    name: "Card / Module Title",
    size: "20px",
    weight: "SemiBold",
    lineHeight: "1.3",
    styleClass: "h3",
  },
  {
    level: "H4",
    name: "Subheading",
    size: "16px",
    weight: "Medium",
    lineHeight: "1.4",
    styleClass: "h4",
  },
  {
    level: "Body Large",
    name: "Important content",
    size: "16px",
    weight: "Regular",
    lineHeight: "1.6",
    styleClass: "body-large",
  },
  {
    level: "Body Medium",
    name: "Body text",
    size: "14px",
    weight: "Regular",
    lineHeight: "1.6",
    styleClass: "body-medium",
  },
  {
    level: "Body Small",
    name: "Supporting text",
    size: "13px",
    weight: "Regular",
    lineHeight: "1.6",
    styleClass: "body-small",
  },
  {
    level: "Caption",
    name: "Labels, meta text",
    size: "11px",
    weight: "Regular",
    lineHeight: "1.4",
    styleClass: "caption",
  },
];

export default function DesignSystemScreen() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  const favoriteRecipeIds = useFavoritesStore((state) => state.favoriteRecipeIds);
  const clearFavorites = useFavoritesStore((state) => state.clearFavorites);

  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const feedbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (feedbackTimerRef.current) {
        clearTimeout(feedbackTimerRef.current);
      }
    };
  }, []);

  const handleClearFavorites = () => {
    clearFavorites();
    setFeedbackMessage("Đã xóa toàn bộ favorites trong AsyncStorage!");
    if (feedbackTimerRef.current) {
      clearTimeout(feedbackTimerRef.current);
    }
    feedbackTimerRef.current = setTimeout(() => {
      setFeedbackMessage(null);
      feedbackTimerRef.current = null;
    }, 2500);
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/(tabs)");
    }
  };

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Back bar */}
        <View className="mb-4 flex-row items-center justify-between">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleBack}
            className="w-10 h-10 rounded-full bg-white border border-border items-center justify-center shadow-xs"
          >
            <Ionicons name="arrow-back" size={20} color="#0D132B" />
          </TouchableOpacity>
          <View className="flex-row items-center gap-2">
            <View className="h-9 px-3 bg-green rounded-full flex-row items-center justify-center">
              <Text className="caption font-semibold text-ink">SDK 57 • NativeWind</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => signOut()}
              className="h-9 px-3 bg-white border border-border rounded-full flex-row items-center justify-center shadow-xs"
            >
              <Text className="caption font-semibold text-error">Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Header */}
        <View className="mb-6">
          <Text className="caption font-medium uppercase tracking-widest text-muted">
            Dev / Design System
          </Text>
          <Text className="h1 text-ink mt-1">Simply Cook</Text>
        </View>

        {/* Feedback message banner if any */}
        {feedbackMessage ? (
          <View className="bg-[#E8F8EE] border border-success/40 rounded-2xl p-3 mb-4 flex-row items-center">
            <Ionicons name="checkmark-circle" size={18} color="#21C16B" />
            <Text className="text-xs font-semibold text-success ml-2 flex-1">
              {feedbackMessage}
            </Text>
          </View>
        ) : null}

        {/* User Profile Card */}
        <View className="bg-white rounded-3xl p-4 mb-4 shadow-sm border border-border flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-10 h-10 rounded-full bg-[#FFE69B] items-center justify-center mr-3">
              <Text className="font-bold text-ink">
                {(user?.firstName?.[0] || user?.primaryEmailAddress?.emailAddress?.[0] || "U").toUpperCase()}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-sm text-ink" numberOfLines={1}>
                {user?.fullName || "Người dùng"}
              </Text>
              <Text className="caption text-muted" numberOfLines={1}>
                {user?.primaryEmailAddress?.emailAddress || "Đã xác thực"}
              </Text>
            </View>
          </View>
          <View className="px-2.5 py-1 rounded-full bg-[#E8F8EE] border border-success/30">
            <Text className="caption font-bold text-success">Online</Text>
          </View>
        </View>

        {/* PERSISTED FAVORITES STORE MONITOR */}
        <View className="bg-white rounded-3xl p-5 mb-4 shadow-sm border border-border">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Ionicons name="heart" size={20} color="#FF4D4F" />
              <Text className="font-bold text-sm text-ink">Zustand Favorites Store</Text>
            </View>
            <View className="px-2 py-0.5 rounded-full bg-cream border border-orange/40">
              <Text className="caption font-bold text-orange text-[10px]">Persisted</Text>
            </View>
          </View>

          <Text className="text-xs text-muted mb-2 font-medium">
            Danh sách Recipe IDs đã bookmark:
          </Text>

          <View className="bg-surface rounded-2xl p-3 mb-3 border border-border/60">
            {favoriteRecipeIds.length > 0 ? (
              <View className="flex-row flex-wrap gap-1.5">
                {favoriteRecipeIds.map((id) => (
                  <View key={id} className="bg-white px-2.5 py-1 rounded-full border border-border shadow-xs">
                    <Text className="caption font-medium text-ink">{id}</Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text className="caption text-muted italic">Chưa có công thức nào được lưu</Text>
            )}
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleClearFavorites}
            className="self-start px-3 py-1.5 bg-error/10 border border-error/30 rounded-full flex-row items-center gap-1.5"
          >
            <Ionicons name="trash-outline" size={14} color="#FF4D4F" />
            <Text className="caption font-semibold text-error">Clear Favorites</Text>
          </TouchableOpacity>
        </View>

        {/* 1. BRAND SECTION */}
        <View className="bg-background rounded-3xl p-6 mb-6 shadow-sm border border-border">
          <Text className="caption font-bold uppercase tracking-wider text-muted mb-4">
            Brand
          </Text>
          <View className="flex-row items-center space-x-4">
            <Image
              source={images.logo}
              className="w-20 h-20"
              resizeMode="contain"
            />
            <View className="ml-4">
              <Text className="h1 text-ink tracking-tight">lingua</Text>
              <Text className="body-small text-muted mt-0.5">Simply Cook Mobile App</Text>
            </View>
          </View>
        </View>

        {/* 2. COLORS SECTION */}
        <View className="bg-background rounded-3xl p-6 mb-6 shadow-sm border border-border">
          <Text className="caption font-bold uppercase tracking-wider text-muted mb-4">
            Colors
          </Text>

          {/* Primary */}
          <Text className="caption font-semibold uppercase tracking-wider text-muted mb-3">
            Primary
          </Text>
          <View className="flex-row flex-wrap justify-between mb-5">
            {PRIMARY_COLORS.map((item) => (
              <View key={item.hex} className="w-[48%] mb-3">
                <View
                  className={`h-16 rounded-2xl ${item.bgClass} ${
                    item.border ? "border border-border" : ""
                  }`}
                />
                <Text className="caption font-bold text-ink mt-2">
                  {item.name}
                </Text>
                <Text className="caption text-muted">{item.hex}</Text>
              </View>
            ))}
          </View>

          {/* Semantic */}
          <Text className="caption font-semibold uppercase tracking-wider text-muted mb-3">
            Semantic
          </Text>
          <View className="flex-row flex-wrap justify-between mb-5">
            {SEMANTIC_COLORS.map((item) => (
              <View key={item.name} className="w-[30%] mb-3">
                <View className={`h-14 rounded-2xl ${item.bgClass}`} />
                <Text className="caption font-bold text-ink mt-2">
                  {item.name}
                </Text>
                <Text className="caption text-muted">{item.hex}</Text>
              </View>
            ))}
          </View>

          {/* Neutrals */}
          <Text className="caption font-semibold uppercase tracking-wider text-muted mb-3">
            Neutrals
          </Text>
          <View className="flex-row flex-wrap justify-between">
            {NEUTRAL_COLORS.map((item) => (
              <View key={item.name} className="w-[48%] mb-3">
                <View
                  className={`h-14 rounded-2xl ${item.bgClass} ${
                    item.border ? "border border-border" : ""
                  }`}
                />
                <Text className="caption font-bold text-ink mt-2">
                  {item.name}
                </Text>
                <Text className="caption text-muted">{item.hex}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* 3. TYPOGRAPHY SECTION */}
        <View className="bg-background rounded-3xl p-6 mb-6 shadow-sm border border-border">
          <Text className="caption font-bold uppercase tracking-wider text-muted mb-2">
            Typography
          </Text>
          <Text className="caption font-medium uppercase tracking-wider text-muted">
            Font Family
          </Text>
          <Text className="h1 text-ink mt-1 mb-2">FZ Poppins</Text>
          <Text className="body-medium text-muted mb-6">
            FZ Poppins is a modern, geometric sans-serif typeface with full Vietnamese diacritics support that provides excellent readability and an appetizing, friendly personality.
          </Text>

          {/* Type Scale Specimen List */}
          <View className="border-t border-border pt-4">
            {TYPE_SCALE.map((token, idx) => (
              <View
                key={token.level}
                className={`py-4 ${
                  idx < TYPE_SCALE.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <View className="flex-row items-baseline justify-between mb-1">
                  <Text className={`${token.styleClass} text-ink flex-1 mr-2`}>
                    {token.level}
                  </Text>
                  <Text className="caption text-muted text-right">
                    {token.size} • {token.weight} • {token.lineHeight}
                  </Text>
                </View>
                <Text className="body-small text-muted">{token.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

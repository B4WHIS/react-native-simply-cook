import { ScrollView, Text, View, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useAuth, useUser, useClerk } from "@clerk/expo";
import OnboardingScreen from "./onboarding";
import { images } from "@/constants/images";
import { colors } from "@/constants/theme";

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

export default function Index() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { signOut } = useClerk();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <OnboardingScreen />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.surface }}>
      <ScrollView
        contentContainerStyle={{ padding: 20, paddingBottom: 48 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6 flex-row items-center justify-between">
          <View>
            <Text className="caption font-medium uppercase tracking-widest text-muted">
              Design System Spec
            </Text>
            <Text className="h1 text-ink mt-1">Simply Cook</Text>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="h-10 px-3 bg-green rounded-full flex-row items-center justify-center">
              <Text className="caption font-semibold text-ink">SDK 57 • NativeWind</Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => signOut()}
              className="h-10 px-3 bg-white border border-border rounded-full flex-row items-center justify-center shadow-xs"
            >
              <Text className="caption font-semibold text-error">Đăng xuất</Text>
            </TouchableOpacity>
          </View>
        </View>

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

        {/* ONBOARDING SCREEN NAVIGATION LINK */}
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => router.push("/onboarding")}
          className="bg-cream rounded-3xl p-5 mb-3 shadow-sm border border-[#FFB873]/50 flex-row items-center justify-between"
        >
          <View className="flex-row items-center flex-1 mr-3">
            <View className="w-12 h-12 rounded-2xl bg-[#FFE69B] items-center justify-center mr-3 border border-[#FFB873]/30 overflow-hidden">
              <Image
                source={images.onboardingHero}
                style={{ width: 36, height: 36 }}
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="h4 text-ink">Onboarding Screen</Text>
              </View>
              <Text className="body-small text-muted mt-0.5">
                Nấu ngon mỗi ngày • Welcome flow
              </Text>
            </View>
          </View>
          <View className="h-10 px-4 rounded-full bg-[#FEB11F] items-center justify-center shadow-sm">
            <Text className="caption font-bold text-white">Open →</Text>
          </View>
        </TouchableOpacity>

        {/* AUTH SCREENS NAVIGATION LINKS */}
        <View className="flex-row items-center justify-between mb-6 space-x-3">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/(auth)/sign-up")}
            className="flex-1 bg-white rounded-3xl p-4 mr-1.5 shadow-sm border border-border flex-row items-center justify-between"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-2xl bg-[#FFE69B]/40 items-center justify-center mr-2.5 overflow-hidden">
                <Image
                  source={images.authChick}
                  style={{ width: 28, height: 28 }}
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <View className="items-start">
                  <Text className="font-bold text-sm text-ink">Sign Up</Text>
                  <View className="mt-1 px-1.5 py-0.2 rounded-full bg-orange">
                    <Text className="caption font-bold text-[10px] text-ink">NEW</Text>
                  </View>
                </View>
                <Text className="caption text-muted">Tạo tài khoản</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() => router.push("/(auth)/sign-in")}
            className="flex-1 bg-white rounded-3xl p-4 ml-1.5 shadow-sm border border-border flex-row items-center justify-between"
          >
            <View className="flex-row items-center flex-1">
              <View className="w-10 h-10 rounded-2xl bg-[#FFE69B]/40 items-center justify-center mr-2.5 overflow-hidden">
                <Image
                  source={images.authChick}
                  style={{ width: 28, height: 28 }}
                  resizeMode="contain"
                />
              </View>
              <View className="flex-1">
                <View className="items-start">
                  <Text className="font-bold text-sm text-ink">Sign In</Text>
                  <View className="mt-1 px-1.5 py-0.2 rounded-full bg-orange">
                    <Text className="caption font-bold text-[10px] text-ink">NEW</Text>
                  </View>
                </View>
                <Text className="caption text-muted">Chào mừng trở lại</Text>
              </View>
            </View>
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

import { OnboardingBackground } from "@/components/OnboardingBackground";
import { images } from "@/constants/images";
import { Feather } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@clerk/expo";

export default function OnboardingScreen() {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  if (isLoaded && isSignedIn) {
    return <Redirect href="/" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDF8" }} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <OnboardingBackground />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: 12,
          paddingBottom: 24,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Header: Logo + App Name */}
        <View className="flex-row items-center justify-center">
          <View className="w-11 h-11 rounded-full overflow-hidden bg-[#FFF9EE] mr-2.5 border border-[#FFE69B] items-center justify-center">
            <Image
              source={images.logo}
              style={{ width: 34, height: 34 }}
              resizeMode="contain"
              accessibilityLabel="Simply Cook logo"
            />
          </View>
          <Text className="font-bold text-xl text-ink tracking-tight">
            Simply Cook
          </Text>
        </View>

        {/* Center Group: Headline, Subtitle & Hero Illustration */}
        <View className="w-full items-center justify-center my-auto py-2">
          {/* Text Section */}
          <View className="w-full items-center px-2 max-w-[360px] mb-6">
            <Text
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
              style={{ fontSize: 34, lineHeight: 52, paddingTop: 8, paddingBottom: 4 }}
              className="font-bold text-center tracking-tight"
            >
              <Text className="text-ink">Nấu ngon </Text>
              <Text className="text-[#D97706]">mỗi ngày</Text>
            </Text>

            <Text className="font-regular text-sm leading-5 text-muted text-center mt-2 px-2">
              {"Công thức đơn giản, tận dụng tủ lạnh,\nbiến mỗi bữa ăn thành niềm vui trọn vẹn."}
            </Text>
          </View>

          {/* Hero Illustration (Safe adaptive height) */}
          <View className="w-full max-w-[340px] items-center justify-center">
            <Image
              source={images.onboardingHero}
              style={{ width: "100%", height: 260 }}
              resizeMode="contain"
              accessibilityElementsHidden={true}
              importantForAccessibility="no"
            />
          </View>
        </View>

        {/* Bottom Section: Primary CTA + Secondary Link */}
        <View className="w-full max-w-[360px] px-2 items-center">
          {/* Primary Action Button: High contrast dark text on warm amber background */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Bắt đầu ngay"
            onPress={() => router.push("/(auth)/sign-up")}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.9 : 1,
                transform: [{ scale: pressed ? 0.985 : 1 }],
              },
            ]}
            className="w-full h-14 rounded-full bg-[#FEB11F] flex-row items-center justify-center shadow-md shadow-amber-500/25"
          >
            <Text className="font-bold text-base text-ink mr-2">
              Bắt đầu ngay
            </Text>
            <Feather name="arrow-right" size={20} color="#0D132B" />
          </Pressable>

          {/* Secondary Action: Returning users entry point */}
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Đăng nhập tài khoản"
            onPress={() => router.push("/(auth)/sign-in")}
            hitSlop={{ top: 10, bottom: 10, left: 16, right: 16 }}
            className="mt-3.5 py-2 px-4"
          >
            <Text className="text-sm font-medium text-muted">
              Đã có tài khoản?{" "}
              <Text className="font-bold text-[#D97706] underline">Đăng nhập</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

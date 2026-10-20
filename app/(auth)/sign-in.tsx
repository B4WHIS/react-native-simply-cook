import { AuthBackground } from "@/components/AuthBackground";
import { AuthTextField } from "@/components/AuthTextField";
import { SocialAuthButtons } from "@/components/SocialAuthButtons";
import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { useKeyboardVisible } from "@/hooks/useKeyboardVisible";
import { validateEmail, validatePassword } from "@/lib/authValidation";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useRef, useState } from "react";
import { Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ModalPurpose = "signIn" | "reset";

export default function SignInScreen() {
  const router = useRouter();
  const isKeyboardVisible = useKeyboardVisible();
  const passwordInputRef = useRef<TextInput>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalPurpose, setModalPurpose] = useState<ModalPurpose>("signIn");

  const validate = () => {
    const nextEmailError = validateEmail(email, "Vui lòng nhập địa chỉ email", "Email không đúng định dạng (ví dụ: ban@email.com)");
    const nextPasswordError = validatePassword(password, "Vui lòng nhập mật khẩu", "Mật khẩu phải có ít nhất 6 ký tự");
    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    return !nextEmailError && !nextPasswordError;
  };

  const handleSubmit = () => {
    Keyboard.dismiss();
    if (validate()) { setModalPurpose("signIn"); setShowModal(true); }
  };

  const handleForgotPassword = () => {
    const error = validateEmail(email, "Vui lòng nhập email để nhận mã đặt lại mật khẩu", "Email không đúng định dạng");
    setEmailError(error);
    if (!error) { setModalPurpose("reset"); setShowModal(true); }
  };

  const handleSocialAuth = (provider: string) => {
    if (!email) setEmail(`demo.${provider.toLowerCase()}@example.com`);
    setModalPurpose("signIn");
    setShowModal(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDF8" }} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <AuthBackground />
      <View className="w-full flex-row items-center justify-start px-6 pt-2 z-10">
        <Pressable accessibilityRole="button" accessibilityLabel="Quay lại" hitSlop={10} onPress={() => router.back()} className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] items-center justify-center shadow-xs"><Feather name="chevron-left" size={24} color="#0D132B" /></Pressable>
      </View>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, paddingTop: 4, paddingBottom: 24 }} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" bounces={false}>
            <View className="w-full items-center"><Image source={images.authChick} style={{ width: isKeyboardVisible ? 140 : 240, height: isKeyboardVisible ? 95 : 180 }} resizeMode="contain" accessibilityElementsHidden importantForAccessibility="no" /><Text className="font-bold text-3xl text-ink text-center tracking-tight mt-1" style={{ lineHeight: 38, paddingTop: 2 }}>Chào mừng bạn <Text className="text-[#D97706]">trở lại</Text></Text></View>
            <View className="w-full max-w-[400px] my-auto py-3">
              <AuthTextField label="Địa chỉ email" value={email} onChangeText={(text) => { setEmail(text); setEmailError(""); }} onFocus={() => setEmailFocused(true)} onBlur={() => setEmailFocused(false)} focused={emailFocused} placeholder="ban@example.com" accessibilityLabel="Địa chỉ email" icon="mail" error={emailError} onClear={() => { setEmail(""); setEmailError(""); }} keyboardType="email-address" autoComplete="email" textContentType="emailAddress" returnKeyType="next" onSubmitEditing={() => passwordInputRef.current?.focus()} />
              <AuthTextField ref={passwordInputRef} label="Mật khẩu" value={password} onChangeText={(text) => { setPassword(text); setPasswordError(""); }} onFocus={() => setPasswordFocused(true)} onBlur={() => setPasswordFocused(false)} focused={passwordFocused} placeholder="Mật khẩu của bạn" accessibilityLabel="Mật khẩu" icon="lock" error={passwordError} secureTextEntry={!showPassword} showPassword={showPassword} onTogglePassword={() => setShowPassword((value) => !value)} autoComplete="password" textContentType="password" returnKeyType="done" onSubmitEditing={handleSubmit} />
              <View className="w-full flex-row items-center justify-between mb-4 px-2"><Pressable onPress={() => setRememberMe((value) => !value)} hitSlop={8} accessibilityRole="checkbox" accessibilityState={{ checked: rememberMe }} accessibilityLabel="Ghi nhớ đăng nhập" className="flex-row items-center"><View className={`w-4 h-4 rounded items-center justify-center mr-2 border ${rememberMe ? "bg-[#D97706] border-[#D97706]" : "bg-white border-[#D1D5DB]"}`}>{rememberMe && <Feather name="check" size={12} color="#FFFFFF" />}</View><Text className="text-xs font-medium text-muted">Ghi nhớ đăng nhập</Text></Pressable><Pressable onPress={handleForgotPassword} hitSlop={8} accessibilityRole="button" accessibilityLabel="Quên mật khẩu?"><Text className="text-xs font-semibold text-[#D97706]">Quên mật khẩu?</Text></Pressable></View>
              <Pressable accessibilityRole="button" accessibilityLabel="Đăng nhập" onPress={handleSubmit} className="w-full h-14 rounded-full bg-[#FEB11F] flex-row items-center justify-center shadow-md shadow-amber-500/25 active:bg-[#F5A510]"><Text className="font-bold text-base text-ink mr-2">Đăng nhập</Text><Feather name="arrow-right" size={20} color="#0D132B" /></Pressable>
              <View className="w-full flex-row items-center my-5"><View className="flex-1 h-[1px] bg-[#E5E7EB]" /><Text className="font-medium text-xs text-muted px-4">Hoặc đăng nhập với</Text><View className="flex-1 h-[1px] bg-[#E5E7EB]" /></View>
              <SocialAuthButtons actionLabel="Đăng nhập" onProvider={handleSocialAuth} />
            </View>
            <View className="flex-row items-center justify-center pt-2"><Text className="font-regular text-sm text-muted">Chưa có tài khoản? </Text><Pressable accessibilityRole="button" accessibilityLabel="Chuyển sang trang đăng ký" hitSlop={8} onPress={() => router.replace("/(auth)/sign-up")}><Text className="font-bold text-sm text-[#D97706] underline">Đăng ký</Text></Pressable></View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <VerificationModal visible={showModal} email={email} onClose={() => setShowModal(false)} onSuccess={() => { setShowModal(false); if (modalPurpose === "reset") { router.replace({ pathname: "/(auth)/sign-in", params: { step: "password-reset" } }); return; } router.replace("/"); }} />
    </SafeAreaView>
  );
}

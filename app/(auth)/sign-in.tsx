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
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignIn, useSSO } from "@clerk/expo";

type ModalPurpose = "signIn" | "reset";

export default function SignInScreen() {
  const router = useRouter();
  const { signIn, errors, fetchStatus } = useSignIn();
  const { startSSOFlow } = useSSO();
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
    const nextEmailError = validateEmail(
      email,
      "Vui lòng nhập địa chỉ email",
      "Email không đúng định dạng (ví dụ: ban@email.com)"
    );
    const nextPasswordError = validatePassword(
      password,
      "Vui lòng nhập mật khẩu",
      "Mật khẩu phải có ít nhất 6 ký tự"
    );
    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    return !nextEmailError && !nextPasswordError;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validate()) return;
    if (fetchStatus === "fetching") return;

    const { error } = await signIn.password({
      emailAddress: email.trim(),
      password,
    });

    if (error) {
      const msg = error.longMessage || error.message || "Email hoặc mật khẩu không chính xác";
      if (
        error.code === "form_identifier_not_found" ||
        errors?.fields?.identifier
      ) {
        setEmailError(
          error.code === "form_identifier_not_found"
            ? "Không tìm thấy tài khoản với email này"
            : errors?.fields?.identifier?.message || msg
        );
      } else if (
        error.code === "form_password_incorrect" ||
        errors?.fields?.password
      ) {
        setPasswordError(
          error.code === "form_password_incorrect"
            ? "Mật khẩu không chính xác"
            : errors?.fields?.password?.message || msg
        );
      } else {
        setPasswordError(msg);
      }
      return;
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => router.replace("/"),
      });
      router.replace("/");
      return;
    }

    if (
      signIn.status === "needs_first_factor" ||
      signIn.status === "needs_second_factor" ||
      signIn.status === "needs_client_trust"
    ) {
      if (
        signIn.status === "needs_second_factor" ||
        signIn.status === "needs_client_trust"
      ) {
        const emailFactor = signIn.supportedSecondFactors?.find(
          (f) => f.strategy === "email_code"
        );
        if (emailFactor) {
          await signIn.mfa.sendEmailCode();
          setModalPurpose("signIn");
          setShowModal(true);
          return;
        }
      } else {
        const emailFactor = signIn.supportedFirstFactors?.find(
          (f) => f.strategy === "email_code"
        );
        if (emailFactor) {
          await signIn.emailCode.sendCode();
          setModalPurpose("signIn");
          setShowModal(true);
          return;
        }
      }
    }
  };

  const handleForgotPassword = async () => {
    const error = validateEmail(
      email,
      "Vui lòng nhập email để nhận mã đặt lại mật khẩu",
      "Email không đúng định dạng"
    );
    setEmailError(error);
    if (error) return;

    // Create identifier in signIn context if needed
    await signIn.create({ identifier: email.trim() });
    const { error: resetError } =
      await signIn.resetPasswordEmailCode.sendCode();
    if (resetError) {
      setEmailError(
        resetError.longMessage ||
          resetError.message ||
          "Không thể gửi mã đặt lại mật khẩu"
      );
      return;
    }
    setModalPurpose("reset");
    setShowModal(true);
  };

  const handleVerify = async (code: string) => {
    if (modalPurpose === "reset") {
      const { error } = await signIn.resetPasswordEmailCode.verifyCode({
        code,
      });
      if (error) {
        return {
          error:
            error.longMessage ||
            error.message ||
            "Mã xác thực không hợp lệ. Vui lòng thử lại.",
        };
      }
      return;
    }

    let verifyError: string | undefined;
    if (
      signIn.status === "needs_second_factor" ||
      signIn.status === "needs_client_trust"
    ) {
      const { error } = await signIn.mfa.verifyEmailCode({ code });
      if (error) {
        verifyError = error.longMessage || error.message;
      }
    } else {
      const { error } = await signIn.emailCode.verifyCode({ code });
      if (error) {
        verifyError = error.longMessage || error.message;
      }
    }

    if (verifyError) {
      return {
        error: verifyError || "Mã xác thực không hợp lệ. Vui lòng thử lại.",
      };
    }

    if (signIn.status === "complete") {
      await signIn.finalize({
        navigate: () => router.replace("/"),
      });
      router.replace("/");
    }
  };

  const handleResend = async () => {
    if (modalPurpose === "reset") {
      const { error } = await signIn.resetPasswordEmailCode.sendCode();
      if (error) {
        return {
          error:
            error.longMessage || error.message || "Không thể gửi lại mã xác thực",
        };
      }
      return;
    }

    if (
      signIn.status === "needs_second_factor" ||
      signIn.status === "needs_client_trust"
    ) {
      const { error } = await signIn.mfa.sendEmailCode();
      if (error) {
        return {
          error:
            error.longMessage || error.message || "Không thể gửi lại mã xác thực",
        };
      }
    } else {
      const { error } = await signIn.emailCode.sendCode();
      if (error) {
        return {
          error:
            error.longMessage || error.message || "Không thể gửi lại mã xác thực",
        };
      }
    }
  };

  const handleSocialAuth = async (provider: string) => {
    if (provider === "Google") {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy: "oauth_google",
        });
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.replace("/");
        }
      } catch (err: any) {
        console.error("Google sign-in error:", err);
      }
    } else if (provider === "Apple") {
      try {
        const { createdSessionId, setActive } = await startSSOFlow({
          strategy: "oauth_apple",
        });
        if (createdSessionId && setActive) {
          await setActive({ session: createdSessionId });
          router.replace("/");
        }
      } catch (err: any) {
        console.error("Apple sign-in error:", err);
        setEmailError("Đăng nhập bằng Apple chưa khả dụng");
      }
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFDF8" }}
      edges={["top", "bottom"]}
    >
      <StatusBar style="dark" />
      <AuthBackground />
      <View className="w-full flex-row items-center justify-start px-6 pt-2 z-10">
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Quay lại"
          hitSlop={10}
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white border border-[#E5E7EB] items-center justify-center shadow-xs"
        >
          <Feather name="chevron-left" size={24} color="#0D132B" />
        </Pressable>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              justifyContent: "space-between",
              alignItems: "center",
              paddingHorizontal: 24,
              paddingTop: 4,
              paddingBottom: 24,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            bounces={false}
          >
            <View className="w-full items-center">
              <Image
                source={images.authChick}
                className={
                  isKeyboardVisible ? "w-[140px] h-[95px]" : "w-[240px] h-[180px]"
                }
                resizeMode="contain"
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
              <Text className="font-bold text-3xl text-ink text-center tracking-tight mt-1 leading-[38px] pt-0.5">
                Chào mừng bạn <Text className="text-[#D97706]">trở lại</Text>
              </Text>
            </View>
            <View className="w-full max-w-[400px] my-auto py-3">
              <AuthTextField
                label="Địa chỉ email"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailError("");
                }}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                focused={emailFocused}
                placeholder="ban@example.com"
                accessibilityLabel="Địa chỉ email"
                icon="mail"
                error={emailError}
                onClear={() => {
                  setEmail("");
                  setEmailError("");
                }}
                keyboardType="email-address"
                autoComplete="email"
                textContentType="emailAddress"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current?.focus()}
              />
              <AuthTextField
                ref={passwordInputRef}
                label="Mật khẩu"
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordError("");
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                focused={passwordFocused}
                placeholder="Mật khẩu của bạn"
                accessibilityLabel="Mật khẩu"
                icon="lock"
                error={passwordError}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword((value) => !value)}
                autoComplete="password"
                textContentType="password"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              <View className="w-full flex-row items-center justify-between mb-4 px-2">
                <Pressable
                  onPress={() => setRememberMe((value) => !value)}
                  hitSlop={8}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: rememberMe }}
                  accessibilityLabel="Ghi nhớ đăng nhập"
                  className="flex-row items-center"
                >
                  <View
                    className={`w-4 h-4 rounded items-center justify-center mr-2 border ${
                      rememberMe
                        ? "bg-[#D97706] border-[#D97706]"
                        : "bg-white border-[#D1D5DB]"
                    }`}
                  >
                    {rememberMe && (
                      <Feather name="check" size={12} color="#FFFFFF" />
                    )}
                  </View>
                  <Text className="text-xs font-medium text-muted">
                    Ghi nhớ đăng nhập
                  </Text>
                </Pressable>
                <Pressable
                  onPress={handleForgotPassword}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Quên mật khẩu?"
                >
                  <Text className="text-xs font-semibold text-[#D97706]">
                    Quên mật khẩu?
                  </Text>
                </Pressable>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Đăng nhập"
                onPress={handleSubmit}
                className="w-full h-14 rounded-full bg-[#FEB11F] flex-row items-center justify-center shadow-md shadow-amber-500/25 active:bg-[#F5A510]"
              >
                <Text className="font-bold text-base text-ink mr-2">
                  Đăng nhập
                </Text>
                <Feather name="arrow-right" size={20} color="#0D132B" />
              </Pressable>
              <View className="w-full flex-row items-center my-5">
                <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
                <Text className="font-medium text-xs text-muted px-4">
                  Hoặc đăng nhập với
                </Text>
                <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
              </View>
              <SocialAuthButtons
                actionLabel="Đăng nhập"
                onProvider={handleSocialAuth}
              />
            </View>
            <View className="flex-row items-center justify-center pt-2">
              <Text className="font-regular text-sm text-muted">
                Chưa có tài khoản?{" "}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Chuyển sang trang đăng ký"
                hitSlop={8}
                onPress={() => router.replace("/(auth)/sign-up")}
              >
                <Text className="font-bold text-sm text-[#D97706] underline">
                  Đăng ký
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      <VerificationModal
        visible={showModal}
        email={email}
        onClose={() => setShowModal(false)}
        onSuccess={() => {
          setShowModal(false);
          if (modalPurpose === "reset") {
            router.replace({
              pathname: "/(auth)/sign-in",
              params: { step: "password-reset" },
            });
            return;
          }
          router.replace("/");
        }}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    </SafeAreaView>
  );
}

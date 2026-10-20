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
  ActivityIndicator,
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
import { useSignUp, useSSO } from "@clerk/expo";

function getClerkErrorDetails(error: any) {
  if (!error) return { code: "", message: "", paramName: "" };
  const first = error.errors?.[0] || error;
  const code: string = first.code || error.code || "";
  const message: string =
    first.longMessage ||
    first.message ||
    error.longMessage ||
    error.message ||
    "Đã xảy ra lỗi";
  const paramName: string = first.meta?.paramName || "";
  return { code, message, paramName };
}

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, errors, fetchStatus } = useSignUp();
  const { startSSOFlow } = useSSO();
  const isKeyboardVisible = useKeyboardVisible();
  const passwordInputRef = useRef<TextInput>(null);
  const confirmPasswordInputRef = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [confirmPasswordFocused, setConfirmPasswordFocused] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const nextEmailError = validateEmail(
      email,
      "Vui lòng nhập địa chỉ email",
      "Email không đúng định dạng (ví dụ: ban@email.com)"
    );
    const nextPasswordError = validatePassword(
      password,
      "Vui lòng nhập mật khẩu",
      "Mật khẩu phải có ít nhất 8 ký tự",
      8
    );
    const nextConfirmError = !confirmPassword
      ? "Vui lòng xác nhận mật khẩu"
      : confirmPassword !== password
      ? "Mật khẩu xác nhận không khớp"
      : "";
    setEmailError(nextEmailError);
    setPasswordError(nextPasswordError);
    setConfirmPasswordError(nextConfirmError);
    return !nextEmailError && !nextPasswordError && !nextConfirmError;
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    if (!validate()) return;
    if (isSubmitting || fetchStatus === "fetching") return;

    setIsSubmitting(true);
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    try {
      // Clear any prior unfinished attempt to avoid stale identifier lock
      if (signUp.status === "missing_requirements") {
        await signUp.reset();
      }

      const { error } = await signUp.password({
        emailAddress: email.trim(),
        password,
      });

      console.log("[SignUp] password error:", error);

      if (error) {
        setIsSubmitting(false);
        const { code, message, paramName } = getClerkErrorDetails(error);

        if (
          code === "form_identifier_exists" ||
          code.includes("identifier") ||
          paramName === "email_address"
        ) {
          setEmailError(
            "Email này đã được sử dụng (có thể đã đăng ký qua Google). Vui lòng chuyển sang trang Đăng nhập."
          );
        } else if (code === "form_password_length_too_short") {
          const match = message.match(/\d+/);
          const minLen = match ? match[0] : "8";
          setPasswordError(`Mật khẩu phải có tối thiểu ${minLen} ký tự.`);
        } else if (code === "form_password_pwned") {
          setPasswordError(
            "Mật khẩu này quá thông dụng hoặc đã từng bị lộ. Vui lòng chọn mật khẩu phức tạp hơn."
          );
        } else if (
          code.includes("password") ||
          paramName === "password" ||
          errors?.fields?.password
        ) {
          setPasswordError(errors?.fields?.password?.message || message);
        } else if (
          code.includes("email") ||
          paramName === "email_address" ||
          errors?.fields?.emailAddress
        ) {
          setEmailError(errors?.fields?.emailAddress?.message || message);
        } else {
          setEmailError(message);
        }
        return;
      }

      console.log("[SignUp] sending email verification code to:", email.trim());
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      console.log("[SignUp] sendEmailCode result:", sendError);

      if (sendError) {
        setIsSubmitting(false);
        const { message } = getClerkErrorDetails(sendError);
        setEmailError(
          message || "Không thể gửi mã xác thực. Vui lòng kiểm tra lại email."
        );
        return;
      }

      setIsSubmitting(false);
      setShowModal(true);
    } catch (err: any) {
      console.error("[SignUp] unexpected error:", err);
      setIsSubmitting(false);
      setEmailError(
        err.message || "Đã xảy ra lỗi khi đăng ký. Vui lòng thử lại."
      );
    }
  };

  const handleVerify = async (code: string) => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      const { message } = getClerkErrorDetails(error);
      return {
        error: message || "Mã xác thực không hợp lệ. Vui lòng thử lại.",
      };
    }

    if (signUp.status === "complete") {
      const { error: finalizeError } = await signUp.finalize({
        navigate: () => router.replace("/"),
      });
      if (finalizeError) {
        const { message } = getClerkErrorDetails(finalizeError);
        return {
          error: message || "Không thể hoàn tất phiên đăng nhập",
        };
      }
      router.replace("/");
    }
  };

  const handleResend = async () => {
    const { error } = await signUp.verifications.sendEmailCode();
    if (error) {
      const { message } = getClerkErrorDetails(error);
      return {
        error: message || "Không thể gửi lại mã xác thực",
      };
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
        console.error("Google sign-up error:", err);
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
        console.error("Apple sign-up error:", err);
        setEmailError("Đăng ký bằng Apple chưa khả dụng");
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
                style={{
                  width: isKeyboardVisible ? 110 : 190,
                  height: isKeyboardVisible ? 75 : 135,
                }}
                resizeMode="contain"
                accessibilityElementsHidden
                importantForAccessibility="no"
              />
              <Text
                className="font-bold text-2xl text-ink text-center tracking-tight mt-0.5"
                style={{ lineHeight: 32, paddingTop: 2 }}
              >
                Tạo tài khoản <Text className="text-[#D97706]">mới</Text>
              </Text>
            </View>
            <View className="w-full max-w-[400px] my-auto py-1">
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
                  if (confirmPassword && text !== confirmPassword) {
                    setConfirmPasswordError("Mật khẩu xác nhận không khớp");
                  }
                }}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                focused={passwordFocused}
                placeholder="Tối thiểu 8 ký tự"
                accessibilityLabel="Mật khẩu mới"
                icon="lock"
                error={passwordError}
                secureTextEntry={!showPassword}
                showPassword={showPassword}
                onTogglePassword={() => setShowPassword((value) => !value)}
                autoComplete="password-new"
                textContentType="newPassword"
                returnKeyType="next"
                onSubmitEditing={() =>
                  confirmPasswordInputRef.current?.focus()
                }
              />
              <View className="flex-row items-center ml-4 -mt-2 mb-2.5">
                <Feather
                  name={password.length >= 8 ? "check-circle" : "info"}
                  size={12}
                  color={password.length >= 8 ? "#21C16B" : "#9CA3AF"}
                />
                <Text
                  className={`text-[11px] ml-1.5 font-medium ${
                    password.length >= 8 ? "text-[#21C16B]" : "text-muted"
                  }`}
                >
                  Tối thiểu 8 ký tự
                </Text>
              </View>
              <AuthTextField
                ref={confirmPasswordInputRef}
                label="Xác nhận mật khẩu"
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setConfirmPasswordError("");
                }}
                onFocus={() => setConfirmPasswordFocused(true)}
                onBlur={() => setConfirmPasswordFocused(false)}
                focused={confirmPasswordFocused}
                placeholder="Nhập lại mật khẩu"
                accessibilityLabel="Xác nhận lại mật khẩu"
                icon="shield"
                error={confirmPasswordError}
                secureTextEntry={!showConfirmPassword}
                showPassword={showConfirmPassword}
                onTogglePassword={() =>
                  setShowConfirmPassword((value) => !value)
                }
                autoComplete="password-new"
                textContentType="newPassword"
                returnKeyType="done"
                onSubmitEditing={handleSubmit}
              />
              <Text className="text-center text-xs text-muted leading-4 px-2 mt-1 mb-3">
                Bằng việc đăng ký, bạn đồng ý với{" "}
                <Text className="text-ink font-semibold underline">
                  Điều khoản dịch vụ
                </Text>{" "}
                và{" "}
                <Text className="text-ink font-semibold underline">
                  Chính sách bảo mật
                </Text>{" "}
                của Simply Cook.
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Đăng ký tài khoản"
                disabled={isSubmitting || fetchStatus === "fetching"}
                onPress={handleSubmit}
                className={`w-full h-14 rounded-full bg-[#FEB11F] flex-row items-center justify-center shadow-md shadow-amber-500/25 active:bg-[#F5A510] ${
                  isSubmitting || fetchStatus === "fetching" ? "opacity-75" : ""
                }`}
              >
                {isSubmitting || fetchStatus === "fetching" ? (
                  <ActivityIndicator size="small" color="#0D132B" />
                ) : (
                  <>
                    <Text className="font-bold text-base text-ink mr-2">
                      Đăng ký
                    </Text>
                    <Feather name="arrow-right" size={20} color="#0D132B" />
                  </>
                )}
              </Pressable>
              <View className="w-full flex-row items-center my-3">
                <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
                <Text className="font-medium text-xs text-muted px-4">
                  Hoặc đăng ký với
                </Text>
                <View className="flex-1 h-[1px] bg-[#E5E7EB]" />
              </View>
              <SocialAuthButtons
                actionLabel="Đăng ký"
                onProvider={handleSocialAuth}
              />
              <View nativeID="clerk-captcha" />
            </View>
            <View className="flex-row items-center justify-center pt-1 pb-1">
              <Text className="font-regular text-sm text-muted">
                Đã có tài khoản?{" "}
              </Text>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Chuyển sang trang đăng nhập"
                hitSlop={8}
                onPress={() => router.replace("/(auth)/sign-in")}
              >
                <Text className="font-bold text-sm text-[#D97706] underline">
                  Đăng nhập
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
          router.replace("/");
        }}
        onVerify={handleVerify}
        onResend={handleResend}
      />
    </SafeAreaView>
  );
}

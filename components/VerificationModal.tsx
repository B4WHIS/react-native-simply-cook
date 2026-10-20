import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface VerificationModalProps {
  visible: boolean;
  email: string;
  onClose: () => void;
  onSuccess?: () => void;
}

function ModalBody({
  email,
  onClose,
  onSuccess,
}: {
  email: string;
  onClose: () => void;
  onSuccess?: () => void;
}) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [resendSeconds, setResendSeconds] = useState(45);
  const [isVerifying, setIsVerifying] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const successTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Automatically focus input and run resend countdown on mount
  useEffect(() => {
    const focusTimeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 150);

    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearTimeout(focusTimeout);
      clearInterval(timer);
      if (successTimeoutRef.current) {
        clearTimeout(successTimeoutRef.current);
        successTimeoutRef.current = null;
      }
    };
  }, []);

  const handleCodeChange = (text: string) => {
    if (isVerifying) return;

    const cleaned = text.replace(/[^0-9]/g, "").slice(0, 6);
    setCode(cleaned);

    if (cleaned.length === 6) {
      setIsVerifying(true);
      Keyboard.dismiss();

      successTimeoutRef.current = setTimeout(() => {
        if (successTimeoutRef.current) {
          clearTimeout(successTimeoutRef.current);
          successTimeoutRef.current = null;
        }
        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          router.replace("/");
        }
      }, 350);
    }
  };

  const handleResend = () => {
    if (resendSeconds > 0) return;
    setResendSeconds(45);
    setCode("");
    inputRef.current?.focus();
  };

  return (
    <View className="w-full max-w-[360px] bg-white rounded-3xl p-6 shadow-2xl border border-[#F3F4F6] items-center relative">
      {/* Close Button */}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onClose}
        className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F6F7FB] items-center justify-center z-10"
        accessibilityLabel="Đóng modal"
      >
        <Feather name="x" size={18} color="#6B7280" />
      </TouchableOpacity>

      {/* Email Illustration Badge */}
      <View className="w-16 h-16 rounded-full bg-[#FFF9EE] border border-[#FFE69B] items-center justify-center mb-4 mt-1">
        <Feather name="mail" size={28} color="#FEB11F" />
      </View>

      {/* Modal Title */}
      <Text className="font-bold text-2xl text-ink text-center tracking-tight">
        Xác thực email
      </Text>

      {/* Modal Description */}
      <Text className="font-regular text-sm text-muted text-center mt-2 leading-5 px-2">
        Chúng tôi đã gửi mã xác thực 6 chữ số đến
      </Text>
      <Text className="font-semibold text-sm text-ink text-center mt-0.5 px-2">
        {email.trim() ? email : "bạn@example.com"}
      </Text>

      {/* Hidden Real Number Input */}
      <TextInput
        ref={inputRef}
        value={code}
        onChangeText={handleCodeChange}
        keyboardType="number-pad"
        maxLength={6}
        editable={!isVerifying}
        caretHidden
        textContentType="oneTimeCode"
        autoComplete="one-time-code"
        style={{
          position: "absolute",
          width: 1,
          height: 1,
          opacity: 0.01,
        }}
      />

      {/* 6 Digit Input Display Boxes */}
      <Pressable
        onPress={() => inputRef.current?.focus()}
        className="w-full flex-row justify-between items-center my-6 px-1"
      >
        {[0, 1, 2, 3, 4, 5].map((index) => {
          const digit = code[index] || "";
          const isCurrent = code.length === index;
          const isFilled = digit !== "";

          return (
            <View
              key={index}
              style={{
                width: 44,
                height: 52,
                borderRadius: 14,
                borderWidth: isCurrent ? 2 : 1.5,
                borderColor: isVerifying
                  ? "#21C16B"
                  : isCurrent
                  ? "#FEB11F"
                  : isFilled
                  ? "#0D132B"
                  : "#E5E7EB",
                backgroundColor: isCurrent
                  ? "#FFFDF7"
                  : isFilled
                  ? "#FFFFFF"
                  : "#F9FAFB",
                justifyContent: "center",
                alignItems: "center",
                shadowColor: isCurrent ? "#FEB11F" : "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: isCurrent ? 0.2 : 0.05,
                shadowRadius: 2,
                elevation: isCurrent ? 2 : 0,
              }}
            >
              <Text
                className={`font-bold text-2xl ${
                  isVerifying
                    ? "text-success"
                    : isFilled
                    ? "text-ink"
                    : "text-muted"
                }`}
              >
                {digit}
              </Text>
            </View>
          );
        })}
      </Pressable>

      {/* Status indicator / verification progress */}
      {isVerifying ? (
        <View className="flex-row items-center justify-center mb-3">
          <Feather name="check-circle" size={16} color="#21C16B" />
          <Text className="font-medium text-sm text-success ml-1.5">
            Xác thực thành công! Đang chuyển hướng...
          </Text>
        </View>
      ) : (
        <Text className="font-regular text-xs text-muted text-center mb-4">
          Nhập đủ 6 số để tự động đăng nhập
        </Text>
      )}

      {/* Resend Action */}
      <View className="flex-row items-center justify-center">
        <Text className="font-regular text-sm text-muted">
          Chưa nhận được mã?{" "}
        </Text>
        {resendSeconds > 0 ? (
          <Text className="font-medium text-sm text-muted">
            Gửi lại sau {resendSeconds}s
          </Text>
        ) : (
          <TouchableOpacity activeOpacity={0.7} onPress={handleResend}>
            <Text className="font-bold text-sm text-[#FEB11F]">Gửi lại mã</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

export function VerificationModal({
  visible,
  email,
  onClose,
  onSuccess,
}: VerificationModalProps) {
  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flex: 1,
              backgroundColor: "rgba(13, 19, 43, 0.45)",
              justifyContent: "center",
              alignItems: "center",
              paddingHorizontal: 20,
            }}
          >
            <TouchableWithoutFeedback>
              <ModalBody
                email={email}
                onClose={onClose}
                onSuccess={onSuccess}
              />
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
}

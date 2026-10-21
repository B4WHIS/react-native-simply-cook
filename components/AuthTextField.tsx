import { Feather } from "@expo/vector-icons";
import { forwardRef } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

type FeatherIconName = React.ComponentProps<typeof Feather>["name"];

interface AuthTextFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  focused?: boolean;
  placeholder: string;
  accessibilityLabel: string;
  icon: FeatherIconName;
  error?: string;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
  onClear?: () => void;
  keyboardType?: React.ComponentProps<typeof TextInput>["keyboardType"];
  autoComplete?: React.ComponentProps<typeof TextInput>["autoComplete"];
  textContentType?: React.ComponentProps<typeof TextInput>["textContentType"];
  returnKeyType?: React.ComponentProps<typeof TextInput>["returnKeyType"];
  onSubmitEditing?: () => void;
}

export const AuthTextField = forwardRef<TextInput, AuthTextFieldProps>(
  function AuthTextField(
    {
      label,
      value,
      onChangeText,
      onFocus,
      onBlur,
      focused = false,
      placeholder,
      accessibilityLabel,
      icon,
      error,
      secureTextEntry = false,
      showPassword = false,
      onTogglePassword,
      onClear,
      keyboardType,
      autoComplete,
      textContentType,
      returnKeyType,
      onSubmitEditing,
    },
    ref
  ) {
    return (
      <View className="mb-3">
        <Text className="text-xs font-semibold text-ink mb-1.5 ml-4">{label}</Text>
        <View
          className={`w-full h-14 rounded-full bg-white flex-row items-center px-4 border-[1.5px] ${
            error
              ? "border-red-500"
              : focused
              ? "border-[#D97706]"
              : "border-gray-200"
          }`}
          style={{
            shadowColor: focused ? "#D97706" : "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: focused ? 0.12 : 0.04,
            shadowRadius: 4,
            elevation: 1,
          }}
        >
          <Feather
            name={icon}
            size={20}
            color={error ? "#EF4444" : focused ? "#D97706" : "#9CA3AF"}
            style={{ marginRight: 10 }}
          />
          <TextInput
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            placeholder={placeholder}
            placeholderTextColor="#9CA3AF"
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete={autoComplete}
            textContentType={textContentType}
            className="flex-1 font-medium text-base text-ink h-full"
            returnKeyType={returnKeyType}
            onSubmitEditing={onSubmitEditing}
            accessibilityLabel={accessibilityLabel}
          />
          {onClear && value.length > 0 && (
            <Pressable
              onPress={onClear}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
              accessibilityLabel="Xóa email"
            >
              <Feather name="x-circle" size={18} color="#9CA3AF" />
            </Pressable>
          )}
          {onTogglePassword && (
            <Pressable
              onPress={onTogglePassword}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              <Feather
                name={showPassword ? "eye" : "eye-off"}
                size={18}
                color="#9CA3AF"
              />
            </Pressable>
          )}
        </View>
        {error ? <Text className="text-xs text-red-500 font-medium ml-4 mt-1">{error}</Text> : null}
      </View>
    );
  }
);

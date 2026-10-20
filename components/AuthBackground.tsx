import { View } from "react-native";

export function AuthBackground() {
  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      {/* Top-left organic accent wave */}
      <View
        style={{
          position: "absolute",
          top: -70,
          left: -70,
          width: 220,
          height: 220,
          borderRadius: 110,
          backgroundColor: "#FFEAB6",
          opacity: 0.75,
        }}
      />
      {/* Top-left floating pill dot */}
      <View
        style={{
          position: "absolute",
          top: 65,
          left: 42,
          width: 13,
          height: 24,
          borderRadius: 7,
          backgroundColor: "#FED885",
          transform: [{ rotate: "42deg" }],
        }}
      />

      {/* Bottom-right organic accent wave */}
      <View
        style={{
          position: "absolute",
          bottom: -80,
          right: -80,
          width: 250,
          height: 250,
          borderRadius: 125,
          backgroundColor: "#FFEAB6",
          opacity: 0.75,
        }}
      />
      {/* Bottom-right floating pill dot */}
      <View
        style={{
          position: "absolute",
          bottom: 78,
          right: 48,
          width: 13,
          height: 24,
          borderRadius: 7,
          backgroundColor: "#FED885",
          transform: [{ rotate: "42deg" }],
        }}
      />

      {/* Bottom-left floating pill dot */}
      <View
        style={{
          position: "absolute",
          bottom: 45,
          left: 20,
          width: 11,
          height: 22,
          borderRadius: 6,
          backgroundColor: "#FED885",
          opacity: 0.65,
          transform: [{ rotate: "45deg" }],
        }}
      />
    </View>
  );
}

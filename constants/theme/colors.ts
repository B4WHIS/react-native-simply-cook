/**
 * Simply Cook – Color Tokens
 * Source of truth: design-system spec (01-design-system.png)
 *
 * DO NOT hard-code these hex values anywhere else in the app.
 * Import from "@/constants/theme" instead.
 */

// ---------------------------------------------------------------------------
// Primary brand palette
// ---------------------------------------------------------------------------
export const primary = {
  /** Fresh herb / sage green – primary actions, freshness tags */
  green: "#B7E8A0",
  /** Warm sunshine yellow */
  yellow: "#FFE69B",
  /** Warm terracotta / spice orange – accents, timers */
  orange: "#FFB873",
  /** Soft warm cream – card / surface tint */
  cream: "#FFF6E6",
} as const;

// ---------------------------------------------------------------------------
// Semantic (status) colors
// ---------------------------------------------------------------------------
export const semantic = {
  /** Confirmed, completed, success state */
  success: "#21C16B",
  /** Caution, streak indicator */
  warning: "#FFC800",
  /** Active streak / hot indicator */
  streak: "#FF8A00",
  /** Destructive, error, delete */
  error: "#FF4D4F",
  /** Informational */
  info: "#4D8BFF",
} as const;

// ---------------------------------------------------------------------------
// Neutrals
// ---------------------------------------------------------------------------
export const neutral = {
  /** Rich charcoal – primary readable text. CSS utility: text-ink */
  ink: "#0D132B",
  /** Mid-grey – secondary labels, placeholders. CSS utility: text-muted */
  muted: "#6B7280",
  /** Dividers, input outlines */
  border: "#E5E7EB",
  /** Card / input backgrounds */
  surface: "#F6F7FB",
  /** Page / screen background */
  background: "#FFFFFF",
} as const;

// ---------------------------------------------------------------------------
// Convenience flat export used throughout the app
// ---------------------------------------------------------------------------
export const colors = {
  // Primary
  green: primary.green,
  yellow: primary.yellow,
  orange: primary.orange,
  cream: primary.cream,

  // Semantic
  success: semantic.success,
  warning: semantic.warning,
  streak: semantic.streak,
  error: semantic.error,
  info: semantic.info,

  // Neutrals
  ink: neutral.ink,
  muted: neutral.muted,
  border: neutral.border,
  surface: neutral.surface,
  background: neutral.background,

  // Aliases for NativeWind / component usage
  textPrimary: neutral.ink,
  textSecondary: neutral.muted,
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
} as const;

export type ColorToken = keyof typeof colors;

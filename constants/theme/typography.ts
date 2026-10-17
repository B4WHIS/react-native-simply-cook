/**
 * Simply Cook – Typography Tokens
 * Source of truth: design-system spec (01-design-system.png)
 *
 * Font family: FZ Poppins (loaded via expo-font in _layout.tsx)
 * Weights available: Regular (400), Medium (500), SemiBold (600), Bold (700)
 *
 * Rule: fontFamily drives weight on native (iOS/Android).
 * fontWeight is omitted to prevent synthesis artefacts.
 */
import { TextStyle } from "react-native";
import { colors } from "./colors";

// ---------------------------------------------------------------------------
// Font family map (mirrors file names in assets/fonts/)
// ---------------------------------------------------------------------------
export const fontFamily = {
  regular: "FZPoppins-Regular",
  medium: "FZPoppins-Medium",
  semibold: "FZPoppins-SemiBold",
  bold: "FZPoppins-Bold",
} as const;

// ---------------------------------------------------------------------------
// Named text styles
// ---------------------------------------------------------------------------
export const type = {
  /** H1 – Page / Screen Title: 32px Bold, line-height 1.2 */
  h1: {
    fontFamily: fontFamily.bold,
    fontSize: 32,
    lineHeight: 32 * 1.2,
    color: colors.ink,
  } satisfies TextStyle,

  /** H2 – Section Title: 24px SemiBold, line-height 1.3 */
  h2: {
    fontFamily: fontFamily.semibold,
    fontSize: 24,
    lineHeight: 24 * 1.3,
    color: colors.ink,
  } satisfies TextStyle,

  /** H3 – Card / Module Title: 20px SemiBold, line-height 1.3 */
  h3: {
    fontFamily: fontFamily.semibold,
    fontSize: 20,
    lineHeight: 20 * 1.3,
    color: colors.ink,
  } satisfies TextStyle,

  /** H4 – Subheading: 16px Medium, line-height 1.4 */
  h4: {
    fontFamily: fontFamily.medium,
    fontSize: 16,
    lineHeight: 16 * 1.4,
    color: colors.ink,
  } satisfies TextStyle,

  /** Body Large – Important content: 16px Regular, line-height 1.6 */
  bodyLarge: {
    fontFamily: fontFamily.regular,
    fontSize: 16,
    lineHeight: 16 * 1.6,
    color: colors.ink,
  } satisfies TextStyle,

  /** Body Medium – Body text: 14px Regular, line-height 1.6 */
  bodyMedium: {
    fontFamily: fontFamily.regular,
    fontSize: 14,
    lineHeight: 14 * 1.6,
    color: colors.ink,
  } satisfies TextStyle,

  /** Body Small – Supporting text: 13px Regular, line-height 1.6 */
  bodySmall: {
    fontFamily: fontFamily.regular,
    fontSize: 13,
    lineHeight: 13 * 1.6,
    color: colors.muted,
  } satisfies TextStyle,

  /** Caption – Labels, meta text: 11px Regular, line-height 1.4 */
  caption: {
    fontFamily: fontFamily.regular,
    fontSize: 11,
    lineHeight: 11 * 1.4,
    color: colors.muted,
  } satisfies TextStyle,
} as const;

export type TypeToken = keyof typeof type;

/**
 * Simply Cook – Border Radius Tokens
 * Pair every non-capsule radius with borderCurve: "continuous" at usage site.
 */
export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  /** Cards and image containers */
  xxl: 24,
  /** Fully rounded pills / avatars */
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radius;

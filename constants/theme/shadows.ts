/**
 * Simply Cook – Shadow Tokens
 * Uses boxShadow strings (CSS syntax – supported in RN 0.86+).
 * Never use legacy shadowXxx or elevation props.
 */
export const shadows = {
  /** Subtle lift for cards resting on background */
  card: "0 1px 3px rgba(13, 19, 43, 0.06), 0 1px 2px rgba(13, 19, 43, 0.04)",
  /** Elevated cards, bottom sheets */
  raised: "0 4px 12px rgba(13, 19, 43, 0.10)",
  /** Modals, overlays */
  overlay: "0 8px 24px rgba(13, 19, 43, 0.18)",
} as const;

export type ShadowToken = keyof typeof shadows;

/**
 * Simply Cook – Motion Tokens
 * Shared durations and spring configs for Reanimated / Animated.
 * All values in milliseconds.
 */
export const motion = {
  /** State feedback: press, toggle, checkbox */
  fast: 150,
  /** Element transitions: enter/exit, accordion */
  base: 250,
  /** Large surfaces: sheets, full-screen transitions */
  slow: 400,
} as const;

/**
 * Spring configuration for interactive press feedback (Reanimated withSpring).
 * Use for scale-bounce on cards, buttons, etc.
 */
export const spring = {
  press: {
    damping: 15,
    stiffness: 400,
    mass: 0.8,
  },
  snap: {
    damping: 20,
    stiffness: 300,
    mass: 1,
  },
} as const;

export type MotionToken = keyof typeof motion;

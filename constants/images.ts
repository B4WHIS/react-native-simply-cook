/**
 * Simply Cook – Centralized Image Assets
 *
 * ALL image imports MUST go through this file.
 * Never use require("../../assets/...") directly in screens or components.
 *
 * Usage:
 *   import { images } from "@/constants/images";
 *   <Image source={images.authHero} />
 */
const images = {
  // ---- App identity ----
  logo: require("../assets/images/logo.png"),
  appIcon: require("../assets/images/app-icon.png"),

  // ---- Onboarding / Auth ----
  onboardingHero: require("../assets/images/onboarding-hero.png"),
  authHero: require("../assets/images/auth-hero.png"),

  // ---- Empty states ----
  emptyFridge: require("../assets/images/empty-fridge.png"),
  emptyPlate: require("../assets/images/empty-plate.png"),

  // ---- Recipe food photography ----
  canhChua: require("../assets/images/canh-chua.png"),
  canhGaChien: require("../assets/images/canh-ga-chien.png"),
  thitHeoChayCanh: require("../assets/images/thit-heo-chay-canh.png"),
  thitKhoTrung: require("../assets/images/thit-kho-trung.png"),
  trungChien: require("../assets/images/trung-chien.png"),

  // ---- Splash / Icon ----
  splashIcon: require("../assets/images/splash-icon.png"),
} as const;

export { images };
export type ImageKey = keyof typeof images;

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
  authChick: require("../assets/images/auth-chick.png"),
  googleIcon: require("../assets/images/google-icon.png"),

  // ---- Empty states ----
  emptyFridge: require("../assets/images/empty-fridge.png"),
  emptyPlate: require("../assets/images/empty-plate.png"),

  // ---- Recipe food photography ----
  canhChua: require("../assets/images/canh-chua.png"),
  canhGaChien: require("../assets/images/canh-ga-chien.png"),
  thitHeoChayCanh: require("../assets/images/thit-heo-chay-canh.png"),
  thitKhoTrung: require("../assets/images/thit-kho-trung.png"),
  trungChien: require("../assets/images/trung-chien.png"),
  boXaoBongCai: require("../assets/images/bo-xao-bong-cai.png"),
  dauHuXaoNam: require("../assets/images/dau-hu-xao-nam.png"),

  // ---- Category illustrations ----
  catMonKho: require("../assets/images/cat-mon-kho.png"),
  catMonCanh: require("../assets/images/cat-mon-canh.png"),
  catMonXao: require("../assets/images/cat-mon-xao.png"),
  catMonChay: require("../assets/images/cat-mon-chay.png"),
  catBuaSang: require("../assets/images/cat-bua-sang.png"),

  // ---- Tab navigation icons ----
  tabChick: require("../assets/images/tab-chick.png"),

  // ---- Splash / Icon ----
  splashIcon: require("../assets/images/splash-icon.png"),
} as const;

export { images };
export type ImageKey = keyof typeof images;

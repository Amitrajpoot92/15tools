import { TestIds } from "react-native-google-mobile-ads";

/**
 * AdMob Configuration for TopCalcBox (Calculator: All in One)
 *
 * NOTE ON ADMOB COMPLIANCE:
 * During development (__DEV__ === true), Google Mobile Ads SDK requires using
 * official TestIds to avoid policy violations and account bans.
 * In production release builds (__DEV__ === false), the official production
 * ad unit IDs provided by the client are automatically used.
 */

export const ADMOB_APP_ID = "ca-app-pub-9267692450432886~2829965350";

export const PRODUCTION_AD_UNITS = {
  BANNER: "ca-app-pub-9267692450432886/4751813858",
  INTERSTITIAL: "ca-app-pub-9267692450432886/2103927221",
  NATIVE: "ca-app-pub-9267692450432886/8122540667",
};

// Set to true if you explicitly want to test production IDs (not recommended in debug mode)
const FORCE_PRODUCTION_ADS = false;

const isTestEnvironment = __DEV__ && !FORCE_PRODUCTION_ADS;

export const AD_UNITS = {
  BANNER: isTestEnvironment ? TestIds.BANNER : PRODUCTION_AD_UNITS.BANNER,
  INTERSTITIAL: isTestEnvironment
    ? TestIds.INTERSTITIAL
    : PRODUCTION_AD_UNITS.INTERSTITIAL,
  NATIVE: isTestEnvironment ? TestIds.NATIVE : PRODUCTION_AD_UNITS.NATIVE,
};

/**
 * Balanced ad display thresholds
 * Ensures ads never annoy users or disrupt calculations.
 */
export const AD_THRESHOLDS = {
  // Minimum time (in milliseconds) between interstitial ads (2.5 minutes)
  INTERSTITIAL_COOLDOWN_MS: 150 * 1000,
  // Minimum user calculation / tool interaction actions before an interstitial is eligible
  MIN_ACTIONS_BEFORE_INTERSTITIAL: 3,
};

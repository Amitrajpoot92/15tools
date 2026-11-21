import mobileAds, {
  InterstitialAd,
  AdEventType,
  MaxAdContentRating,
} from "react-native-google-mobile-ads";
import { AD_UNITS, AD_THRESHOLDS } from "./adConfig";

class AdManagerService {
  private static instance: AdManagerService;
  private isInitialized = false;

  // Interstitial management
  private interstitial: InterstitialAd | null = null;
  private isInterstitialLoaded = false;
  private isInterstitialLoading = false;
  private actionCount = 0;
  private lastInterstitialTime = Date.now(); // Prevents ads immediately on app launch
  private onDismissCallback: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): AdManagerService {
    if (!AdManagerService.instance) {
      AdManagerService.instance = new AdManagerService();
    }
    return AdManagerService.instance;
  }

  /**
   * Initializes the Google Mobile Ads SDK safely.
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      await mobileAds().setRequestConfiguration({
        maxAdContentRating: MaxAdContentRating.G,
        tagForChildDirectedTreatment: false,
        tagForUnderAgeOfConsent: false,
      });

      await mobileAds().initialize();
      this.isInitialized = true;

      // Preload the first interstitial ad in the background
      this.loadInterstitial();
    } catch (error) {
      // Graceful error logging so the app continues working completely offline
      if (__DEV__) {
        console.warn("[AdManager] Initialization error:", error);
      }
    }
  }

  /**
   * Preloads a fullscreen interstitial ad in the background.
   */
  public loadInterstitial(): void {
    if (this.isInterstitialLoading || this.isInterstitialLoaded) {
      return;
    }

    try {
      this.isInterstitialLoading = true;
      const ad = InterstitialAd.createForAdRequest(AD_UNITS.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: false,
      });

      ad.addAdEventListener(AdEventType.LOADED, () => {
        this.interstitial = ad;
        this.isInterstitialLoaded = true;
        this.isInterstitialLoading = false;
      });

      ad.addAdEventListener(AdEventType.ERROR, (error) => {
        this.isInterstitialLoaded = false;
        this.isInterstitialLoading = false;
        this.interstitial = null;
        if (__DEV__) {
          console.warn("[AdManager] Interstitial load error:", error);
        }
      });

      ad.addAdEventListener(AdEventType.CLOSED, () => {
        this.isInterstitialLoaded = false;
        this.isInterstitialLoading = false;
        this.interstitial = null;

        if (this.onDismissCallback) {
          const cb = this.onDismissCallback;
          this.onDismissCallback = null;
          cb();
        }

        // Preload next interstitial ad with a short delay
        setTimeout(() => {
          this.loadInterstitial();
        }, 1000);
      });

      ad.load();
    } catch (e) {
      this.isInterstitialLoading = false;
      if (__DEV__) {
        console.warn("[AdManager] Error setting up interstitial:", e);
      }
    }
  }

  /**
   * Increment the user activity / calculation counter.
   */
  public recordAction(count = 1): void {
    this.actionCount += count;
  }

  /**
   * Checks if an interstitial ad is eligible to be shown based on:
   * 1. Ad is loaded and ready
   * 2. Enough actions have occurred (default: >= 3)
   * 3. Cooldown time has elapsed (default: >= 2.5 minutes)
   */
  public isInterstitialEligible(): boolean {
    if (!this.isInterstitialLoaded || !this.interstitial) {
      return false;
    }

    const hasEnoughActions =
      this.actionCount >= AD_THRESHOLDS.MIN_ACTIONS_BEFORE_INTERSTITIAL;
    const cooldownElapsed =
      Date.now() - this.lastInterstitialTime >=
      AD_THRESHOLDS.INTERSTITIAL_COOLDOWN_MS;

    return hasEnoughActions && cooldownElapsed;
  }

  /**
   * Shows the interstitial ad if eligible at natural transition points (e.g. back navigation).
   *
   * @param onDismissed Callback executed when the ad is closed (or immediately if no ad shown).
   * @returns true if an ad was presented, false otherwise.
   */
  public showInterstitialIfEligible(onDismissed?: () => void): boolean {
    if (!this.isInterstitialEligible() || !this.interstitial) {
      // Not eligible — execute dismissal callback immediately so user experience is snappy
      onDismissed?.();
      return false;
    }

    try {
      this.onDismissCallback = onDismissed || null;
      this.actionCount = 0;
      this.lastInterstitialTime = Date.now();
      this.isInterstitialLoaded = false;

      this.interstitial.show();
      return true;
    } catch (error) {
      if (__DEV__) {
        console.warn("[AdManager] Error showing interstitial:", error);
      }
      this.onDismissCallback = null;
      onDismissed?.();
      // Retry loading
      this.loadInterstitial();
      return false;
    }
  }
}

export const adManager = AdManagerService.getInstance();
export const recordUserAction = (count?: number) =>
  adManager.recordAction(count);
export const showInterstitialIfEligible = (onDismissed?: () => void) =>
  adManager.showInterstitialIfEligible(onDismissed);

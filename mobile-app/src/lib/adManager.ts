import { AD_UNITS, AD_THRESHOLDS } from "./adConfig";
import { getGoogleMobileAds, isAdMobNativeAvailable } from "./adMobSafe";

type ReadyListener = () => void;

class AdManagerService {
  private static instance: AdManagerService;
  private isInitialized = false;
  private isInitializing = false;
  private readyListeners: Set<ReadyListener> = new Set();

  // Interstitial management
  private interstitial: any = null;
  private isInterstitialLoaded = false;
  private isInterstitialLoading = false;
  private actionCount = 0;
  private lastInterstitialTime = 0; // Allows eligible exit ad after user interaction
  private onDismissCallback: (() => void) | null = null;

  private constructor() {}

  public static getInstance(): AdManagerService {
    if (!AdManagerService.instance) {
      AdManagerService.instance = new AdManagerService();
    }
    return AdManagerService.instance;
  }

  /**
   * Returns true only when Google Mobile Ads SDK has completed its native initialization.
   */
  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Subscribe to when AdMob finishes initialization so UI components can safely render ads.
   */
  public onReady(listener: ReadyListener): () => void {
    if (this.isInitialized) {
      listener();
      return () => {};
    }
    this.readyListeners.add(listener);
    return () => {
      this.readyListeners.delete(listener);
    };
  }

  /**
   * Initializes the Google Mobile Ads SDK safely.
   * If running in Expo Go or Web, gracefully exits with zero errors.
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    if (this.isInitializing) return;

    if (!isAdMobNativeAvailable()) {
      return;
    }

    try {
      this.isInitializing = true;
      const gma = getGoogleMobileAds();
      if (!gma) {
        this.isInitializing = false;
        return;
      }

      const mobileAds = gma.default || gma.MobileAds;
      if (mobileAds && typeof mobileAds === "function") {
        await mobileAds().initialize();
        this.isInitialized = true;
        this.isInitializing = false;

        // Notify all waiting components (e.g. BannerAdComponent) that native SDK is ready
        this.readyListeners.forEach((listener) => {
          try {
            listener();
          } catch {
            // Safe ignore
          }
        });
        this.readyListeners.clear();

        // Preload the first interstitial ad in the background after a short delay
        setTimeout(() => {
          this.loadInterstitial();
        }, 2500);
      } else {
        this.isInitializing = false;
      }
    } catch (error) {
      this.isInitializing = false;
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

    if (!this.isInitialized || !isAdMobNativeAvailable()) {
      return;
    }

    const gma = getGoogleMobileAds();
    if (!gma || !gma.InterstitialAd || !gma.AdEventType) {
      return;
    }

    try {
      this.isInterstitialLoading = true;
      const { InterstitialAd, AdEventType } = gma;
      const ad = InterstitialAd.createForAdRequest(AD_UNITS.INTERSTITIAL, {
        requestNonPersonalizedAdsOnly: false,
      });

      ad.addAdEventListener(AdEventType.LOADED, () => {
        this.interstitial = ad;
        this.isInterstitialLoaded = true;
        this.isInterstitialLoading = false;
      });

      ad.addAdEventListener(AdEventType.ERROR, (error: any) => {
        this.isInterstitialLoaded = false;
        this.isInterstitialLoading = false;
        this.interstitial = null;
        if (this.onDismissCallback) {
          const cb = this.onDismissCallback;
          this.onDismissCallback = null;
          cb();
        }
        if (__DEV__) {
          console.warn("[AdManager] Interstitial load error:", error);
        }
        // Retry preload after 15 seconds
        setTimeout(() => {
          this.loadInterstitial();
        }, 15000);
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
        }, 2000);
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
   * Records a user interaction (e.g. calculation, copy result, reset).
   */
  public recordAction(count: number = 1): void {
    this.actionCount += count;
  }

  /**
   * Checks if an interstitial ad is eligible to be shown based on:
   * 1. Native binary module is available and SDK initialized
   * 2. Ad is loaded and ready
   * 3. Enough actions have occurred (default: >= 3)
   * 4. Cooldown time has elapsed (default: >= 2.5 minutes)
   */
  public isInterstitialEligible(): boolean {
    if (!this.isInitialized || !isAdMobNativeAvailable()) {
      return false;
    }

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

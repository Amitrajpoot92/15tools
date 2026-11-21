import * as Haptics from "expo-haptics";

/**
 * Patches expo-haptics globally so that devices or environments without
 * haptic hardware / permissions (e.g. Android tablets, emulators, Expo Go, Web)
 * never throw an Unhandled Promise Rejection (UnavailabilityError).
 */
export function initSafeHaptics(): void {
  try {
    const mod = Haptics as any;

    const origImpact = mod.impactAsync;
    if (typeof origImpact === "function") {
      mod.impactAsync = async (...args: any[]) => {
        try {
          return await origImpact(...args);
        } catch {
          // Gracefully ignore on unsupported devices
        }
      };
    }

    const origSelection = mod.selectionAsync;
    if (typeof origSelection === "function") {
      mod.selectionAsync = async (...args: any[]) => {
        try {
          return await origSelection(...args);
        } catch {
          // Gracefully ignore
        }
      };
    }

    const origNotification = mod.notificationAsync;
    if (typeof origNotification === "function") {
      mod.notificationAsync = async (...args: any[]) => {
        try {
          return await origNotification(...args);
        } catch {
          // Gracefully ignore
        }
      };
    }
  } catch {
    // Fail-safe
  }
}

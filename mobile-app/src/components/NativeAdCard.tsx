import { ViewStyle } from "react-native";

interface NativeAdCardProps {
  style?: ViewStyle;
}

/**
 * NativeAdCard placeholder
 * Safely returns null to prevent New Architecture (RN 0.88) native view
 * crashes and hook mismatches. Banner and Interstitial ads provide the
 * core ad monetization without any stability risk.
 */
export function NativeAdCard({ style }: NativeAdCardProps) {
  return null;
}

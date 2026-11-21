module.exports = ({ config }) => {
  const admobAppId =
    process.env.EXPO_PUBLIC_ADMOB_APP_ID || "ca-app-pub-9267692450432886~2829965350";

  const plugins = (config.plugins || []).map((plugin) => {
    if (Array.isArray(plugin) && plugin[0] === "react-native-google-mobile-ads") {
      return [
        "react-native-google-mobile-ads",
        {
          ...plugin[1],
          androidAppId: admobAppId,
          iosAppId: admobAppId,
        },
      ];
    }
    return plugin;
  });

  return {
    ...config,
    plugins,
  };
};

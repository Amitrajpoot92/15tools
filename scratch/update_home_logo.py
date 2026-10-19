with open('mobile-app/src/app/index.tsx', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add Image to react-native import
content = content.replace(
    '  Pressable,\n} from "react-native";',
    '  Pressable,\n  Image,\n} from "react-native";'
).replace(
    '  Pressable,\r\n} from "react-native";',
    '  Pressable,\r\n  Image,\r\n} from "react-native";'
)

# 2. Replace brandRow logoBadge with Image
old_badge = '''        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Calculator size={20} color="#ffffff" strokeWidth={2.5} />
          </View>'''
new_badge = '''        <View style={styles.brandRow}>
          <Image
            source={require("../../assets/images/splash-icon.png")}
            style={styles.logoImage}
            resizeMode="contain"
          />'''
content = content.replace(old_badge, new_badge).replace(
    old_badge.replace('\n', '\r\n'), new_badge.replace('\n', '\r\n')
)

# 3. Add logoImage to styles
old_style = '''  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },'''
new_style = '''  brandRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoImage: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 12,
  },'''
content = content.replace(old_style, new_style).replace(
    old_style.replace('\n', '\r\n'), new_style.replace('\n', '\r\n')
)

with open('mobile-app/src/app/index.tsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated index.tsx with platform logo successfully!")

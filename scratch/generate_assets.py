from PIL import Image, ImageFilter
import numpy as np
from collections import deque
import os

source_path = 'public/icon.png'
assets_dir = 'mobile-app/assets/images'

# 1. Load source logo
img = Image.open(source_path).convert('RGBA')
w, h = img.size
arr = np.array(img)

# 2. Flood fill outer corners to make background pure transparent
visited = np.zeros((h, w), dtype=bool)
queue = deque([(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1)])

for x, y in list(queue):
    visited[y, x] = True

while queue:
    x, y = queue.popleft()
    for nx, ny in [(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)]:
        if 0 <= nx < w and 0 <= ny < h and not visited[ny, nx]:
            r, g, b, a = arr[ny, nx]
            # Near white background
            if r > 240 and g > 240 and b > 240:
                visited[ny, nx] = True
                queue.append((nx, ny))

# Set outer background alpha to 0
cleaned_arr = arr.copy()
cleaned_arr[visited, 3] = 0

# Soften outer edge anti-aliasing
for y in range(h):
    for x in range(w):
        if not visited[y, x]:
            # If adjacent to visited, slightly smooth edge
            neighbors = [(x+1, y), (x-1, y), (x, y+1), (x, y-1)]
            has_visited_neighbor = any(0 <= nx < w and 0 <= ny < h and visited[ny, nx] for nx, ny in neighbors)
            if has_visited_neighbor:
                r, g, b, a = cleaned_arr[y, x]
                if r > 230 and g > 230 and b > 230:
                    cleaned_arr[y, x, 3] = 128

cleaned_logo = Image.fromarray(cleaned_arr, 'RGBA')

# Crop to non-transparent bounding box
bbox = cleaned_logo.getbbox()
logo_cropped = cleaned_logo.crop(bbox)
crop_w, crop_h = logo_cropped.size
print(f"Cropped logo size: {crop_w}x{crop_h}")

# --- Generate 1: splash-icon.png (512x512) ---
splash_canvas = Image.new('RGBA', (512, 512), (0, 0, 0, 0))
# Scale logo to ~460x460
scale_splash = 460 / max(crop_w, crop_h)
splash_w = int(crop_w * scale_splash)
splash_h = int(crop_h * scale_splash)
splash_logo = logo_cropped.resize((splash_w, splash_h), Image.Resampling.LANCZOS)
splash_pos = ((512 - splash_w) // 2, (512 - splash_h) // 2)
splash_canvas.paste(splash_logo, splash_pos, splash_logo)
splash_canvas.save(os.path.join(assets_dir, 'splash-icon.png'), 'PNG')
print("Generated splash-icon.png (512x512)")

# --- Generate 2: icon.png (1024x1024) ---
# Clean 1024x1024 with white background and centered logo
icon_canvas = Image.new('RGBA', (1024, 1024), (255, 255, 255, 255))
scale_icon = 940 / max(crop_w, crop_h)
icon_w = int(crop_w * scale_icon)
icon_h = int(crop_h * scale_icon)
icon_logo = logo_cropped.resize((icon_w, icon_h), Image.Resampling.LANCZOS)
icon_pos = ((1024 - icon_w) // 2, (1024 - icon_h) // 2)
icon_canvas.paste(icon_logo, icon_pos, icon_logo)
icon_canvas.save(os.path.join(assets_dir, 'icon.png'), 'PNG')
print("Generated icon.png (1024x1024)")

# --- Generate 3: android-icon-foreground.png (1024x1024) ---
# Android safe zone is 66% (circle of diameter ~682px).
# To make it comfortably fit inside any launcher (Circle, Squircle, Rounded Square)
# without being cut off or looking zoomed in, size to 580x580 (56% of canvas).
android_fg = Image.new('RGBA', (1024, 1024), (0, 0, 0, 0))
scale_android = 580 / max(crop_w, crop_h)
afg_w = int(crop_w * scale_android)
afg_h = int(crop_h * scale_android)
afg_logo = logo_cropped.resize((afg_w, afg_h), Image.Resampling.LANCZOS)
afg_pos = ((1024 - afg_w) // 2, (1024 - afg_h) // 2)
android_fg.paste(afg_logo, afg_pos, afg_logo)
android_fg.save(os.path.join(assets_dir, 'android-icon-foreground.png'), 'PNG')
print(f"Generated android-icon-foreground.png (1024x1024, logo size: {afg_w}x{afg_h})")

# --- Generate 4: android-icon-background.png (1024x1024) ---
android_bg = Image.new('RGBA', (1024, 1024), (255, 255, 255, 255))
android_bg.save(os.path.join(assets_dir, 'android-icon-background.png'), 'PNG')
print("Generated android-icon-background.png (1024x1024)")

# --- Generate 5: android-icon-monochrome.png (1024x1024) ---
# Dark charcoal monochrome silhouette inside the same safe zone
mono_logo = afg_logo.convert('L')
mono_arr = np.array(afg_logo)
# Make white pixels transparent and orange pixels dark charcoal
alpha = mono_arr[:, :, 3]
is_colored = (mono_arr[:, :, 0] > 100) & (alpha > 50)
mono_output = np.zeros((1024, 1024, 4), dtype=np.uint8)
# Paste onto canvas
for y in range(afg_h):
    for x in range(afg_w):
        if afg_logo.getpixel((x, y))[3] > 30:
            # Charcoal color for themed icon
            mono_output[afg_pos[1] + y, afg_pos[0] + x] = [40, 40, 40, afg_logo.getpixel((x, y))[3]]

Image.fromarray(mono_output, 'RGBA').save(os.path.join(assets_dir, 'android-icon-monochrome.png'), 'PNG')
print("Generated android-icon-monochrome.png (1024x1024)")

# --- Generate 6: favicon.png (48x48) ---
fav = logo_cropped.resize((48, 48), Image.Resampling.LANCZOS)
fav.save(os.path.join(assets_dir, 'favicon.png'), 'PNG')
print("Generated favicon.png (48x48)")

print("All mobile assets successfully created!")

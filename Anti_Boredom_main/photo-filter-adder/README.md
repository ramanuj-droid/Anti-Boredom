
# 📸 Snapchat-like Photo Filter Adder

An interactive photo editing application that allows users to upload photos, apply real-time filters, add stickers/emojis, and download their edited images. Built entirely with HTML, CSS, and JavaScript (Canvas API) for Hacktoberfest 2025.

![Photo Editor](https://img.shields.io/badge/Photo-Editor-purple)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Canvas](https://img.shields.io/badge/Canvas-API-orange)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎨 About The Project

Snapchat-like Photo Filter Adder is a fully client-side photo editing tool inspired by popular social media filters. Upload any image, apply stunning filters, customize with manual adjustments, add fun stickers, and download your masterpiece - all without leaving your browser!

## ✨ Key Features

- 📷 **Image Upload** - Support for JPG, PNG, GIF, WEBP formats
- 🎨 **8 Preset Filters** - Original, Grayscale, Sepia, Invert, Blur, Vintage, Cool, Warm
- 🎛️ **Manual Adjustments** - Fine-tune Brightness (0-200%), Contrast (0-200%), Saturation (0-200%)
- 😊 **15 Stickers/Emojis** - Drag-and-drop or tap-to-place stickers on photos
- 🎯 **Interactive UI** - Animated gradients, glowing effects, floating particles
- 💾 **High-Quality Download** - Export edited images as PNG with all effects applied
- 🔄 **Reset Controls** - Separate reset for filters and stickers
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- ⚡ **No Backend** - Pure frontend using Canvas API, no server required
- 🌈 **Crazy Animations** - Rainbow text, pulsing buttons, floating particles, neon glows

## 🎭 Filter Gallery

### 🎨 Preset Filters
- **✨ Original** - No filter, pure natural photo
- **⚫ Grayscale** - Classic black and white conversion
- **🟤 Sepia** - Vintage brown-toned photo effect
- **🔄 Invert** - Reverse all colors for artistic look
- **💫 Blur** - Soft, dreamy blurred appearance
- **📸 Vintage** - Old-school photo with muted tones
- **❄️ Cool** - Blue-tinted, frosty color shift
- **🔥 Warm** - Orange-tinted, sunny glow effect

### 🎛️ Manual Adjustments
- **💡 Brightness** - Control light intensity (0-200%)
- **🎭 Contrast** - Adjust difference between light/dark (0-200%)
- **🌈 Saturate** - Modify color vibrancy (0-200%)

## 😊 Sticker Collection

**15 Emojis Available:**
- 😀 😎 🥳 😍 🤩 😂 - Emotions
- ❤️ - Love
- ⭐ 🔥 ✨ 💯 👑 - Symbols
- 🎉 🎊 🌟 - Celebrations

## 🚀 How to Use

### Getting Started

1. Open \`index.html\` in any modern web browser
2. Click **"📷 Upload Your Photo"** button
3. Select an image from your device (JPG, PNG, GIF, WEBP)
4. Image automatically loads into the editor

### Applying Filters

1. Browse the **🎨 Filters** section in the left sidebar
2. Click any filter button to apply instantly
3. See real-time preview on your photo
4. Try different filters to find your favorite look

### Manual Adjustments

1. Use the **three sliders** below filters:
   - 💡 **Brightness** - Drag to lighten or darken
   - 🎭 **Contrast** - Drag to sharpen or soften
   - 🌈 **Saturate** - Drag to boost or mute colors
2. Combine with preset filters for unique effects
3. Values display in real-time (0-200%)

### Adding Stickers

1. Scroll to **😊 Stickers** section in sidebar
2. Click any emoji to add it to your photo
3. **Desktop:** Drag stickers to reposition
4. **Mobile:** Tap and drag to move
5. **Hover** over sticker to reveal delete (×) button
6. Add multiple stickers for creative compositions

### Downloading Your Photo

1. Click **"💾 Download Image"** button
2. Final image exports as PNG with:
   - All filters applied
   - All stickers in position
   - High quality (original resolution)
3. File saves as: \`filtered-photo-[timestamp].png\`

### Reset & Clear Options

- **🔄 Reset Filters** - Remove all filters, keep stickers
- **🗑️ Clear Stickers** - Remove all stickers, keep filters
- **Both buttons** available anytime for quick edits

## 🛠️ Technologies Used

### Core Technologies
- **HTML5** - Structure and Canvas element
- **CSS3** - Styling, animations, and visual effects
- **JavaScript (ES6+)** - Image processing and interactivity

### CSS Features
- Animated gradient backgrounds
- Glassmorphism effects (backdrop-blur)
- Floating particle animations
- Rainbow text gradients
- Glowing neon borders
- Smooth transitions and transforms
- Responsive media queries

### JavaScript Features
- Canvas API for image manipulation
- File API for image upload
- CSS filters (grayscale, sepia, blur, etc.)
- Drag-and-drop functionality
- Real-time slider adjustments
- Dynamic sticker positioning
- PNG export with composite rendering

### Canvas API Operations
- \`drawImage()\` - Render uploaded photos
- \`ctx.filter\` - Apply CSS filters to canvas
- \`fillText()\` - Draw stickers as text/emoji
- \`toDataURL()\` - Export canvas as PNG
- Shadow effects for sticker depth

## 📦 File Structure

\`\`\`
photo-filter-adder/
├── index.html          # Complete application (HTML + CSS + JS)
├── README.md          # This file
└
\`\`\`

## 💻 Installation & Usage

### Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/aryanraj34/Anti-Boredom.git

# Navigate to project folder
cd Anti-Boredom/photo-filter-adder

# Open in browser
# Method 1: Double-click index.html
# Method 2: Use local server (recommended)

# Python 3
python -m http.server 8000
# Then open: http://localhost:8000

# Node.js (if you have npx)
npx serve
\`\`\`

### Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Opera 76+

### Mobile Support

- ✅ iOS Safari 14+
- ✅ Android Chrome 90+
- ✅ Samsung Internet 14+
- 📱 Touch-optimized for mobile devices
- 👆 Tap-to-place stickers on mobile

## 🎯 Usage Tips

### Best Practices

**For Portrait Photos:**
- Use **Warm** filter for natural skin tones
- Increase **Brightness** by 10-20%
- Add subtle stickers like ✨ or 💫

**For Landscape Photos:**
- Try **Cool** filter for scenic views
- Boost **Saturate** to 130-150%
- Adjust **Contrast** for dramatic sky

**For Vintage Look:**
- Apply **Sepia** or **Vintage** filter
- Reduce **Saturate** to 70-80%
- Add nostalgic stickers like 📸

**For Black & White Art:**
- Use **Grayscale** filter
- Increase **Contrast** to 140-160%
- Minimal stickers (⭐ 💫) for accent

### Keyboard Shortcuts
*(Future Enhancement)*
- \`Ctrl/Cmd + Z\` - Undo last action
- \`Ctrl/Cmd + S\` - Download image
- \`Delete\` - Remove selected sticker

## 🎨 Filter Combinations

### Popular Presets

**Instagram-Style:**
1. Apply **Cool** or **Warm** filter
2. Brightness: 110-120%
3. Saturate: 130-150%
4. Add trending emojis: ✨💯🔥

**Old Photo Effect:**
1. Apply **Vintage** filter
2. Contrast: 110-120%
3. Saturate: 70-80%
4. Add: 📸 sticker

**Dreamy Aesthetic:**
1. Apply **Blur** filter
2. Brightness: 120%
3. Saturate: 140%
4. Add: 🌟✨💫

**High Contrast Pop:**
1. Apply **Original** filter
2. Contrast: 150-160%
3. Saturate: 150%
4. Add: 🔥💯

## 🤝 Contributing

This project was created for **Hacktoberfest 2025**. Contributions are welcome!

### How to Contribute

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Contribution Ideas

- Add more preset filters (HDR, Noir, Cinematic, etc.)
- Implement text overlay feature
- Add crop/rotate functionality
- Create filter intensity slider (0-100%)
- Add undo/redo functionality
- Implement layer system for stickers
- Add custom sticker upload
- Create filter preview thumbnails
- Add sharing to social media
- Implement batch processing
- Add photo collage maker
- Create GIF animation from photos

## 🐛 Known Issues

- Large images (>5MB) may take time to process
- Some mobile browsers limit canvas size
- Sticker drag on iOS requires careful touch
- Very high resolution images may slow performance

## 📝 Future Enhancements

- [ ] More filters (20+ total: HDR, Noir, Fade, etc.)
- [ ] Text overlay with custom fonts
- [ ] Crop and rotate tools
- [ ] Filter intensity control (0-100%)
- [ ] Undo/redo functionality (Ctrl+Z)
- [ ] Custom sticker upload
- [ ] Layer management for stickers
- [ ] Preset filter templates
- [ ] Before/After comparison slider
- [ ] Share directly to social media
- [ ] Batch photo editing
- [ ] Photo collage creator
- [ ] Export to different formats (JPG, WEBP)
- [ ] Save presets for future use
- [ ] AI-powered auto-enhance

## 📄 License

This project is licensed under the **MIT License**:

\`\`\`
MIT License

Copyright (c) 2025 Photo Filter Adder

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
\`\`\`

## 👨‍💻 Author

Created with ❤️ for **Hacktoberfest 2025**

**GitHub:** [@aryanraj34](https://github.com/aryanraj34)

## 🙏 Acknowledgments

- Inspired by Snapchat and Instagram filters
- Canvas API documentation from MDN Web Docs
- Emoji graphics from Unicode Standard
- Thanks to the Hacktoberfest community
- Built for creative photo editing and fun!

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/ramanuj-droid/Anti-Boredom/issues) page
2. Create a new issue with detailed description
3. Include browser version and screenshot if applicable
4. Contact the repository maintainer

## ⭐ Show Your Support

If you found this project helpful or fun, please give it a ⭐ on GitHub!

## 🎮 Related Projects

Check out other creative tools in this repository:
- 🌊 **Underwater Explorer** - Deep sea adventure game
- 🎰 **Casino Game Suite** - Collection of 5 casino games
- 🏰 **Army Base Builder** - Interactive base design tool

---

**Made for Hacktoberfest 2025** 🎃

**Upload. Filter. Sticker. Download. Share your creativity!** 📸✨🎨


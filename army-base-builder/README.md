
# 🏰 Army Base Builder

An interactive military base builder where users can design and organize their own army base by placing barracks, defenses, training grounds, and other structures on a grid-based map. Built entirely with HTML, CSS, and JavaScript for Hacktoberfest 2025.

![Military](https://img.shields.io/badge/Military-Base%20Builder-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-green)

## 🎮 About The Project

Army Base Builder is an interactive web-based tool that lets you design and customize your military base layout. Drag and drop buildings, customize their appearance, save your designs, and create the ultimate strategic base layout!

## ✨ Key Features

- 🗺️ **Interactive Grid Map** - 20x15 grid (300 cells) for base placement
- 🖱️ **Drag & Drop Interface** - Intuitive building placement from toolbar
- 🏗️ **9 Building Types** - Military, defense, and resource structures
- 🎨 **Full Customization** - Change building levels, colors, and names
- 💾 **Save/Load System** - Preserve your base designs in browser storage
- 🗑️ **Easy Management** - Delete individual buildings or clear entire map
- 📱 **Responsive Design** - Works on desktop, tablet, and mobile
- ⚡ **No Dependencies** - Pure vanilla JavaScript, no frameworks

## 🏛️ Building Categories

### ⚔️ Military Structures
- **🏛️ Barracks** - House your troops
- **🎯 Training Ground** - Train soldiers in combat
- **⚔️ Armory** - Store weapons and equipment

### 🛡️ Defense Structures
- **🗼 Watch Tower** - Monitor surroundings
- **🧱 Wall** - Protect your base perimeter
- **💣 Cannon** - Defensive artillery

### 🏗️ Resource Structures
- **📦 Storage** - Store supplies and resources
- **🏭 Factory** - Produce military equipment
- **⛏️ Mine** - Extract resources

## 🚀 How to Use

### Getting Started

1. Open \`index.html\` in any modern web browser
2. You'll see a toolbar on the left with building options
3. A large grid map in the center for base layout
4. Control buttons at the top for map management

### Placing Buildings

1. **Select** a building from the left toolbar
2. **Drag** it onto the grid map
3. **Drop** it on any green cell
4. The building is now placed!

### Customizing Buildings

1. **Click** on any placed building to select it
2. Customization panel appears below the map
3. **Adjust** the following options:
   - Building Level (1-5)
   - Border Color (color picker)
   - Custom Name (text input)
4. Click **"Apply Changes"** to save

### Managing Your Base

- **Delete Building**: Hover over a building and click the ❌ button
- **Clear Map**: Remove all buildings at once (requires confirmation)
- **Save Base**: Store your current design in browser storage
- **Load Base**: Restore previously saved design
- **Help**: View detailed instructions

## 🛠️ Technologies Used

### Core Technologies
- **HTML5** - Structure and layout
- **CSS3** - Styling, animations, and grid system
- **JavaScript (ES6+)** - Drag-and-drop logic and interactivity

### CSS Features
- CSS Grid for map layout
- Flexbox for toolbar and controls
- Gradient backgrounds
- Smooth transitions and hover effects
- Responsive media queries

### JavaScript Features
- Drag and Drop API
- LocalStorage for save/load
- DOM manipulation
- Event listeners (click, dragover, drop)
- Dynamic element creation
- Data attributes for tracking

## 📦 File Structure

\`\`\`
army-base-builder/
├── index.html          # Complete application (HTML + CSS + JS)
├── README.md          # This file
└── screenshots/       # Optional: Game screenshots
    ├── overview.png
    ├── toolbar.png
    ├── customization.png
    └── saved-base.png
\`\`\`

## 💻 Installation & Usage

### Quick Start

\`\`\`bash
# Clone the repository
git clone https://github.com/YOUR-USERNAME/Anti-Boredom.git

# Navigate to project folder
cd Anti-Boredom/army-base-builder

# Open in browser
# Just double-click index.html
# OR use a local server:

# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
\`\`\`

### Browser Compatibility

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Opera 76+

### Mobile Support

- ✅ iOS Safari 14+ (Responsive grid: 10x10)
- ✅ Android Chrome 90+ (Responsive grid: 10x10)
- ✅ Tablet devices (Grid: 15x12)

## 🎯 Usage Tips

### Strategic Placement
- Place **Watch Towers** at corners for maximum coverage
- Put **Walls** around perimeter for defense
- Group **Barracks** near **Training Grounds** for efficiency
- Position **Storage** and **Factory** in protected central areas

### Keyboard Shortcuts
- Click building to select
- Hover to reveal delete button
- Drag from toolbar to place
- Drop on grid cell to confirm

### Save/Load Tips
- Save regularly to prevent losing progress
- Only one save slot available (latest save overwrites)
- Save data persists in browser localStorage
- Clear browser data removes saved bases

## 🔧 Customization Options

### Building Levels
- Level 1-5 available for all buildings
- Visual indicator through customization panel
- Represents building strength/capacity

### Color Customization
- Choose any color for building borders
- Default: Gold (#FFD700)
- Helps differentiate building types
- Purely visual enhancement

### Custom Names
- Override default building names
- Useful for organizing large bases
- Names stored with building data
- Displayed in customization panel

## 🤝 Contributing

This project was created for **Hacktoberfest 2025**. Contributions are welcome!

### How to Contribute

1. Fork the repository
2. Create feature branch (\`git checkout -b feature/AmazingFeature\`)
3. Commit changes (\`git commit -m 'Add AmazingFeature'\`)
4. Push to branch (\`git push origin feature/AmazingFeature\`)
5. Open a Pull Request

### Contribution Ideas

- Add more building types (Hospital, Airport, Helipad)
- Implement multi-grid support (multiple bases)
- Add building stats and tooltips
- Create base templates (quick-start layouts)
- Add export/import JSON functionality
- Implement undo/redo functionality
- Add grid size customization
- Create building upgrade animations

## 🐛 Known Issues

- None currently reported

## 📝 Future Enhancements

- [ ] More building types (20+ structures)
- [ ] Multi-base management
- [ ] Export/Import base designs (JSON)
- [ ] Building stats and information tooltips
- [ ] Undo/redo functionality
- [ ] Grid size customization
- [ ] Base templates/presets
- [ ] Building upgrade animations
- [ ] Day/night visual mode
- [ ] Sound effects for placing/removing buildings

## 📄 License

This project is licensed under the **MIT License**:

\`\`\`
MIT License

Copyright (c) 2025 Army Base Builder

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

**GitHub:** [@aryanraj45](https://github.com/aryanraj45)

## 🙏 Acknowledgments

- Thanks to the Hacktoberfest community
- Inspired by classic RTS base-building games
- Built for strategic planning and creative fun!

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/ramanuj-droid/Anti-Boredom/issues) page
2. Create a new issue with detailed description
3. Contact the repository maintainer

## ⭐ Show Your Support

If you found this project helpful or fun, please give it a ⭐ on GitHub!

## 🎮 Related Projects

Check out other games in this repository:
- 🌊 **Underwater Explorer** - Deep sea adventure game
- 🎰 **Casino Game Suite** - Collection of 5 casino games

---

**Made for Hacktoberfest 2025** 🎃

**Strategy. Planning. Building. Command your base!** 🏰⚔️


# 🔨 Whack-a-Mole Game

A fun and addictive browser-based Whack-a-Mole game built with vanilla JavaScript, HTML, and CSS. Test your reflexes and hand-eye coordination by whacking as many moles as possible before time runs out!

![Game Preview](https://img.shields.io/badge/Status-Complete-success)
![HTML](https://img.shields.io/badge/HTML-5-E34F26?logo=html5)
![CSS](https://img.shields.io/badge/CSS-3-1572B6?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-F7DF1E?logo=javascript)

## 🎮 Features

- **Addictive Gameplay**: Classic whack-a-mole mechanics with smooth animations
- **30-Second Challenge**: Race against time to get the highest score
- **Score Tracking**: Real-time score display with persistent high score storage
- **Random Mole Appearance**: Moles pop up at random intervals (500-1200ms) for unpredictable gameplay
- **Visual Feedback**: Satisfying whack animations and effects
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local High Score**: Uses localStorage to save your best score
- **Clean UI**: Modern, colorful interface with intuitive controls

## 🚀 How to Play

1. Click the **"🎮 Start Game"** button to begin
2. Moles (represented by 🦫) will randomly pop up from the holes
3. Click on the moles as quickly as possible before they disappear
4. Each successful hit earns you **1 point**
5. The game lasts **30 seconds**
6. Try to beat your high score!

## 📁 File Structure

```
Whack_A_Mole/
├── index.html      # Main HTML structure
├── style.css       # Styling and animations
├── script.js       # Game logic and interactivity
└── README.md       # Documentation (this file)
```

## 💻 Installation & Setup

1. **Clone or download** this repository
2. **Open** `index.html` in any modern web browser
3. **Start playing!** No build process or dependencies required

```bash
# If using git
git clone https://github.com/ramanuj-droid/Anti-Boredom.git
cd Whack_A_Mole

# Open in browser
open index.html  # macOS
start index.html # Windows
xdg-open index.html # Linux
```

## 🎨 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with gradients, animations, and flexbox/grid
- **Vanilla JavaScript**: ES6+ features, DOM manipulation, localStorage API

## 🌟 Key Highlights

### Game Mechanics
- Random mole appearance with variable timing
- Collision detection for accurate hit registration
- Countdown timer with automatic game end
- Prevents multiple hits on the same mole

### Visual Effects
- Smooth mole pop-up animations
- Explosion effect (💥) on successful hits
- Bounce animation for active moles
- Hover and click effects on holes

### Data Persistence
- High score saved to browser's localStorage
- Automatically loads previous high score on page load
- Displays "New High Score" celebration when beaten

## 📱 Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🎯 Future Enhancements

Potential features for future versions:
- [ ] Multiple difficulty levels (Easy, Medium, Hard)
- [ ] Different mole types with varying point values
- [ ] Power-ups and special abilities
- [ ] Sound effects and background music
- [ ] Multiplayer mode
- [ ] Global leaderboard
- [ ] Customizable game duration
- [ ] Different themes/skins

## 🤝 Contributing

Contributions are welcome! Feel free to:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👏 Acknowledgments

- Emoji icons used for moles and effects
- Inspired by the classic carnival Whack-a-Mole game
- Built as part of the Anti-Boredom project

## 📧 Contact

For questions, suggestions, or feedback, please open an issue in the repository.

---

**Enjoy the game and happy whacking! 🔨🦫**
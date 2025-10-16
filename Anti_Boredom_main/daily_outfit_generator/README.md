# 👕 Daily Outfit Generator

A **fun, responsive web app** that suggests a **random outfit each day**, generated locally using simple APIs — no internet required!  
Built with **HTML, CSS, and JavaScript** only.

---

## 🌟 Features

- 🗓️ **Daily Outfit Suggestion** — deterministic (same outfit for everyone each day)
- ⚡ **Local API Simulation** — all data fetched locally using async JS functions
- ⭐ **Favorites Section** — save, view, or delete your favorite outfits
- 🕶️ **Occasion Filter** — choose between *Casual*, *Formal*, *Party*, or *Sporty*
- 🌈 **Theme Toggle** — switch between light & dark modes
- 🎲 **Random Outfit Button** — explore more suggestions instantly
- 📋 **Copy / Share Buttons** — easily share outfit ideas
- 💾 **Local Storage Support** — your favorites stay saved in your browser
- 📱 **Fully Responsive** — works great on both desktop and mobile

---

## 🧩 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | HTML5, CSS3, JavaScript (Vanilla) |
| API Simulation | Local async JS functions |
| Storage | LocalStorage |
| UI Style | Gradient cards, emoji visuals, responsive grid |

---

## 📂 Project Structure

```
📁 daily-outfit-generator
┣  index.html
┣  README.md
┣  script.js
┗  style.css
```

---

## 🚀 How to Run Locally

1. **Open the Project Folder**

```bash
Copy code
cd daily-outfit-generator
```
2. **Run the App**
Just open index.html in your web browser
(No server or build step required — 100% local!)

## 🧠 How It Works
Each day, a deterministic “seed” based on the date decides which outfit is shown.

- The app uses local data (in outfitsData array) to generate a consistent daily suggestion.

- You can override it by clicking Random or filtering by Occasion.

- All favorites are stored in your browser via localStorage.

## 💡 Possible Future Enhancements
- 🖼️ Replace emoji visuals with real outfit images (using Unsplash or custom assets)

- 📅 Add “Select Date” feature to view past/future daily outfits

- 💾 Export favorites to JSON file

- 🌐 Integrate with real fashion APIs for live recommendations

## 🧑‍💻 Author : **Subha Hens**

*Made with ❤️ using HTML, CSS & JavaScript*
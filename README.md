# 🎧 Spotify Web Player Clone

A fully responsive, JavaScript-powered clone of the Spotify Web Player — stream mock playlists, explore albums, and enjoy an interactive UI just like the real thing!

> 🚀 Built with vanilla HTML, CSS, and JavaScript (no frameworks).

---

## 📌 Features

### 🎵 Music Playback
- Plays songs from local `songs/` folder
- Play/Pause, Next/Previous controls
- Seek bar with live progress tracking
- Volume control and mute toggle
- Spacebar for play/pause (keyboard shortcut)

### 💽 Albums & UI
- Dynamically lists albums and playlists from `/songs/` directory
- Fetches metadata from `info.json` per album
- Album cards with cover images and descriptions
- Responsive layout (desktop/mobile)
- Custom scroll, hover effects, and animations

### 📂 Folder-Based Song Loading
- Organizes tracks into separate folders
- Each folder has its own `cover.jpg` and `info.json`
- Automatically loads all `.mp3` files

### 📱 Mobile Navigation
- Hamburger menu for sidebar on smaller screens
- Slide-in/out animation for library navigation

---

## 📁 Project Structure

```bash
spotify-web-player-clone/
├── index.html
├── style.css
├── utility.css
├── script.js
├── /img/                # All icons (play.svg, logo.svg, hamburger.svg, etc.)
└── /songs/
    ├── atbsm/
    │   ├── Artist1 - Track One.mp3
    │   ├── Artist2 - Track Two.mp3
    │   ├── cover.jpg
    │   └── info.json
    └── chillbeats/
        ├── ChillMaster - Relaxing Tune.mp3
        ├── ChillMaster - Sunset Ride.mp3
        ├── cover.jpg
        └── info.json
````

### 🔎 Sample `info.json`

Each album folder should include an `info.json` file with metadata:

```json
{
  "title": "Chill Beats",
  "description": "Lo-fi chillhop vibes for working, studying, or relaxing. Powered by ChillMaster."
}
```

---

## ⚙️ Setup & Running the Project

1. **Clone this repository**

   ```bash
   git clone https://github.com/prangggshu/spotify-clone.git
   cd spotify-clone
   ```

2. **Add your own albums and music**

   * Create folders inside `/songs/`
   * Add `.mp3` files, `cover.jpg`, and `info.json` in each

3. **Use a local server** (recommended for `fetch()` to work)

   * Using Python:

     ```bash
     # For Python 3.x
     python -m http.server
     ```
   * Or use VS Code Live Server extension

4. **Open in your browser**

   Go to: `http://localhost:8000` or the port your server is running on.

---

## 🧠 How It Works

* **JavaScript** dynamically reads folder contents and builds the UI
* Uses `fetch()` to load album metadata and song lists
* Tracks are loaded via HTML5 `<audio>` with programmatic controls
* UI updates in real-time as users interact

---

## 📜 License

MIT License — feel free to use, modify, and share.

---

## 🙌 Contributions

Want to improve this? Submit a pull request or open an issue!

---

## 🎨 Screenshot

> ![alt text](image-1.png)
![alt text](image.png)
![alt text](image-2.png)
---

## 💡 Credits

Inspired by Spotify's official web player UI
Music: Use your own or royalty-free tracks



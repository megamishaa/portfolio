# PORTFOLIO_OS :: CYBER ARCADE PORTFOLIO

A full-stack interactive portfolio built as a retro OS/arcade terminal experience.
Windows, draggable panels, CRT effects, and your animated flower background.

---

## FOLDER STRUCTURE

```
portfolio/
├── backend/
│   ├── data/
│   │   ├── projects.json       ← edit your projects here
│   │   ├── skills.json         ← edit your skills here
│   │   └── experience.json     ← edit your experience here
│   ├── server.js               ← Express API server
│   └── package.json
│
└── frontend/
    ├── public/
    │   └── flower1.jpg         ← PUT YOUR FLOWER IMAGE HERE
    ├── src/
    │   ├── components/
    │   │   ├── ui/
    │   │   │   ├── AnimatedBackground.jsx  ← your dot-flower canvas
    │   │   │   ├── Landing.jsx             ← boot screen
    │   │   │   ├── PixelWindow.jsx         ← draggable window base
    │   │   │   ├── Sidebar.jsx             ← left nav
    │   │   │   └── Taskbar.jsx             ← top bar
    │   │   └── windows/
    │   │       ├── AboutWindow.jsx
    │   │       ├── SkillsWindow.jsx
    │   │       ├── ProjectsWindow.jsx
    │   │       ├── ExperienceWindow.jsx
    │   │       └── ContactWindow.jsx
    │   ├── context/
    │   │   └── WindowContext.jsx           ← window state manager
    │   ├── styles/
    │   │   └── globals.css                 ← all CRT/pixel/neon styles
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

---

## QUICK START

### 1. Start the backend
```bash
cd backend
npm install
npm run dev        # starts on http://localhost:3001
```

### 2. Start the frontend
```bash
cd frontend
npm install
npm run dev        # starts on http://localhost:5173
```

The Vite dev server proxies `/api/*` to the backend automatically.

### 3. Add your flower image
Copy your `flower1.jpg` (or `new.html` flower image) into:
```
frontend/public/flower1.jpg
```

---

## PLUGGING IN YOUR EXISTING new.html BACKGROUND

You have two options:

### Option A — iframe (simplest, zero code changes)
Open `frontend/src/components/ui/AnimatedBackground.jsx` and replace the entire
return statement with:

```jsx
return (
  <iframe
    src="/new.html"
    style={{
      position: 'fixed', inset: 0,
      width: '100%', height: '100%',
      border: 'none', zIndex: 0,
      pointerEvents: 'none',
    }}
    title="bg"
  />
);
```
Then copy `new.html` into `frontend/public/new.html`.

### Option B — inline (better performance)
Open `AnimatedBackground.jsx` and paste your canvas animation JS
directly inside the `useEffect` hook, using `canvasRef.current` as the canvas.

---

## PERSONALISING THE CONTENT

All content is in plain JSON files — no database needed to start:

| File | What to edit |
|------|-------------|
| `backend/data/projects.json` | Your project titles, descriptions, tech, links |
| `backend/data/skills.json`   | Skill names, levels (0–100) per category |
| `backend/data/experience.json` | Job roles, companies, dates, descriptions |
| `frontend/src/components/windows/AboutWindow.jsx` | Your name, bio, email, location |
| `frontend/src/components/windows/ContactWindow.jsx` | Your email, social links |

### Adding a profile photo
In `AboutWindow.jsx`, find the avatar placeholder div and replace the `<span>` with:
```jsx
<img src="/your-photo.jpg" alt="profile" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
```
Then put your photo in `frontend/public/`.

---

## PRODUCTION BUILD

```bash
# Build frontend
cd frontend && npm run build

# The built files are in frontend/dist/
# Serve them with the Express backend:
```

In `backend/server.js`, add before `app.listen`:
```js
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  }
});
```

Then `npm start` in backend serves everything on port 3001.

---

## WINDOW SIZES & POSITIONS

Default window positions and sizes are in `WindowContext.jsx`:
```js
const INITIAL_POSITIONS = { about: { x: 80, y: 60 }, ... }
const INITIAL_SIZES     = { about: { w: 480, h: 420 }, ... }
```
Adjust as needed.

---

## TECH STACK

| Layer | Technology |
|-------|-----------|
| Frontend framework | React 18 + Vite |
| Styling | Tailwind CSS v3 |
| Animations | Framer Motion v11 |
| Background | HTML5 Canvas (your dot-flower system) |
| Backend | Node.js + Express |
| Data | JSON files (swap for MongoDB easily) |
| Fonts | Share Tech Mono (Google Fonts) |

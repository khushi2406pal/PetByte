# PetByte - Your Virtual Pet

A cozy, pixel-art desktop companion that lives on your screen and quietly helps you stay productive. Meet Mochi — a tiny panda who reacts to your tasks, focus sessions, and breaks throughout the day.

Built with Tauri v2, so it's a real native desktop app (not Electron) with a tiny memory/CPU footprint — designed to never slow down whatever you're actually working in.

> ⚠️ **Status:** Early development. This README tracks progress phase-by-phase as the project is built in the open. See **What's Built** below for the current state.

---

## ✨ What It Does

PetByte is a transparent, frameless, always-on-top desktop companion that combines:

- 🐼 **A virtual pet** — Mochi, a panda with contextual moods and reactions
- ✅ **Task management** — daily to-dos with carry-forward for unfinished items
- ⏱️ **Focus timer** — Pomodoro-style work/break sessions, synced to Mochi's animation state
- 💧 **Wellness nudges** — hydration and break reminders that don't nag

It's designed to feel like a companion sitting on your desktop, not another app window competing for your attention.

---

## 🛠️ Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Desktop shell | Tauri v2 | Rust-backed, native performance, tiny binary size vs. Electron |
| Frontend | React 18 + TypeScript (strict) | Type-safe UI, component-driven pet renderer |
| Build tool | Vite | Fast development loop for the webview frontend |
| Styling | Tailwind CSS + custom pixel-art CSS | `image-rendering: pixelated`, retro visual language |
| State management | Zustand | Lightweight, no boilerplate, ideal for a small always-running app |
| Local database | SQLite via `@tauri-apps/plugin-sql` | Fully offline, local-first, no account required |
| Rendering | HTML5 Canvas frame blitter | Per-state FPS control for sprite animation |

### Design Principles

- 🔒 **Local-first & private** — no data leaves your machine by default
- ⚡ **Low resource footprint** — designed to run quietly in the background
- 🧩 **Data-driven architecture** — new characters and animations can be added without touching core logic

---

## ✅ What's Built So Far

### Phase 1 — Project Scaffolding & Window Foundation

- Tauri v2 + React + TypeScript + Tailwind project scaffold
- Transparent, frameless, always-on-top window configuration
- Hide-until-ready window reveal to avoid the transparent-window flash on Windows
- Click-through toggle command (Passive vs. Active mode groundwork)
- Sprite-scoped window dragging (drag Mochi, not the whole window)
- System tray with menu:
  - Open
  - Reset Position
  - Toggle Mode
  - Quit
- Procedural placeholder for Mochi with no external assets required to verify the window works

---

## 🚧 What's Planned

### Phase 2 — Window & Desktop Integration

- Window position persisted to SQLite and restored on launch
- Multi-monitor disconnect/reconnect handling
- Clamp window position to visible screen bounds
- Passive/Active mode fully wired end-to-end
- Tray → frontend state → click-through integration
- Tray menu fully functional

### Phase 3 — Pet & Animation Engine

- Real Mochi sprite sheets integrated:
  - Idle
  - Walking
  - Happy
  - Sad
  - Excited
  - Working
  - Thinking
  - Sleeping
  - Drinking
  - Celebrating
- Layered body + face compositing for expressive combinations
- Accessory system:
  - Hair clips
  - Glasses
  - And more

### Phase 4 — Productivity Modules

- Task CRUD with categories and priorities
- Carry-forward for unfinished tasks
- Pomodoro/focus timer
- Mochi animation states synced with productivity sessions
- Hydration reminders
- Break reminders
- Native notifications

### Phase 5 — Personality & Dialogue

- Contextual dialogue system
- Rate-limiting to avoid repeated lines
- Multiple personality presets

### Phase 6 — Packaging

- Signed Windows installer (`.msi` / NSIS)
- Auto-update support

---
## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone [https://github.com/khushi2406pal/PetByte.git](https://github.com/khushi2406pal/PetByte.git)
cd PetByte
```
### 2. Install dependencies
```bash
npm install
```

### 3. Run in development mode

```bash
npm run tauri dev
```

### 4. Build for production

```bash
npm run tauri build
```
---

## 🏗️ Project Structure
```text
PetByte/
├── src/
│   ├── assets/
│   │   └── sprites/           # Mochi's sprite sheets & animations
│   ├── components/            # PetRenderer and UI components
│   ├── lib/                   # SQLite access layer and utilities
│   ├── store/                 # State management (Zustand)
│   └── types/                 # Shared TypeScript domain models
├── src-tauri/
│   ├── migrations/            # SQLite schema migrations
│   └── src/
│       ├── lib.rs             # System tray, window controls, and Tauri commands
│       └── main.rs            # Application entry point
├── public/                    # Static assets
├── index.html                 # App HTML template
├── package.json               # Frontend dependencies and scripts
├── tailwind.config.js         # Tailwind CSS styling setup
├── vite.config.ts             # Vite bundler configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Project documentation
```
---

PetByte is a portfolio project designed to explore native desktop architecture with Tauri, Rust, and React. It merges local-first productivity tooling with a lightweight, interactive pixel-art companion.



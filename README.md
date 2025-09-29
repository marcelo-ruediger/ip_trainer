# 🌐 IPv4/IPv6 Network Trainer

[![PWA](https://img.shields.io/badge/PWA-enabled-blue?logo=pwa)](https://web.dev/progressive-web-apps/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.0.0-yellow?logo=vite)](https://vitejs.dev/)

A comprehensive **Progressive Web App** for German **IHK Fachinformatiker** exam preparation. Master IPv4 and IPv6 networking through practical address calculations with **offline support** and **native app experience**. Available in **German and English**.

## 🚀 Quick Start

```bash
git clone https://github.com/Manobrawn/ip_trainer.git
cd ip_trainer
npm install
npm run dev
```

Visit `http://localhost:5173/ip_trainer/` and install as PWA for offline use!

## ✨ Key Features

| Feature              | IPv4                                           | IPv6                                       |
| -------------------- | ---------------------------------------------- | ------------------------------------------ |
| **Address Types**    | All 15 types (A-E, private/public, special)    | Global Unicast, Link-Local, ULA, Multicast |
| **Calculations**     | Network, broadcast, host count (RFC compliant) | Address formats, prefix planning, subnets  |
| **Special Cases**    | APIPA, CGN, Documentation, /31, /32 networks   | Documentation, special addresses           |
| **Real-World Focus** | 50% private networks, 24% public examples      | 75% Global Unicast addresses               |

### 📱 Progressive Web App

-   **🔄 Offline-first**: Works without internet after first visit
-   **📲 Installable**: Add to home screen like native app
-   **⚡ Fast**: Vite PWA with intelligent caching
-   **🔄 Auto-updates**: Background updates with notifications
-   **📱 Mobile optimized**: Touch targets, haptic feedback, responsive design

### 🎯 Smart Training System

-   **Practice Mode**: Generate scenarios → solve missing fields
-   **Input Mode**: Enter IP/subnet → calculate all parameters
-   **Visual Feedback**: Color-coded validation (red/green/gray)
-   **Bilingual Interface**: German and English for international use

## 🛠️ Tech Stack

-   **Frontend**: React 19.1 + Vite 7.0
-   **PWA**: Vite PWA Plugin (Workbox)
-   **Styling**: Custom responsive CSS
-   **Standards**: RFC-compliant IPv4/IPv6 logic
-   **Deployment**: GitHub Pages

## 📱 Installation

### As Web App

1. Visit the app in Chrome/Safari
2. Click "Install App" prompt or browser install button
3. App appears on home screen/desktop

### As PWA Benefits

-   ⚡ Instant loading
-   🔄 Offline functionality
-   📱 Native app experience
-   🔔 Update notifications
-   💾 Local caching

## 🎯 Target Audience

| Group                      | Use Case                                          |
| -------------------------- | ------------------------------------------------- |
| **IHK Students**           | German exam preparation with native interface     |
| **International Students** | English interface for global networking education |
| **Network Trainees**       | Practical IPv4/IPv6 skill building                |
| **IT Professionals**       | Quick reference and skill refreshing              |
| **Educators**              | Teaching tool with real-world examples            |

## 📊 Address Generation Logic

**IPv4 Distribution**:

-   50% Private networks (most common in practice)
-   24% Public examples (educational importance)
-   16% Special purpose (APIPA, CGN, Documentation)
-   10% Special addresses (Multicast, Reserved, Loopback)

**IPv6 Distribution**:

-   50% Must-know addresses (DNS, docs, Link-Local, ULA)
-   38% Generated Global Unicast (web/mail/CDN servers)
-   12% Special and documentation addresses

## � Development

```bash
# Development
npm run dev          # Start dev server with PWA
npm run build        # Build for production
npm run preview      # Preview production build
npm run deploy       # Deploy to GitHub Pages

# Linting
npm run lint         # ESLint check
```

## 📄 License

MIT © 2025 - Built with ❤️ for German IT Students

---

**[Live Demo](https://manobrawn.github.io/ip_trainer/)** • **[Report Bug](https://github.com/Manobrawn/ip_trainer/issues)** • **[Request Feature](https://github.com/Manobrawn/ip_trainer/issues)**

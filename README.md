# RootMate: AI Plant Companion

> **⚠️ PRODUCT DEMO / PROTOTYPE**  
> This repository contains the **Design Prototype** and **MVP Demo** for RootMate. It is intended to demonstrate the User Interface, User Experience ("Frutiger Aero" aesthetic), and "Emotional Companion" concepts.  
> It is **NOT** a production-ready application yet. Data is mocked, and backend services are simulated.

## 🌿 Project Overview
RootMate turns plant care into a relationship. Instead of just tracking watering schedules, you interact with your plants as "roommates" who have feelings, personalities, and needs.

### Key Features (Demo)
*   **Emotional Avatars**: Visual halos that represent plant health.
*   **Atmospheric UI**: Lottie animations (sun, rain) that change with plant status.
*   **Contextual Chat**: Simulate texting your plants.
*   **Frutiger Aero Design**: A nostalgic, glossy, optimistic tech aesthetic.

## 📂 Project Structure

This repository contains two main parts:

1.  **`landing-page/`**: The web marketing site.
    *   **Tech**: Standard HTML5, CSS3, Vanilla JS.
    *   **Purpose**: To convert visitors and showcase the app concept.

2.  **`mobile-react/`**: The mobile application prototype.
    *   **Tech**: React Native (Expo SDK 52+), TypeScript.
    *   **Purpose**: The core user experience demo.

## 🚀 Quick Start

### 1. Landing Page (Web)
Simply open the `index.html` file in the `landing-page` folder with any modern web browser.
```bash
# Or serve it locally
cd landing-page
# Using python simple server
python -m http.server 8000
```

### 2. Mobile App (React Native)
Prerequisites: Node.js (v18+), Expo Go app on your phone.

```bash
cd mobile-react

# 1. Install dependencies (if not done)
npm install
npx expo install

# 2. Start the Metro Bundler
npx expo start
```
*   Scan the QR code with the **Expo Go** app (Android) or Camera (iOS).
*   **Note**: If you see a "bundling failed" error regarding missing assets, ensure you have removed any invalid `require()` calls to local files that don't exist (e.g. `sun.json`). The current code uses remote URIs.

## 🛠️ Tech Stack
*   **Framework**: Expo (React Native)
*   **Language**: TypeScript
*   **Styling**: `StyleSheet`, `expo-linear-gradient`
*   **Animations**: `lottie-react-native`, `react-native-reanimated`
*   **Icons**: `lucide-react-native`



---
*Created by the RootMate Team*

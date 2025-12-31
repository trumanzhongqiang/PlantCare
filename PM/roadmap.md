# RootMate: AI Plant Companion - Product Roadmap

## 🌟 Product Vision
**"Not just a tool, but a Roommate."**
RootMate redefines plant care by turning plants into emotional companions. Using a "Frutiger Aero" / Tech Nostalgia aesthetic, we create a living, breathing digital interface where plants communicate their needs through emotion and atmosphere, not just data.

---

## 📅 Phase 1: The "Digital Soul" MVP (Completed)
**Goal:** Deliver a high-fidelity "Demo" Experience that validates the emotional core and "Frutiger Aero" aesthetic.
**Status:** ✅ Complete
**Tech Stack:** React Native (Expo), TypeScript, HTML/CSS (Landing Page).

### Key Features Delivered
1.  **"Frutiger Aero" UI System**
    -   Glossy, translucent glass cards (`GlossyCard`).
    -   Vibrant, optimistic color palettes (Teal/Sky Blue gradients).
    -   Atmospheric Lottie animations (Sun rays, Rain droplets) that layer over the UI.

2.  **"My Dorm" (Home Screen)**
    -   **Dual View**: Switch between "Stream" (immersive list) and "Grid" (compact) layouts.
    -   **Dynamic Status**: Visual badges reflecting plant health (Happy, Thirsty, Sad).
    -   **Quick Actions**: Bottom-right FAB for adding plants; Notification Bell for urgent alerts.

3.  **"The Roommate" (Detail Screen)**
    -   **Emotional Avatar**: A pulsing, glowing halo that changes color/speed based on plant status (Green=Happy, Blue=Thirsty).
    -   **Contextual Chat**: Mock AI chat interface where plants send "Good Morning" or "I'm Thirsty" texts.
    -   **Hardware Teaser**: "Link Sensor" modal showcasing future IoT integration plan.

4.  **Landing Page**
    -   Responsive HTML/CSS marketing page ("Smart Garden").
    -   Showcases the emotional connection and "Tech Nostalgia" vibe.

---

## Make it Real: Phase 2 (Next Steps)
**Goal:** Connect the "Digital Soul" to reality. Replace mock data with real local logic and basic AI.
**Focus:** Functionality & Persistence.

-   [ ] **Local Data Persistence**: Implement `SQLite` or `AsyncStorage` to save added plants permanently.
-   [ ] **Real Camera Integration**: Allow users to take and crop actual photos of their plants.
-   [ ] **Basic LLM Integration**: Connect "Contextual Chat" to a real API (Gemini/OpenAI) for dynamic responses.
-   [ ] **Watering Logic**: Implement the "Water" action to actually reset the plant's status and date.

---

## Phase 3: The "Connected Ecosystem"
**Goal:** Hardware integration and social features.

-   [ ] **RootMate Sensor (IoT)**: Prototype the Soil/Light sensor (ESP32) that communicates with the app via BLE/WiFi.
-   [ ] **"Plant Dates"**: Lightweight social feature to match plants with similar care needs.
-   [ ] **Advanced Atmosphere**: distinct animations for Day/Night cycles synchronized with real time.

---

## ⚠️ Implementation Note
This project is currently a **Product Demo / Prototype**. 
-   Data is mocked/static.
-   AI interactions are simulated.
-   Hardware integration is UI-only.
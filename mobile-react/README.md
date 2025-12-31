# RootMate Mobile App (MVP) 🌱

**RootMate** is your "Plant Roommate" application. It transforms plant care from a chore into a social connection, treating your plants as living, breathing roommates with their own personalities.

## 📱 Features

*   **My Dorm (Home)**: A dashboard of your green roommates, displaying their emotional status (e.g., "Happy", "Thirsty") instead of dry data.
*   **Plant Persona (Detail)**: Interact with your plants via a chat-like interface. They will tell you how they feel!
*   **Frutiger Aero Design**: A nostalgic, glossy, and human-centric UI aesthetic (Teal gradients, glassmorphism).

## 🛠 Tech Stack

*   **Framework**: [React Native](https://reactnative.dev/) with [Expo](https://expo.dev/) (SDK 54)
*   **Language**: TypeScript
*   **Navigation**: React Navigation (Native Stack)
*   **UI/Icons**: Lucide React Native, Expo Linear Gradient

## 🚀 Getting Started

### Prerequisites

*   Node.js (LTS recommended)
*   npm or yarn
*   Expo Go app installed on your physical device (Android/iOS)

### Installation

1.  Navigate to the project directory:
    ```bash
    cd mobile-react
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  **Important Fix for Android**:
    Ensure `react-native-screens` is pinned to version `~4.16.0` to avoid the `java.lang.String cannot be cast to java.lang.Boolean` error on Android with Expo 54.
    ```bash
    npm install react-native-screens@~4.16.0
    ```

### Running the App

1.  Start the development server:
    ```bash
    npx expo start
    ```

2.  To clear the cache (recommended if you face issues):
    ```bash
    npx expo start --clear
    ```

3.  **Run on Device**:
    *   **Android**: Scan the QR code with the Expo Go app.
    *   **iOS**: Open the Camera app and scan the QR code.
    *   **Web**: Press `w` in the terminal.

## 📂 Project Structure

```
mobile-react/
├── App.tsx                 # Entry/Root component
├── src/
│   ├── components/         # Reusable UI (GlossyCard, etc.)
│   ├── data/               # Mock data (Plant roommates)
│   ├── navigation/         # Navigators (Stack, Tabs)
│   ├── screens/            # Main Views (Home, Detail, Add)
│   └── theme/              # Design System (Frutiger Aero colors)
└── app.json                # Expo configuration
```

## ⚠️ Known Issues

*   **Android Crash**: If you see `java.lang.String cannot be cast to java.lang.Boolean`, please run `npm install react-native-screens@~4.16.0` and restart with `--clear`.

---
*Built with 💚 for plant parents everywhere.*

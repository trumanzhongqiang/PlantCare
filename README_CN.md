# RootMate: AI 绿植伴侣 (AI Plant Companion)

> **⚠️ 产品演示 / 原型 (PRODUCT DEMO / PROTOTYPE)**  
> 本仓库包含 RootMate 的 **设计原型** 和 **MVP 演示**。旨在展示用户界面、用户体验（"Frutiger Aero" 审美）以及“情感化伴侣”的产品理念。  
> 这 **不是** 一个已准备好生产的应用程序。数据是模拟的，后端服务也是模拟的。

## 🌿 项目概览
RootMate 将植物养护转化为一种“关系”。你不再只是对着时间表浇水，而是将植物视为有感觉、有个性、有需求的“室友”。

### 核心功能 (演示版)
*   **情感化形象 (Emotional Avatars)**：代表植物健康状态的视觉光环。
*   **氛围感 UI (Atmospheric UI)**：随植物状态变化的 Lottie 动画（阳光、雨滴）。
*   **情境化聊天 (Contextual Chat)**：模拟与植物发短信的体验。
*   **Frutiger Aero 设计**：一种怀旧、光泽感、乐观的科技审美风格。

## 📂 项目结构

本仓库包含两个主要部分：

1.  **`landing-page/`**：Web 营销站点。
    *   **技术栈**：标准 HTML5, CSS3,原生 JS。
    *   **用途**：转化访客并展示 APP 概念。

2.  **`mobile-react/`**：移动端 APP 原型。
    *   **技术栈**：React Native (Expo SDK 52+), TypeScript。
    *   **用途**：核心用户体验演示。

## 🚀 快速开始

### 1. 落地页 (Web)
直接用任何现代浏览器打开 `landing-page` 文件夹中的 `index.html` 文件即可。
```bash
# 或者在本地启动服务
cd landing-page
# 使用 python 简易服务器
python -m http.server 8000
```

### 2. 移动端 APP (React Native)
前置要在：Node.js (v18+), 手机上安装 Expo Go APP。

```bash
cd mobile-react

# 1. 安装依赖 (如果尚未安装)
npm install
npx expo install

# 2. 启动 Metro Bundler
npx expo start
```
*   使用 **Expo Go** APP (Android) 或相机 (iOS) 扫描终端中的二维码。
*   **注意**：如果遇到关于 asset 缺失的 "bundling failed" 错误，请确保你移除了任何指向不存在本地文件（如 `sun.json`）的 `require()` 调用。当前代码应使用远程 URIs。

## 🛠️ 技术栈
*   **框架**: Expo (React Native)
*   **语言**: TypeScript
*   **样式**: `StyleSheet`, `expo-linear-gradient`
*   **动画**: `lottie-react-native`, `react-native-reanimated`
*   **图标**: `lucide-react-native`

## 🔮 未来路线图
详见 [roadmap.md](./roadmap.md) (英文)。
-   **第二阶段**: 真实的 AI 聊天集成 & 本地数据持久化。
-   **第三阶段**: IoT 硬件传感器集成。

---
*Created by the RootMate Team*

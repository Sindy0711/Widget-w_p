# Pulse Board (Dashboard)

A stunning, responsive, personalized personal dashboard application built with **React 19**, **TypeScript**, **Vite**, **TailwindCSS v4**, and **Zustand**. Optimized for instant static and serverless deployment to **Vercel**.

## Features
- **Smart Greeting & Local Time**: Automatically adapts greetings based on the time of day.
- **Weather Widget**: Integrated live local forecast utilizing OpenWeather API.
- **Pomodoro Timer**: Complete productivity flow timer with authentic audio session completion alerts.
- **Todo Manager**: Persistent task manager stored safely in browser local storage.
- **Client-side API Key Management**: Dedicated UI allowing users to bring their own API Keys without risking upstream limitations.

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment & Security Architecture

This application is purposefully designed to run seamlessly on **Vercel** with top-tier API security:

### 1. Serverless Proxy Integration
To prevent exposing sensitive API keys directly in client-side bundles, API calls route internally through a serverless middleman:
- Upstream network fetches call `/api/weather` internally.
- The **Vercel Serverless Function** (`api/weather.js`) securely injects the production API Key configured directly inside Vercel's private **Environment Variables** console.

### 2. Client-side Fallback & Customization
- Users can utilize the **Api Keys** configuration panel within the app to enter custom OpenWeather credentials stored securely in browser `localStorage`.
- When custom keys are detected, the app automatically switches to direct client-side requests to maximize speed and localized usage quotas.

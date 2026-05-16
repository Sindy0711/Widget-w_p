# Pulse Board

Pulse Board is a responsive personal dashboard built with React 19, TypeScript, Vite, Tailwind CSS v4, Framer Motion, and Zustand.

## Features

- Personalized greeting, local clock, and setup flow
- Live OpenWeather forecast through a Vercel serverless proxy
- Persistent task list with edit, complete, and delete actions
- Pomodoro timer with configurable work and break durations
- Responsive app shell designed for desktop and mobile use

## Local Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a local env file:
   ```bash
   cp .env.example .env
   ```
3. Add an OpenWeather API key:
   ```bash
   VITE_WEATHER_API_KEY=your_openweather_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Production Deployment

The production app expects `WEATHER_API_KEY` to be configured as a private Vercel environment variable. Browser requests call `/api/weather`, and the serverless function injects the secret key before contacting OpenWeather.

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run build
```

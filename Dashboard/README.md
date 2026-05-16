# Pulse Board

Pulse Board is a responsive personal productivity dashboard for daily focus. It combines a personalized greeting, local time, Vietnam weather lookup, task management, and a configurable Pomodoro timer in one clean workspace.

## Live Demo

Production: [https://widget-w-p.vercel.app](https://widget-w-p.vercel.app)

## Features

- First-run setup modal for name and Vietnam city/province selection
- Weather widget powered by OpenWeather through a Vercel serverless proxy
- Vietnam-only location selector shared by Startup Modal and Settings
- Persistent todo list with add, edit, complete, and delete actions
- Pomodoro timer with configurable work, short break, and long break durations
- Responsive sidebar and dashboard layout for desktop and mobile
- Local persistence with Zustand so profile, tasks, and timer settings survive reloads

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- Zustand
- Framer Motion
- React Icons
- Vercel Serverless Functions

## Local Setup

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env
```

Add your OpenWeather key:

```bash
VITE_WEATHER_API_KEY=your_openweather_key_for_local_vite_dev
WEATHER_API_KEY=your_openweather_key_for_vercel_serverless_proxy
```

Start the development server:

```bash
npm run dev
```

## Environment Variables

`VITE_WEATHER_API_KEY` is used only for local Vite development.

`WEATHER_API_KEY` is used by the Vercel serverless weather proxy in production. Configure it in the Vercel project settings before deploying.

## Production Deployment

The browser calls `/api/weather`, and the serverless function at `api/weather.ts` injects `WEATHER_API_KEY` before contacting OpenWeather. This keeps the production API key out of the client bundle.

Vercel also applies security and cache headers from `vercel.json`.

## Quality Commands

```bash
npm run lint
npm run typecheck
npm run build
```

## Project Structure

```text
api/                         Vercel serverless functions
src/components/              Dashboard UI components
src/constants/weatherCities.ts Vietnam city/province options
src/layouts/                 App layout shell
src/services/                API client services
src/stores/                  Zustand stores
src/types/                   Shared TypeScript types
```

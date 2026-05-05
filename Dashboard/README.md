# Dashboard

## Local setup

1. Copy `.env.example` to `.env`.
2. Set `VITE_WEATHER_API_KEY` to your own OpenWeather API key.
3. Run `npm install`.
4. Start the app with `npm run dev`.

## Docker

### Production

Build the image with a build argument instead of copying secrets into the image context:

```bash
docker build --build-arg VITE_WEATHER_API_KEY=your_api_key -t dashboard .
```

Or use Docker Compose after setting `VITE_WEATHER_API_KEY` in your local `.env` file:

```bash
docker compose up --build
```

### Development

Use the dedicated development Compose file for hot reload:

```bash
docker compose -f docker-compose.dev.yml up --build
```

This dev setup only mounts the files the Vite container needs for live updates instead of bind-mounting the whole project tree.
If you change dependencies in `package.json`, rerun the command with `--build` so the container reinstalls packages.

## Security notes

- Never commit a real `.env` file or API key to source control.
- The weather API is called over HTTPS only.
- The production Nginx config adds basic security headers and SPA-safe routing.
- The development container mounts only app source and required config files, which reduces filesystem exposure compared with `.:/app`.

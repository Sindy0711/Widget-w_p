export default async function handler(req: any, res: any) {
  // Phân tích query parameters để tương thích với cả Node.js HTTP thuần (Vite dev) và Vercel Serverless
  const base = `http://${req.headers?.host || "localhost"}`;
  const urlObj = new URL(req.url, base);
  const query = req.query || Object.fromEntries(urlObj.searchParams);

  const { city, endpoint = "weather", lang = "en" } = query;

  if (!city) {
    res.statusCode = 400;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "City parameter is required" }));
  }

  const apiKey = process.env.WEATHER_API_KEY || "007cb1f340e9a0db0786ed0827f33ca4";

  if (!apiKey) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Server weather API key is not configured" }));
  }

  try {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(city)}&limit=1&appid=${apiKey}`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json() as any[];

    if (!geoData || geoData.length === 0) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      return res.end(JSON.stringify({ error: "City not found" }));
    }

    const { lat, lon } = geoData[0];

    const weatherUrl = `https://api.openweathermap.org/data/2.5/${endpoint}?lat=${lat}&lon=${lon}&units=metric&lang=${lang}&appid=${apiKey}`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate");
    return res.end(JSON.stringify(weatherData));
  } catch (error) {
    console.error("Vercel Proxy Weather Error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    return res.end(JSON.stringify({ error: "Failed to fetch weather data from upstream" }));
  }
}

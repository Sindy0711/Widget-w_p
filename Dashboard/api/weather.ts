type QueryValue = string | string[] | undefined;

type ServerlessRequest = {
  headers?: {
    host?: string;
  };
  query?: Record<string, QueryValue>;
  url?: string;
};

type ServerlessResponse = {
  statusCode: number;
  setHeader: (name: string, value: string) => void;
  end: (body?: string) => void;
};

type GeoResult = {
  lat: number;
  lon: number;
};

const json = (res: ServerlessResponse, statusCode: number, body: unknown) => {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  return res.end(JSON.stringify(body));
};

const firstValue = (value: QueryValue) => (Array.isArray(value) ? value[0] : value);

const readQuery = (req: ServerlessRequest) => {
  const base = `http://${req.headers?.host || "localhost"}`;
  const parsedUrl = new URL(req.url || "/", base);
  const searchQuery = Object.fromEntries(parsedUrl.searchParams.entries());

  return {
    ...searchQuery,
    ...req.query,
  };
};

export default async function handler(req: ServerlessRequest, res: ServerlessResponse) {
  const query = readQuery(req);
  const city = firstValue(query.city)?.trim();
  const lang = firstValue(query.lang)?.trim() || "en";

  if (!city) {
    return json(res, 400, { error: "City parameter is required" });
  }

  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey) {
    return json(res, 500, { error: "Server weather API key is not configured" });
  }

  try {
    const geoUrl = new URL("https://api.openweathermap.org/geo/1.0/direct");
    geoUrl.searchParams.set("q", city);
    geoUrl.searchParams.set("limit", "1");
    geoUrl.searchParams.set("appid", apiKey);

    const geoResponse = await fetch(geoUrl);
    if (!geoResponse.ok) {
      return json(res, geoResponse.status, { error: "Unable to geocode city" });
    }

    const geoData = (await geoResponse.json()) as GeoResult[];
    const location = geoData[0];

    if (!location) {
      return json(res, 404, { error: "City not found" });
    }

    const weatherUrl = new URL("https://api.openweathermap.org/data/2.5/weather");
    weatherUrl.searchParams.set("lat", String(location.lat));
    weatherUrl.searchParams.set("lon", String(location.lon));
    weatherUrl.searchParams.set("units", "metric");
    weatherUrl.searchParams.set("lang", lang);
    weatherUrl.searchParams.set("appid", apiKey);

    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();

    if (!weatherResponse.ok) {
      return json(res, weatherResponse.status, weatherData);
    }

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    return json(res, 200, weatherData);
  } catch (error) {
    console.error("Vercel Proxy Weather Error:", error);
    return json(res, 500, { error: "Failed to fetch weather data from upstream" });
  }
}

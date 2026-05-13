import axios from "axios";
import type { WeatherData } from "../types/weather";

const directAxios = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: { units: "metric", lang: "en" },
});

export const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  const trimmedCity = city.trim();
  if (!trimmedCity) {
    throw new Error("City is required");
  }
  if (import.meta.env.DEV) {
    const localKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!localKey) {
      throw new Error("Missing VITE_WEATHER_API_KEY in local .env");
    }
    
    // Get Coordinates
    const geo = await directAxios.get("/geo/1.0/direct", {
      params: { q: trimmedCity, limit: 1, appid: localKey },
    });
    
    if (!geo.data || geo.data.length === 0) throw new Error("City not found");
    
    // Get Weather
    const { lat, lon } = geo.data[0];
    const res = await directAxios.get("/data/2.5/weather", {
      params: { lat, lon, appid: localKey },
    });
     
    return res.data;
  }

  const res = await axios.get(`/api/weather`, {
    params: {
      city: trimmedCity,
      lang: "en",
    },
  });

  return res.data;
};
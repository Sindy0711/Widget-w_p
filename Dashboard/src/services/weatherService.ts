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

  const localKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (import.meta.env.DEV && localKey) {
    
    const geo = await directAxios.get("/geo/1.0/direct", {
      params: { q: trimmedCity, limit: 1, appid: localKey },
    });
    
    if (!geo.data || geo.data.length === 0) throw new Error("City not found");
    
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

  if (!res.data?.main || !res.data?.weather) {
    throw new Error("Weather service returned an unexpected response");
  }

  return res.data;
};

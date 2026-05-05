import axios from "axios";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY?.trim() ?? "";
const placeholderApiKey = "replace-with-your-openweather-api-key";

export const hasWeatherApiKey =
  weatherApiKey.length > 0 && weatherApiKey !== placeholderApiKey;

export const openWeather = axios.create({
  baseURL: "https://api.openweathermap.org",
  params: {
    units: "metric",
    lang: "en",
    ...(hasWeatherApiKey ? { appid: weatherApiKey } : {}),
  },
});

import axios from "axios";

// axios instance
export const openWeather = axios.create({
  baseURL: "http://api.openweathermap.org",
  params: {
    appid: import.meta.env.VITE_WEATHER_API_KEY,
    units: "metric",
    lang: "en",
  },
});

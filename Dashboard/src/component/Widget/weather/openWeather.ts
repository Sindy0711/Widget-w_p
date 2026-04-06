import axios from "axios";

// axios instance
export const openWeather = axios.create({
  baseURL: "http://api.openweathermap.org",
  params: {
    appid: import.meta.env.WEATHER_API,
    units: "metric",
    lang: "en",
  },
});

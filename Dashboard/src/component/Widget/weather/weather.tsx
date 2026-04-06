import { openWeather } from "./openWeather";
import { useState, useEffect } from "react";

const WeatherWidget = () => {
  const [weather, setWeaTher] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const geo = await openWeather.get("/geo/1.0/direct", {
          params: {
            q: "Ho Chi Minh City",
            limit : 5,
          },
        });
        console.log(geo);

        const lat = geo.data.lat;
        const lon = geo.data.lon;
        const weather = await openWeather.get("/data/2.5/weather", {
          params: { lat: lat, lon: lon },
        });
        setWeaTher(weather.data);
        console.log(setWeaTher);
      } catch (error) {
        console.log(error);
      }
    };
    fetchWeather();
  }, []);
  return <div>WeatherWidget</div>;
};

export default WeatherWidget;

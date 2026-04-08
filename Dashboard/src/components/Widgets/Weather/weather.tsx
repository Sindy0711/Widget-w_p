import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  WiCloud,
  WiCloudy,
  WiDaySunny,
  WiFog,
  WiHumidity,
  WiRain,
  WiSnow,
  WiStrongWind,
  WiThunderstorm,
} from "react-icons/wi";
import type { WeatherData } from "../../../types/weather";
import { openWeather } from "../../../services/weatherService";

const weatherIconMap: Record<string, IconType> = {
  clear: WiDaySunny,
  clouds: WiCloudy,
  drizzle: WiRain,
  rain: WiRain,
  thunderstorm: WiThunderstorm,
  snow: WiSnow,
  mist: WiFog,
  smoke: WiFog,
  haze: WiFog,
  dust: WiCloud,
  fog: WiFog,
  sand: WiCloud,
  ash: WiCloud,
  squall: WiStrongWind,
  tornado: WiStrongWind,
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      try {
        const geo = await openWeather.get("/geo/1.0/direct", {
          params: {
            q: "Ho Chi Minh City",
            limit: 1,
          },
        });

        if (geo.data && geo.data.length > 0) {
          const { lat, lon } = geo.data[0];
          const response = await openWeather.get("/data/2.5/weather", {
            params: { lat, lon },
          });

          if (!isMounted) return;

          setWeather(response.data);
          setHasError(false);
        } else if (isMounted) {
          setHasError(true);
        }
      } catch (error) {
        console.error(error);
        if (isMounted) {
          setHasError(true);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return (
      <div>
        <p>Loading weather...</p>
      </div>
    );
  }

  if (hasError || !weather) {
    return (
      <section>
        <p>Weather</p>
        <h3>Unable to load forecast</h3>
        <p>Check your API key or network connection and try again.</p>
      </section>
    );
  }

  const condition = weather.weather[0]?.main ?? "Clear";
  const description = weather.weather[0]?.description ?? condition;
  const WeatherIcon = weatherIconMap[condition.toLowerCase()] ?? WiDaySunny;
  const degree = String.fromCharCode(176);
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(new Date());

  return (
    <section>
      <header>
        <div>
          <p>Local forecast</p>
          <h3>{weather.name}</h3>
        </div>
        <p>{todayLabel}</p>
      </header>

      <div>
        <div aria-hidden="true">
          <WeatherIcon />
        </div>
        <div>
          <p>
            {Math.round(weather.main.temp)}
            {degree}C
          </p>
          <p>
            <span>{condition}</span>{" "}
            <span>{description}</span>
          </p>
        </div>
      </div>

      <dl>
        <div>
          <dt>Feels like</dt>
          <dd>
            {Math.round(weather.main.feels_like)}
            {degree}C
          </dd>
        </div>
        <div>
          <dt>
            <WiHumidity aria-hidden="true" />
            Humidity
          </dt>
          <dd>{weather.main.humidity}%</dd>
        </div>
        <div>
          <dt>
            <WiStrongWind aria-hidden="true" />
            Wind
          </dt>
          <dd>{Math.round(weather.wind.speed)} m/s</dd>
        </div>
      </dl>
    </section>
  );
};

export default WeatherWidget;

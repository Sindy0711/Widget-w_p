import type { IconType } from "react-icons";
import { useEffect, useState } from "react";
import {
  // WiHumidity,
  WiStrongWind,
  WiCloud,
  WiCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import type { WeatherData } from "../../../types/weather";
import { openWeather } from "../../../services/weatherService";
import useProfileStore from "../../../stores/profileStore";

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
  const city = useProfileStore((state) => state.city) ;


  useEffect(() => {
    let isMounted = true;

    const fetchWeather = async () => {
      if (isMounted) {
        setIsLoading(true);
        setHasError(false);
      }

      try {
        const geo = await openWeather.get("/geo/1.0/direct", {
          params: {
            q: city, 
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
  }, [city]);

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

  const condition = weather.weather[0].main ?? "";
  const description = weather.weather[0].description ?? "";
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(new Date());
  const WeatherIcon = weatherIconMap[condition.toLowerCase()] || WiDaySunny;
  return (
    <section>
      <header className="grid grid-flow-col ">
        <div className="col-span-6">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
            Local forecast
          </p>
          <h3 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
            {weather.name}
          </h3>
        </div>
        <p className="col-span-6 text-end text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
          {todayLabel}
        </p>
      </header>

      <div>
        <div aria-hidden="true">
          <WeatherIcon />
        </div>
        <div>
          <p>
            {Math.round(weather.main.temp)}
            °C
          </p>
          <p>
            <span>{condition}</span> <span>{description}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-flow-col">
        <div className="col-span-3">
          <WeatherIcon aria-hidden="true" />
          <dt>Feels like</dt>
          <dd>
            {Math.round(weather.main.feels_like)}
            °C
          </dd>
        </div>
        <div className="col-span-3  ">
          <dt>
            <WeatherIcon aria-hidden="true" />
            Humidity
          </dt>
          <dd>{weather.main.humidity}%</dd>
        </div>
        <div className="col-span-3 ">
          <dt>
            <WeatherIcon aria-hidden="true" />
            Wind
          </dt>
          <dd>{Math.round(weather.wind.speed)} m/s</dd>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;

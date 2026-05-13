import type { IconType } from "react-icons";
import { useEffect } from "react";
import {
  WiStrongWind,
  WiCloud,
  WiCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
  WiThermometer,
  WiHumidity,
} from "react-icons/wi";
import useProfileStore from "../../../stores/profileStore";
import useWeatherStore from "../../../stores/weatherStore";

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
  const city = useProfileStore((state) => state.city);
  const { weather, isLoading, hasError, fetchWeatherByCity } = useWeatherStore();

  useEffect(() => {
    fetchWeatherByCity(city);
  }, [city, fetchWeatherByCity]);

  // --- Loading skeleton ---
  if (isLoading) {
    return (
      <section className="animate-pulse">
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
          Local forecast
        </p>
        <div className="h-8 w-40 rounded-lg bg-[var(--surface-muted)] mb-4" />
        <div className="flex items-center gap-4 mb-6">
          <div className="h-14 w-14 rounded-full bg-[var(--surface-muted)]" />
          <div className="space-y-2">
            <div className="h-10 w-20 rounded bg-[var(--surface-muted)]" />
            <div className="h-4 w-28 rounded bg-[var(--surface-muted)]" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-[var(--surface-muted)]" />
          ))}
        </div>
      </section>
    );
  }

  // --- Error state ---
  if (hasError || !weather || !weather.weather || !weather.main) {
    return (
      <section>
        <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
          Local forecast
        </p>
        <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
          <WiCloud className="text-5xl text-[var(--text-muted)]" />
          <h3 className="font-semibold text-[var(--text-heading)]">Unable to load forecast</h3>
          <p className="text-xs text-[var(--text-muted)] max-w-xs">
            Configure your OpenWeather API key in{" "}
            <span className="font-mono text-[var(--accent)]">Api Keys</span>{" "}
            or check your city name in{" "}
            <span className="font-mono text-[var(--accent)]">Settings</span>.
          </p>
        </div>
      </section>
    );
  }

  const condition = weather?.weather?.[0]?.main ?? "";
  const description = weather?.weather?.[0]?.description ?? "";
  const todayLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  }).format(new Date());
  const WeatherIcon = weatherIconMap[condition.toLowerCase()] || WiDaySunny;

  return (
    <section>
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-1 text-[var(--text-muted)]">
            Local forecast
          </p>
          <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-heading)]">
            {weather.name}
          </h3>
        </div>
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-muted)] text-right mt-1">
          {todayLabel}
        </p>
      </div>

      {/* Main temp + icon */}
      <div className="flex items-center gap-5 mb-6">
        <div className="text-6xl text-[var(--accent)] leading-none">
          <WeatherIcon aria-hidden="true" />
        </div>
        <div>
          <p className="text-5xl font-bold tracking-tight text-[var(--text-heading)] leading-none">
            {Math.round(weather.main.temp)}°C
          </p>
          <p className="text-sm text-[var(--text-muted)] mt-1 capitalize">
            {condition} · {description}
          </p>
        </div>
      </div>

      {/* Stats chips — correct icons per stat */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[var(--surface-muted)] text-center">
          <WiThermometer className="text-2xl text-[var(--accent)]" aria-hidden="true" />
          <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Feels like
          </dt>
          <dd className="text-sm font-semibold text-[var(--text-heading)]">
            {Math.round(weather.main.feels_like)}°C
          </dd>
        </div>

        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[var(--surface-muted)] text-center">
          <WiHumidity className="text-2xl text-[var(--accent)]" aria-hidden="true" />
          <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Humidity
          </dt>
          <dd className="text-sm font-semibold text-[var(--text-heading)]">
            {weather.main.humidity}%
          </dd>
        </div>

        <div className="flex flex-col items-center gap-1 p-3 rounded-xl bg-[var(--surface-muted)] text-center">
          <WiStrongWind className="text-2xl text-[var(--accent)]" aria-hidden="true" />
          <dt className="text-[0.65rem] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            Wind
          </dt>
          <dd className="text-sm font-semibold text-[var(--text-heading)]">
            {Math.round(weather.wind.speed)} m/s
          </dd>
        </div>
      </div>
    </section>
  );
};

export default WeatherWidget;

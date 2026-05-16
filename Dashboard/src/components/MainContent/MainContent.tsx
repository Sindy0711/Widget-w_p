import { useState, useEffect } from "react";
import type { ElementType } from "react";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiFog, WiCloud, WiStrongWind } from "react-icons/wi";
import AddToDoForm from "../Widgets/Todo/TodoForm";
import TodoList from "../Widgets/Todo/TodoList";
import Clock from "../Widgets/Pomodoro/PomodoroClock";
import WeatherWidget from "../Widgets/Weather/WeatherWidget";
import StartupModal from "../StartupModal/StartupModal";
import useProfileStore from "../../stores/profileStore";
import useWeatherStore from "../../stores/weatherStore";

const weatherIconMap: Record<string, ElementType> = {
  clear: WiDaySunny, clouds: WiCloudy, drizzle: WiRain, rain: WiRain,
  thunderstorm: WiThunderstorm, snow: WiSnow, mist: WiFog, smoke: WiFog,
  haze: WiFog, dust: WiCloud, fog: WiFog, sand: WiCloud, ash: WiCloud,
  squall: WiStrongWind, tornado: WiStrongWind,
};

const getGreeting = () => {
  const hours = new Date().getHours();
  if (hours >= 5 && hours < 12) return "Good Morning";
  if (hours >= 12 && hours < 17) return "Good Afternoon";
  if (hours >= 17 && hours < 21) return "Good Evening";
  return "Good Night";
};

export default function MainContent() {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState<string>(getGreeting);
  const { name, city } = useProfileStore();
  const { weather, fetchWeatherByCity } = useWeatherStore();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString());
      setGreeting(getGreeting());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch cached weather centrally
  useEffect(() => {
    fetchWeatherByCity(city);
  }, [city, fetchWeatherByCity]);

  const condition = weather?.weather?.[0]?.main ?? "";
  const temp = weather?.main?.temp != null ? Math.round(weather.main.temp) : null;
  const SummaryWeatherIcon = condition ? (weatherIconMap[condition.toLowerCase()] || WiDaySunny) : WiDaySunny;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" as const },
    }),
  };

  return (
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-5 auto-rows-min lg:grid-cols-12 2xl:gap-8">
        <section className="lg:col-span-12 grid grid-cols-12 gap-6 2xl:gap-8">
          <motion.article custom={0} variants={cardVariants} initial="hidden" animate="visible"
            className="col-span-12 flex min-h-36 flex-col justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-transform duration-300 hover:-translate-y-1 md:col-span-4 lg:p-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--text-muted)]">
                Greeting
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
                {greeting}{name ? `, ${name}` : ""}
              </h1>
            </div>
          </motion.article>

          <motion.article custom={1} variants={cardVariants} initial="hidden" animate="visible"
            className="col-span-12 flex min-h-36 flex-col justify-between rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-transform duration-300 hover:-translate-y-1 md:col-span-4 lg:p-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--text-muted)]">
                Local Time
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
                {clock}
              </h2>
            </div>
          </motion.article>

          <motion.article custom={2} variants={cardVariants} initial="hidden" animate="visible"
            className="col-span-12 flex min-h-36 items-center justify-between gap-4 rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-transform duration-300 hover:-translate-y-1 md:col-span-4 lg:p-8">
            <div className="flex flex-col justify-center">
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--text-muted)]">
                Weather
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-heading)] sm:text-3xl">
                {temp != null ? `${temp}°C · ${condition}` : "—"}
              </h2>
            </div>
            <div className="rounded-lg bg-[var(--accent-soft)] p-3 text-4xl text-[var(--accent)]">
              <SummaryWeatherIcon />
            </div>
          </motion.article>
        </section>

        <section className="lg:col-span-12 xl:col-span-6 flex flex-col gap-6 2xl:gap-8">
          <article className="flex flex-1 flex-col rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-all duration-500 hover:shadow-[var(--shadow-soft)] lg:p-8">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase text-[var(--text-muted)]">
                Daily focus
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
                Todo List
              </h1>
            </div>
            <div className="mb-6">
              <AddToDoForm />
            </div>
            <div className="flex-1 min-h-[200px]">
              <TodoList />
            </div>
          </article>
        </section>

        <section className="lg:col-span-12 xl:col-span-6 flex flex-col gap-6 2xl:gap-8">
          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-transform duration-300 hover:-translate-y-1 lg:p-8">
            <WeatherWidget />
          </article>

          <article className="rounded-lg border border-[var(--border)] bg-[var(--surface)] p-6 transition-transform duration-300 hover:-translate-y-1 lg:p-8">
            <Clock />
          </article>
        </section>

        <div className="clipping-container">
          <StartupModal />
        </div>
      </div>
    
      
  );
}

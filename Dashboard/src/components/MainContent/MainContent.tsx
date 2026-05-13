import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { WiDaySunny, WiCloudy, WiRain, WiThunderstorm, WiSnow, WiFog, WiCloud, WiStrongWind } from "react-icons/wi";
import AddToDoForm from "../Widgets/Todo/TodoForm";
import TodoList from "../Widgets/Todo/TodoList";
import Clock from "../Widgets/Pomodoro/Clock";
import WeatherWidget from "../Widgets/Weather/Weather";
import StartupModal from "../StartupModal/StartupModal";
import useProfileStore from "../../stores/profileStore";
import useWeatherStore from "../../stores/weatherStore";

const weatherIconMap: Record<string, React.ElementType> = {
  clear: WiDaySunny, clouds: WiCloudy, drizzle: WiRain, rain: WiRain,
  thunderstorm: WiThunderstorm, snow: WiSnow, mist: WiFog, smoke: WiFog,
  haze: WiFog, dust: WiCloud, fog: WiFog, sand: WiCloud, ash: WiCloud,
  squall: WiStrongWind, tornado: WiStrongWind,
};

export default function MainContent() {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState<string>("");
  const { name, city } = useProfileStore();
  const { weather, fetchWeatherByCity } = useWeatherStore();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setClock(now.toLocaleTimeString());
      const hours = now.getHours();
      if (hours >= 5 && hours < 12) setGreeting("Good Morning");
      else if (hours >= 12 && hours < 17) setGreeting("Good Afternoon");
      else if (hours >= 17 && hours < 21) setGreeting("Good Evening");
      else setGreeting("Good Night");
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
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 auto-rows-min">
        <section className="lg:col-span-12 grid grid-cols-12 gap-6 2xl:gap-8">
          <motion.article custom={0} variants={cardVariants} initial="hidden" animate="visible"
            className="col-span-4 p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
                Greeting
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
                {greeting} {name}
              </h1>
            </div>
          </motion.article>

          <motion.article custom={1} variants={cardVariants} initial="hidden" animate="visible"
            className="col-span-4 p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
                Local Time
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
                {clock}
              </h2>
            </div>
          </motion.article>

          <motion.article custom={2} variants={cardVariants} initial="hidden" animate="visible"
            className="col-span-4 p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300 flex items-center justify-between">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
                Weather
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
                {temp != null ? `${temp}°C · ${condition}` : "—"}
              </h2>
            </div>
            <div className="text-4xl text-[var(--accent)] p-3 bg-[var(--accent-soft)] rounded-2xl">
              <SummaryWeatherIcon />
            </div>
          </motion.article>
        </section>

        <section className="lg:col-span-12 xl:col-span-6 flex flex-col gap-6 2xl:gap-8">
          <article className="p-8 rounded-3xl flex-1 bg-[var(--surface)] border border-[var(--border)] flex flex-col transition-all hover:shadow-[var(--shadow-soft)] duration-500">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
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
          <article className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300">
            <WeatherWidget />
          </article>

          <article className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300">
            <Clock />
          </article>
        </section>

        <div className="clipping-container">
          <StartupModal />
        </div>
      </div>
    
      
  );
}

import { useState, useEffect } from "react";
import { WiDaySunny } from "react-icons/wi";
import AddToDoForm from "../Widgets/Todo/TodoForm";
import TodoList from "../Widgets/Todo/TodoList";
import Clock from "../Widgets/Pomodoro/Clock";
import WeatherWidget from "../Widgets/Weather/weather";

export default function MainContent() {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();

      setClock(now.toLocaleTimeString());
      const hours = now.getHours();
      if (hours >= 5 && hours < 12) {
        setGreeting("Good Morning");
      } else if (hours >= 12 && hours < 17) {
        setGreeting("Good Afternoon");
      } else if (hours >= 17 && hours < 21) {
        setGreeting("Good Evening");
      } else {
        setGreeting("Good Night");
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen p-6 sm:p-10 text-[var(--text)] bg-[var(--bg)] font-sans">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 auto-rows-min">
        <section className="lg:col-span-12 grid grid-cols-12 gap-6 2xl:gap-8">
          <article className="col-span-4 p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
                Greeting
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
                {greeting} Hiro
              </h1>
            </div>
          </article>
          <article className="col-span-4 p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
                Local Time
              </p>
              <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
                {clock}
              </h2>
            </div>
          </article>

          <article className="col-span-4 p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300 flex items-center justify-between">
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">
                Weather
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">
                Clean snapshot
              </h1>
            </div>
            <div className="text-3xl text-[var(--accent)] p-3 bg-[var(--accent-soft)] rounded-2xl">
              <WiDaySunny />
            </div>
          </article>
        </section>

        <section className="lg:col-span-12 xl:col-span-6 flex flex-col gap-6 2xl:gap-8">
          <article className="p-8 rounded-3xl flex-1 bg-[var(--surface)] border border-[var(--border)] flex flex-col transition-all hover:shadow-[var(--shadow-soft)] duration-500">
            <div className="">
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
      </div>
    </main>
  );
}

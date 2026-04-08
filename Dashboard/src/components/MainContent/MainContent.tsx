import { useState, useEffect } from "react";
import { WiDaySunny } from "react-icons/wi";
import AddToDoForm from "../Widgets/Todo/TodoForm";
import TodoList from "../Widgets/Todo/TodoList";
import Clock from "../Widgets/Pomodoro/Clock";
import WeatherWidget from "../Widgets/Weather/Weather";

export default function MainContent() {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen p-6 sm:p-10 text-[var(--text)] bg-[var(--bg)] font-sans">
      <div className="max-w-[1500px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 2xl:gap-8 auto-rows-min">
        
        <section className="lg:col-span-4 flex flex-col gap-6 2xl:gap-8"> 
          <article className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-[var(--text-muted)]">Greeting</p>
            <h1 className="text-3xl font-semibold tracking-tight text-[var(--text-heading)]">Good day, Hiro.</h1>
          </article>

         
          <article className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300 flex flex-col justify-center items-start">
            <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-[var(--text-muted)]">Local Time</p>
            <h2 className="text-5xl font-light tabular-nums tracking-tighter text-[var(--text-heading)]">{clock}</h2>
          </article>

         
          <article className="p-8 rounded-3xl bg-[var(--surface)] border border-[var(--border)] transition-transform hover:-translate-y-1 duration-300 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-[var(--text-muted)]">Weather</p>
              <h1 className="text-xl font-medium text-[var(--text-heading)]">Clean snapshot</h1>
            </div>
             <div className="text-5xl text-[var(--accent)] p-3 bg-[var(--accent-soft)] rounded-2xl">
              <WiDaySunny />
            </div>
          </article>
        </section>

        
        <section className="lg:col-span-4 xl:col-span-5 flex flex-col gap-6 2xl:gap-8">
          <article className="p-8 rounded-3xl flex-1 bg-[var(--surface)] border border-[var(--border)] flex flex-col transition-all hover:shadow-[var(--shadow-soft)] duration-500">
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-2 text-[var(--text-muted)]">Daily focus</p>
              <h1 className="text-2xl font-semibold text-[var(--text-heading)]">Todo List</h1>
            </div>
            <div className="mb-6">
              <AddToDoForm />
            </div>
            <div className="flex-1 min-h-[300px]">
              <TodoList />
            </div>
          </article>
        </section>

       
        <section className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6 2xl:gap-8">
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

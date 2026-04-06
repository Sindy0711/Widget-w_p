import { IconBase } from "react-icons/lib";
import AddToDoForm from "./Widget/todo/todoForm.jsx";
import TodoList from "./Widget/todo/todoList.jsx";
import Clock from "./Widget/pomodoro/clock.js";
import WeatherWidget from "./Widget/weather/weather.js";
import { useState, useEffect } from "react";

export default function MainContent() {
  const [clock, setClock] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const timer = setInterval(() => {
      setClock(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="main-content">
      <div className="header">
        <div className="widget-grid">
          <div className="col-4">
            <p>Greeting</p>
            <h1>Good {} Hiro</h1>
          </div>

          <div className="currentTime col-4">
            <p>clock</p>
            <h2> {clock}</h2>
          </div>

          <div className=" col-4 flex">
            <IconBase />
            <div className="holder">
              <p>weather</p>
              <h1>Sunny</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="content-body">
        <div className="widget-grid">
          <section className="widget-task todo-widget col-6">
            <div className="widget-section-heading">
              <p className="widget-eyebrow">Daily focus</p>
              <h1 className="widget-title">Todo List</h1>
            </div>
            <AddToDoForm />
            <TodoList />
          </section>
          <div className="col-6">
            <div className=" widget-weather ">
              <WeatherWidget />
            </div>
            <div className=" widget-pomodoro ">
              <Clock />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

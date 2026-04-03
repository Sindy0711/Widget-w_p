import { IconBase } from "react-icons/lib";

export default function MainContent() {
  return (
    <main className="main-content">
      <div className="header">
        <div className="widget-grid">
          <div className="col-4">
            <p>Greeting</p>
            <h1>Good {} Hiro</h1>
          </div>

          <div className=" col-4">
            <p>clock</p>
            <h1>12:45 PM</h1>
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
          <div className="widget-task col-6">My tasks</div>
          <div className="col-6">
            <div className=" widget-weather ">Weather</div>
            <div className=" widget-pomodoro ">Pomodoro</div>
          </div>
        </div>
      </div>
    </main>
  );
}

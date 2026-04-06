import useClockStore from "../../../store/clockStore";
import { useEffect } from "react";
import "../../../assets/css/index.css";

const Clock = () => {
  const {
    time,
    isRunning,
    workTime,
    breakTime,
    countTimer,
    toggleTime,
    setWorkTime,
    setTime,
    setBreakTime,
    setIsRunning,
  } = useClockStore();

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");

  useEffect(() => {
    if (!isRunning) return;
    const id = setInterval(countTimer, 1000);
    return () => clearInterval(id);
  }, [isRunning, countTimer]);

  return (
    <div className="clock-wrapper">
      <div className="clock-card">
        <p className="clock-label">POMODORO</p>
        <div className="clock-display">
          <span>{minutes}</span>
          <span className="clock-sep">:</span>
          <span>{seconds}</span>
        </div>

        <div className="clock-adjust">
          <button
            className="btn-adjust"
            onClick={() => setWorkTime(workTime - 5 * 60)}
            disabled={workTime <= 10 * 60}
          >
            −5
          </button>
          <span className="clock-duration">{workTime / 60} min</span>
          <button
            className="btn-adjust"
            onClick={() => setWorkTime(workTime + 5 * 60)}
          >
            +5
          </button>
        </div>

        <div className="clock-adjust">
          <button
            className="btn-adjust"
            onClick={() => setBreakTime(breakTime - 5 * 60)}
            disabled={breakTime <= 5 * 60}
          >
            −5
          </button>
          <span className="clock-duration">{breakTime / 60} min</span>
          <button
            className="btn-adjust"
            onClick={() => setBreakTime(breakTime + 5 * 60)}
          >
            +5
          </button>
        </div>

        <div className="clock-controls">
          <button
            className="btn-reset"
            onClick={() => {
              setTime(workTime);
              setIsRunning(false);
            }}
          >
            Reset
          </button>
          <button className="btn-start" onClick={toggleTime}>
            {isRunning ? "Pause" : "Start"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clock;

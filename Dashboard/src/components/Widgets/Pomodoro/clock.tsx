import { useEffect } from "react";
import useClockStore from "../../../stores/clockStore";

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
    <section>
      <p>Pomodoro</p>
      <div>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div>
        <button
          onClick={() => setWorkTime(workTime - 5 * 60)}
          disabled={workTime <= 10 * 60}
        >
          -5
        </button>
        <span>{workTime / 60} min</span>
        <button onClick={() => setWorkTime(workTime + 5 * 60)}>
          +5
        </button>
      </div>

      <div>
        <button
          onClick={() => setBreakTime(breakTime - 5 * 60)}
          disabled={breakTime <= 5 * 60}
        >
          -5
        </button>
        <span>{breakTime / 60} min</span>
        <button onClick={() => setBreakTime(breakTime + 5 * 60)}>
          +5
        </button>
      </div>

      <div>
        <button
          onClick={() => {
            setTime(workTime);
            setIsRunning(false);
          }}
        >
          Reset
        </button>
        <button onClick={toggleTime}>
          {isRunning ? "Pause" : "Start"}
        </button>
      </div>
    </section>
  );
};

export default Clock;

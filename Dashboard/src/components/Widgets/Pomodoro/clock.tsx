import { useEffect } from "react";
import useClockStore from "../../../stores/clockStore";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Clock = () => {
  const {
    
    timeLeft,
    status,
    mode,
    settings,
    // sessions,
    tick,
    start,
    pause,
    resume,
    reset,
    saveSettings
  } = useClockStore();

  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");
  const percentage = (timeLeft / (settings[mode] * 60)) * 100;

  useEffect(() => {
    if (status !== "running") return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [status, tick]);

  const renderButtons = () => {
    if (status === "running") {
      return (
        <button
          className="bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2 w-24"
          onClick={pause}
        >
          Pause
        </button>
      );
    } else if (status === "paused") {
      return (
        <>
          <div className="flex flex-row gap-2">
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2 w-24"
              onClick={resume}
            >
              Resume
            </button>
            <button
              className="bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2 w-24"
              onClick={reset}
            >
              Reset
            </button>
          </div>
        </>
      );
    } else {
    }
  };
  if (status === "idle")
    return (
      <section className="flex flex-col items-center justify-center gap-4">
        <p className="text-xs font-semibold uppercase self-start tracking-widest mb-3 text-[var(--text-muted)]">
          pomodoro
        </p>
        <p className="text-3xl font-bold">
          {minutes}:{seconds}
        </p>
        <div className="flex-row items-center gap-2">
          <button
            className="w-8 h-8"
            onClick={()=> saveSettings({...settings , work: settings.work + 5})}
            disabled={settings.work >=60}
          >
            +
          </button>
          <button
            className="w-8 h-8"
            onClick={()=> saveSettings({...settings , work: settings.work - 5})}
            disabled={settings.work <=10}
          >
            -
          </button>
        </div>
        <div>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white rounded-md px-4 py-2 w-24"
            onClick={start}
          >
            Start
          </button>
          {/* <button onClick={reset}>Reset</button> */}
        </div>
      </section>
    );

  return (
    <>
      <section className="flex flex-col items-center gap-4">
        <p className="text-xs font-semibold uppercase self-start tracking-widest mb-3 text-[var(--text-muted)]">
          pomodoro
        </p>
        <div className="w-48">
          <CircularProgressbar
            value={percentage}
            text={`${minutes}:${seconds}`}
          />
        </div>
        <div>{renderButtons()}</div>
      </section>
    </>
  );
};

export default Clock;

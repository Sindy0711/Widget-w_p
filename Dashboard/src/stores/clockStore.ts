import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Settings {
  work: number;
  break: number;
  longBreak: number;
}

export const DEFAULT_SETTINGS: Settings = {
  work: 25,
  break: 5,
  longBreak: 15,
};

export type clockStore = {
  mode: "work" | "break" | "longBreak";
  status: "idle" | "running" | "paused" | "finished";
  timeLeft: number;
  sessions: number;
  settings: Settings;
  // action
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
  tick: () => void;
  updateSettings: (key: keyof Settings, value: number) => void;
  saveSetting: (newSettings: Settings) => void;
  resetDefault: () => void;
};

const useClockStore = create<clockStore>()(
  persist(
    (set, get) => ({
      mode: "work",
      status: "idle",
      settings: DEFAULT_SETTINGS,
      timeLeft: DEFAULT_SETTINGS.work * 60,
      sessions: 0,
      start: () => set({ status: "running" }),
      pause: () => set({ status: "paused" }),
      resume: () => set({ status: "running" }),
      reset: () =>
        set({
          status: "idle",
          mode: "work",
          timeLeft: get().settings.work * 60,
          sessions: 0,
        }),
      tick: () => {
        const { timeLeft, sessions, settings, mode } = get();
        if (timeLeft > 1) {
          set({ timeLeft: timeLeft - 1 });
          return;
        }

        const newSession = mode === "work" ? sessions + 1 : sessions;
        const nextMode =
          mode === "work"
            ? newSession % 4 === 0
              ? "longBreak"
              : "break"
            : "work";
        const nextTime = settings[nextMode] * 60;
        const newStatus = mode === "work" ? "running" : "idle";

        if (mode === "work") console.log("bell");
        set({
          timeLeft: nextTime,
          mode: nextMode,
          sessions: newSession,
          status: newStatus,
        });
      },
      updateSettings: (key, value) => {
        const { settings } = get();
        const newSettings = { ...settings, [key]: value };
        set({ settings: newSettings });
        set({ timeLeft: newSettings[key] * 60 });
      },

      saveSetting : (newSetting: Settings) =>{
        set({settings : newSetting})
      },
      resetDefault : () => {
        const {mode} = get();
        set({
          settings: DEFAULT_SETTINGS,
          timeLeft: DEFAULT_SETTINGS[mode] * 60
        
        });
      }
    }),
    {
      name: "pomodoro-storage",
    },
  ),
);

export default useClockStore;

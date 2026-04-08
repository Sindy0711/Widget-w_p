import { create } from "zustand";

type Filter = "work" | "break";
export type clockStore = {
  mode: Filter;
  isRunning: boolean;
  time: number;
  workTime: number;
  breakTime: number;
  // action
  toggleTime: () => void;
  countTimer: () => void;
  setTime: (value: number) => void;
  setWorkTime: (value: number) => void;
  setBreakTime: (value: number) => void;
  setIsRunning: (value: boolean) => void;
};

const useClockStore = create<clockStore>((set) => ({
  mode: "work",
  isRunning: false,
  time: 25 * 60,
  workTime: 25 * 60,
  breakTime: 5 * 60,
  setTime: (value) => set({ time: value }),
  setWorkTime: (value) => set({ workTime: value }),
  setBreakTime: (value) => set({ breakTime: value }),
  setIsRunning: (value) => set({ isRunning: value }),
  toggleTime: () =>
    set((state) => ({
      isRunning: !state.isRunning,
    })),
  countTimer: () =>
    set((state) => {
      if (state.time > 0) return { time: state.time - 1 };
      return state.mode === "work"
        ? { mode: "break", time: state.breakTime }
        : { mode: "work", time: state.workTime };
    }),
}));

export default useClockStore;

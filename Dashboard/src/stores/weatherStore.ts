import { create } from "zustand";
import type { WeatherData } from "../types/weather";
import { fetchWeatherByCity } from "../services/weatherService";

type WeatherStore = {
  weather: WeatherData | null;
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  lastFetchedCity: string;
  lastFetchedAt: number;
  pendingCity: string;
  fetchWeatherByCity: (city: string) => Promise<void>;
};

const CACHE_WINDOW_MS = 10 * 60 * 1000;

const useWeatherStore = create<WeatherStore>((set, get) => ({
  weather: null,
  isLoading: false,
  hasError: false,
  errorMessage: null,
  lastFetchedCity: "",
  lastFetchedAt: 0,
  pendingCity: "",

  fetchWeatherByCity: async (city: string) => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    const state = get();
    const isSameCity = state.lastFetchedCity.toLowerCase() === trimmedCity.toLowerCase();
    const isFresh = Date.now() - state.lastFetchedAt < CACHE_WINDOW_MS;

    if (state.isLoading && state.pendingCity.toLowerCase() === trimmedCity.toLowerCase()) {
      return;
    }

    if (state.weather && isSameCity && isFresh) {
      return;
    }
    
    set({ isLoading: true, hasError: false, errorMessage: null, pendingCity: trimmedCity });

    try {
      const data = await fetchWeatherByCity(trimmedCity);
      
      set({
        weather: data,
        hasError: false,
        isLoading: false,
        lastFetchedCity: trimmedCity,
        lastFetchedAt: Date.now(),
        pendingCity: "",
      });
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      set({
        hasError: true,
        isLoading: false,
        errorMessage: error instanceof Error ? error.message : "Unable to load weather",
        lastFetchedCity: trimmedCity,
        pendingCity: "",
      });
    }
  },
}));

export default useWeatherStore;

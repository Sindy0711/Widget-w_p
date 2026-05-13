import { create } from "zustand";
import type { WeatherData } from "../types/weather";
import { fetchWeatherByCity } from "../services/weatherService";

type WeatherStore = {
  weather: WeatherData | null;
  isLoading: boolean;
  hasError: boolean;
  lastFetchedCity: string;
  fetchWeatherByCity: (city: string) => Promise<void>;
};

const useWeatherStore = create<WeatherStore>((set, get) => ({
  weather: null,
  isLoading: false,
  hasError: false,
  lastFetchedCity: "",

  fetchWeatherByCity: async (city: string) => {
    const trimmedCity = city.trim();
    if (!trimmedCity) return;

    if (get().weather && get().lastFetchedCity.toLowerCase() === trimmedCity.toLowerCase()) {
      return;
    }
    
    set({ isLoading: true, hasError: false });

    try {
      const data = await fetchWeatherByCity(trimmedCity);
      
      set({
        weather: data,
        hasError: false,
        isLoading: false,
        lastFetchedCity: trimmedCity,
      });
    } catch (error) {
      console.error("Failed to fetch weather:", error);
      set({ hasError: true, isLoading: false, lastFetchedCity: trimmedCity });
    }
  },
}));

export default useWeatherStore;

export interface WeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
}

export interface FavoriteLocation {
  id: string;
  name: string;
}
export type TemperatureUnit = "celsius" | "fahrenheit";

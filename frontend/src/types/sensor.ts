export type SensorType = 
  | 'air_humidity'
  | 'soil_moisture'
  | 'water_level'
  | 'light_duration'
  | 'light_intensity'
  | 'soil_ph'
  | 'soil_npk'
  | 'temperature';

export interface SensorData {
  id: string;
  name: string;
  type: SensorType;
  value: number;
  unit: string;
  lastUpdated: string;
  status: 'normal' | 'warning' | 'critical';
}

export interface WeatherData {
  precipitation: number;
  temperature: number;
  alerts: string[];
  cloudCover: number;
  airQuality: number;
  moonPhase: string;
}

export interface ExternalData {
  weather: WeatherData;
  news: {
    stockMarket: string[];
    political: string[];
    scientific: string[];
    miscellaneous: string[];
  };
  lastImageUrl: string;
}

export interface PlantData {
  id: string;
  name: string;
  location: string;
  sensors: SensorData[];
  health: number; // 0-100
  lastWatered: string;
  nextWatering: string;
  externalData: ExternalData;
} 
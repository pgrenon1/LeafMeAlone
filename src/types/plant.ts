export interface PlantData {
  environmental_data: {
    location: string;
    air: {
      humidity: number;
      temperature: number;
    };
    soil: {
      humidity: number;
    };
    light: {
      intensity: number;
      duration: number;
    };
  };
  external_factors: {
    weather: {
      temperature: number;
      precipitation: number;
      cloud_cover: number;
      moon_phase: string;
      air_quality: number;
    };
    market_indices: {
      dow_jones: number;
      nasdaq: number;
    };
    news: string[];
  };
} 
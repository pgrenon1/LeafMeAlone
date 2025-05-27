import type { PlantData } from '../types/sensor';

export const mockPlants: PlantData[] = [
  {
    id: '1',
    name: 'Monstera Deliciosa',
    location: 'Living Room',
    health: 85,
    lastWatered: '2024-03-26T10:00:00',
    nextWatering: '2024-03-28T10:00:00',
    sensors: [
      {
        id: 'temp1',
        name: 'Temperature Sensor',
        type: 'temperature',
        value: 22.5,
        unit: '°C',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'hum1',
        name: 'Air Humidity',
        type: 'air_humidity',
        value: 65,
        unit: '%',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'soil1',
        name: 'Soil Moisture',
        type: 'soil_moisture',
        value: 45,
        unit: '%',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'warning'
      },
      {
        id: 'water1',
        name: 'Water Reservoir',
        type: 'water_level',
        value: 75,
        unit: '%',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'light1',
        name: 'Light Duration',
        type: 'light_duration',
        value: 8.5,
        unit: 'hours',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'intensity1',
        name: 'Light Intensity',
        type: 'light_intensity',
        value: 850,
        unit: 'lux',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'ph1',
        name: 'Soil pH',
        type: 'soil_ph',
        value: 6.5,
        unit: 'pH',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'npk1',
        name: 'Soil NPK',
        type: 'soil_npk',
        value: 15,
        unit: 'mg/kg',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      }
    ],
    externalData: {
      weather: {
        precipitation: 0,
        temperature: 22.5,
        alerts: [],
        cloudCover: 20,
        airQuality: 45,
        moonPhase: 'Waxing Crescent'
      },
      news: {
        stockMarket: ['Market shows positive trend'],
        political: ['New environmental policies announced'],
        scientific: ['New study on plant communication'],
        miscellaneous: ['Local garden show this weekend']
      },
      lastImageUrl: 'https://example.com/plant1.jpg'
    }
  },
  {
    id: '2',
    name: 'Fiddle Leaf Fig',
    location: 'Office',
    health: 92,
    lastWatered: '2024-03-25T14:00:00',
    nextWatering: '2024-03-27T14:00:00',
    sensors: [
      {
        id: 'temp2',
        name: 'Temperature Sensor',
        type: 'temperature',
        value: 23.1,
        unit: '°C',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'hum2',
        name: 'Air Humidity',
        type: 'air_humidity',
        value: 58,
        unit: '%',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'soil2',
        name: 'Soil Moisture',
        type: 'soil_moisture',
        value: 52,
        unit: '%',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'water2',
        name: 'Water Reservoir',
        type: 'water_level',
        value: 85,
        unit: '%',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'light2',
        name: 'Light Duration',
        type: 'light_duration',
        value: 7.2,
        unit: 'hours',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'intensity2',
        name: 'Light Intensity',
        type: 'light_intensity',
        value: 720,
        unit: 'lux',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'ph2',
        name: 'Soil pH',
        type: 'soil_ph',
        value: 6.8,
        unit: 'pH',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      },
      {
        id: 'npk2',
        name: 'Soil NPK',
        type: 'soil_npk',
        value: 18,
        unit: 'mg/kg',
        lastUpdated: '2024-03-26T15:30:00',
        status: 'normal'
      }
    ],
    externalData: {
      weather: {
        precipitation: 0,
        temperature: 23.1,
        alerts: [],
        cloudCover: 15,
        airQuality: 42,
        moonPhase: 'Waxing Crescent'
      },
      news: {
        stockMarket: ['Market shows positive trend'],
        political: ['New environmental policies announced'],
        scientific: ['New study on plant communication'],
        miscellaneous: ['Local garden show this weekend']
      },
      lastImageUrl: 'https://example.com/plant2.jpg'
    }
  }
]; 
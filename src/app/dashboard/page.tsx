'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Skeleton } from '../../components/ui/skeleton';

interface PlantData {
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

export default function Dashboard() {
  const [data, setData] = useState<PlantData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/plant-data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="transform transition-all duration-300 hover:scale-105">
                <CardHeader>
                  <Skeleton className="h-6 w-[200px] bg-green-100" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-8 w-full bg-green-100" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-red-500 text-xl font-semibold">Error: {error}</div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-gray-600 text-xl">No data available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-green-800 text-center">Plant Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-700">Air Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-600">Temperature</span>
                  <span className="text-xl font-semibold text-green-700">{data.environmental_data.air.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <span className="text-gray-600">Humidity</span>
                  <span className="text-xl font-semibold text-green-700">{data.environmental_data.air.humidity}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-amber-700">Soil Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="text-gray-600">Humidity</span>
                  <span className="text-xl font-semibold text-amber-700">{data.environmental_data.soil.humidity}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-yellow-700">Light Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-600">Intensity</span>
                  <span className="text-xl font-semibold text-yellow-700">{data.environmental_data.light.intensity} lux</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <span className="text-gray-600">Duration</span>
                  <span className="text-xl font-semibold text-yellow-700">{data.environmental_data.light.duration} hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-700">Weather</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-600">Temperature</span>
                  <span className="text-xl font-semibold text-blue-700">{data.external_factors.weather.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-600">Precipitation</span>
                  <span className="text-xl font-semibold text-blue-700">{data.external_factors.weather.precipitation}mm</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-600">Cloud Cover</span>
                  <span className="text-xl font-semibold text-blue-700">{data.external_factors.weather.cloud_cover}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-600">Air Quality</span>
                  <span className="text-xl font-semibold text-blue-700">{data.external_factors.weather.air_quality}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="text-gray-600">Moon Phase</span>
                  <span className="text-xl font-semibold text-blue-700">{data.external_factors.weather.moon_phase}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-purple-700">Market Indices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-600">Dow Jones</span>
                  <span className="text-xl font-semibold text-purple-700">{data.external_factors.market_indices.dow_jones}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="text-gray-600">NASDAQ</span>
                  <span className="text-xl font-semibold text-purple-700">{data.external_factors.market_indices.nasdaq}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-indigo-700">Latest News</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.external_factors.news.map((item, index) => (
                  <div key={index} className="p-3 bg-indigo-50 rounded-lg">
                    <p className="text-gray-700">{item}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 
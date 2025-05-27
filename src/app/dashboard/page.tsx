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
    <div className="min-h-screen bg-gradient-to-br from-[#1A1A1A] to-[#2D2D2D] p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-12 text-center text-[#FFD700] tracking-wider uppercase" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          🌱 Plant Dashboard 🌱
        </h1>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/90 border-2 border-[#1A4D3C] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#1A4D3C]/10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
            <CardHeader>
              <CardTitle className="text-[#1A4D3C] text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
                <span className="text-3xl">💨</span> Air Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#1A4D3C] hover:bg-[#1A4D3C]/5 transition-colors">
                  <span className="text-[#1A4D3C] font-medium">Temperature</span>
                  <span className="text-2xl font-bold text-[#1A4D3C] animate-pulse">{data.environmental_data.air.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#1A4D3C] hover:bg-[#1A4D3C]/5 transition-colors">
                  <span className="text-[#1A4D3C] font-medium">Humidity</span>
                  <span className="text-2xl font-bold text-[#1A4D3C] animate-pulse">{data.environmental_data.air.humidity}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/90 border-2 border-[#B8860B] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#B8860B]/10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
            <CardHeader>
              <CardTitle className="text-[#B8860B] text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
                <span className="text-3xl">🌱</span> Soil Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#B8860B] hover:bg-[#B8860B]/5 transition-colors">
                  <span className="text-[#B8860B] font-medium">Humidity</span>
                  <span className="text-2xl font-bold text-[#B8860B] animate-pulse">{data.environmental_data.soil.humidity}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/90 border-2 border-[#0066CC] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0066CC]/10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
            <CardHeader>
              <CardTitle className="text-[#0066CC] text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
                <span className="text-3xl">☀️</span> Light Conditions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#0066CC] hover:bg-[#0066CC]/5 transition-colors">
                  <span className="text-[#0066CC] font-medium">Intensity</span>
                  <span className="text-2xl font-bold text-[#0066CC] animate-pulse">{data.environmental_data.light.intensity} lux</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#0066CC] hover:bg-[#0066CC]/5 transition-colors">
                  <span className="text-[#0066CC] font-medium">Duration</span>
                  <span className="text-2xl font-bold text-[#0066CC] animate-pulse">{data.environmental_data.light.duration} hours</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/90 border-2 border-[#0000CD] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#0000CD]/10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
            <CardHeader>
              <CardTitle className="text-[#0000CD] text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
                <span className="text-3xl">🌤️</span> Weather
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#0000CD] hover:bg-[#0000CD]/5 transition-colors">
                  <span className="text-[#0000CD] font-medium">Temperature</span>
                  <span className="text-2xl font-bold text-[#0000CD] animate-pulse">{data.external_factors.weather.temperature}°C</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#0000CD] hover:bg-[#0000CD]/5 transition-colors">
                  <span className="text-[#0000CD] font-medium">Precipitation</span>
                  <span className="text-2xl font-bold text-[#0000CD] animate-pulse">{data.external_factors.weather.precipitation}mm</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#0000CD] hover:bg-[#0000CD]/5 transition-colors">
                  <span className="text-[#0000CD] font-medium">Cloud Cover</span>
                  <span className="text-2xl font-bold text-[#0000CD] animate-pulse">{data.external_factors.weather.cloud_cover}%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#0000CD] hover:bg-[#0000CD]/5 transition-colors">
                  <span className="text-[#0000CD] font-medium">Air Quality</span>
                  <span className="text-2xl font-bold text-[#0000CD] animate-pulse">{data.external_factors.weather.air_quality}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#0000CD] hover:bg-[#0000CD]/5 transition-colors">
                  <span className="text-[#0000CD] font-medium">Moon Phase</span>
                  <span className="text-2xl font-bold text-[#0000CD] animate-pulse">{data.external_factors.weather.moon_phase}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/90 border-2 border-[#8A2BE2] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#8A2BE2]/10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
            <CardHeader>
              <CardTitle className="text-[#8A2BE2] text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
                <span className="text-3xl">📈</span> Market Indices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#8A2BE2] hover:bg-[#8A2BE2]/5 transition-colors">
                  <span className="text-[#8A2BE2] font-medium">Dow Jones</span>
                  <span className="text-2xl font-bold text-[#8A2BE2] animate-pulse">{data.external_factors.market_indices.dow_jones}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-white/80 rounded-lg border-l-4 border-[#8A2BE2] hover:bg-[#8A2BE2]/5 transition-colors">
                  <span className="text-[#8A2BE2] font-medium">NASDAQ</span>
                  <span className="text-2xl font-bold text-[#8A2BE2] animate-pulse">{data.external_factors.market_indices.nasdaq}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="transform transition-all duration-300 hover:scale-105 bg-white/90 border-2 border-[#008B8B] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#008B8B]/10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
            <CardHeader>
              <CardTitle className="text-[#008B8B] text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
                <span className="text-3xl">📰</span> Latest News
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.external_factors.news.map((item, index) => (
                  <div key={index} className="p-4 bg-white/80 rounded-lg border-l-4 border-[#008B8B] hover:bg-[#008B8B]/5 transition-colors">
                    <p className="text-[#008B8B] font-medium">{item}</p>
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
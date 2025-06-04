import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { GenerateNewDiaryButton } from '@/components/GenerateNewDiaryButton';
import { PublishToBlueskyButton } from './PublishToBlueskyButton';

export function PlantDiary() {
  const [diary, setDiary] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDiary = async () => {
    try {
      const response = await fetch('/api/plant-diary');
      if (!response.ok) {
        throw new Error('Failed to fetch plant diary');
      }
      const data = await response.json();
      setDiary(data.diary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiary();
  }, []);

  const handleDiaryGenerated = (newDiary: string) => {
    console.log('New text received:', newDiary);
    setDiary(newDiary);
  };

  if (loading) {
    return (
      <Card className="transform transition-all duration-300 hover:scale-105 bg-white/90 border-2 border-[#4CAF50] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4CAF50]/10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
        <CardHeader>
          <CardTitle className="text-[#4CAF50] text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
            <span className="text-3xl">📝</span> Plant Diary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-white/80 rounded-lg border-l-4 border-[#4CAF50] hover:bg-[#4CAF50]/5 transition-colors">
            <p className="text-[#4CAF50]">Loading diary...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="transform transition-all duration-300 hover:scale-105 bg-white/90 border-2 border-[#4CAF50] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#4CAF50]/10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
        <CardHeader>
          <CardTitle className="text-[#4CAF50] text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
            <span className="text-3xl">📝</span> Plant Diary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-white/80 rounded-lg border-l-4 border-[#4CAF50] hover:bg-[#4CAF50]/5 transition-colors">
            <p className="text-red-500">Error: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="transform transition-all duration-300 hover:scale-105 bg-white/90 border-2 border-[#4CAF50] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#4CAF50]/10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:scale-110 transition-transform"></div>
      <CardHeader>
        <CardTitle className="text-[#4CAF50] text-2xl font-bold tracking-wider uppercase flex items-center gap-2">
          <span className="text-3xl">📝</span> Plant Diary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-4 bg-white/80 rounded-lg border-l-4 border-[#4CAF50] hover:bg-[#4CAF50]/5 transition-colors">
          <p className="text-[#4CAF50] whitespace-pre-wrap">{diary}</p>
        </div>
        <div className="mt-4 space-y-4">
          <GenerateNewDiaryButton onDiaryGenerated={handleDiaryGenerated} />
          <PublishToBlueskyButton currentDiary={diary} />
        </div>
      </CardContent>
    </Card>
  );
} 
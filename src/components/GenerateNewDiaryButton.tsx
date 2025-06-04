'use client';

import { useState } from 'react';

interface GenerateNewDiaryButtonProps {
  onDiaryGenerated: (diary: string) => void;
}

export function GenerateNewDiaryButton({ onDiaryGenerated }: GenerateNewDiaryButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/generate-diary');
      if (!response.ok) {
        throw new Error('Failed to generate new diary');
      }
      const data = await response.json();
      onDiaryGenerated(data.diary);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-end items-center gap-4">
      <button
        onClick={handleGenerate}
        disabled={isLoading}
        className="px-4 py-2 bg-[#4CAF50] text-white rounded hover:bg-[#45a049] disabled:opacity-50 transition-colors text-sm"
      >
        {isLoading ? 'Generating...' : 'Generate new text'}
      </button>
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </div>
  );
} 
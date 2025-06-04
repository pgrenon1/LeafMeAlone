import { useState } from 'react';
import { Button } from './ui/button';

interface PublishToBlueskyButtonProps {
  currentDiary: string;
}

export function PublishToBlueskyButton({ currentDiary }: PublishToBlueskyButtonProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePublish = async () => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/publish-diary', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ diary: currentDiary }),
      });

      if (!response.ok) {
        throw new Error('Failed to publish to Bluesky');
      }

      const data = await response.json();
      setResult('Successfully published to Bluesky!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-end items-center gap-4">
      <Button
        onClick={handlePublish}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Publishing...' : 'Publish on Bluesky'}
      </Button>
      {result && <p className="text-green-600 text-sm">{result}</p>}
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </div>
  );
} 
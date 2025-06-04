import { NextResponse } from 'next/server';
import { publishTestMessage } from '../../../lib/bluesky';

export async function POST() {
  try {
    await publishTestMessage();
    return NextResponse.json({ success: true, message: 'Test message published successfully' });
  } catch (error) {
    console.error('Error publishing test message:', error);
    return NextResponse.json(
      { error: 'Failed to publish test message', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 
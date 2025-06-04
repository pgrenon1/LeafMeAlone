import { BskyAgent } from '@atproto/api';
import { generatePlantDiary } from './openrouter';
import clientPromise from './db';
import { PlantData } from '../types/plant';

const BLUESKY_IDENTIFIER = process.env.BLUESKY_IDENTIFIER;
const BLUESKY_PASSWORD = process.env.BLUESKY_PASSWORD;

export async function publishTestMessage() {
  if (!BLUESKY_IDENTIFIER || !BLUESKY_PASSWORD) {
    throw new Error('Bluesky credentials are not configured');
  }

  try {
    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });

    await agent.login({
      identifier: BLUESKY_IDENTIFIER,
      password: BLUESKY_PASSWORD,
    });

    const post = {
      text: `🌱 LeafMeAlone Test 🌱\n\nThis is a test message to verify the connection with Bluesky.\n\n#LeafMeAlone #Test`,
      createdAt: new Date().toISOString(),
    };

    await agent.post(post);
    console.log('Test message published to Bluesky successfully');
    return true;
  } catch (error) {
    console.error('Error publishing test message to Bluesky:', error);
    throw error;
  }
}

export async function publishPlantDiary(diary: string) {
  if (!BLUESKY_IDENTIFIER || !BLUESKY_PASSWORD) {
    throw new Error('Bluesky credentials are not configured');
  }

  try {
    // Publish to Bluesky
    const agent = new BskyAgent({
      service: 'https://bsky.social'
    });

    await agent.login({
      identifier: BLUESKY_IDENTIFIER,
      password: BLUESKY_PASSWORD,
    });

    const post = {
      text: `🌱 ${diary}`,
      createdAt: new Date().toISOString(),
    };

    // Check total length
    if (post.text.length > 300) {
      throw new Error(`Text is too long (${post.text.length} characters). Maximum allowed: 300 characters.`);
    }

    await agent.post(post);
    console.log('Plant diary published to Bluesky successfully');
  } catch (error) {
    console.error('Error publishing plant diary to Bluesky:', error);
    throw error;
  }
} 
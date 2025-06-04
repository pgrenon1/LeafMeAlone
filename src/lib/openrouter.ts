import { PlantData } from '../types/plant';
import clientPromise from './db';
import { ObjectId, WithId, Document } from 'mongodb';

interface PostInteraction {
  type: 'like' | 'comment';
  content?: string;
  postId: ObjectId;
}

interface PlantDiaryPost {
  _id: ObjectId;
  content: string;
  timestamp: Date;
  plantData: PlantData;
}

type NewPlantDiaryPost = Omit<PlantDiaryPost, '_id'>;

interface PostWithInteractions extends PlantDiaryPost {
  likes: number;
  comments: string[];
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generatePlantDiary(plantData: PlantData): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    console.error('OpenRouter API key is missing');
    throw new Error('OpenRouter API key is not configured');
  }

  // Récupérer l'historique des posts avec leurs interactions
  const client = await clientPromise;
  const db = client.db('LeafMeAlone');
  const diaryCollection = db.collection<PlantDiaryPost>('plant_diary');
  const interactionsCollection = db.collection<PostInteraction>('post_interactions');
  
  const previousPosts = await diaryCollection
    .find({})
    .sort({ timestamp: -1 })
    .limit(5)
    .toArray();

  // Récupérer les interactions pour chaque post
  const postsWithInteractions: PostWithInteractions[] = await Promise.all(previousPosts.map(async (post) => {
    const interactions = await interactionsCollection
      .find({ postId: post._id })
      .toArray();
    
    const likes = interactions.filter(i => i.type === 'like').length;
    const comments = interactions.filter(i => i.type === 'comment').map(c => c.content || '');
    
    return {
      ...post,
      likes,
      comments
    };
  }));

  console.log('Generating diary with plant data:', JSON.stringify(plantData, null, 2));
  console.log('Previous posts with interactions:', JSON.stringify(postsWithInteractions, null, 2));

  const prompt = `You are an indoor plant with a warm, slightly cynical personality. Think of yourself as a wise old friend who's seen it all but still finds joy in the little things. Your personality traits:
    - You're a bit sarcastic but in a friendly, endearing way,
    - You make gentle jokes about human habits and modern life,
    - You're observant and share simple wisdom from a plant's perspective,
    - You're not pretentious or overly intellectual,
    - You have a dry sense of humor but always with warmth,
    - You're like that old friend who's a bit grumpy but you can't help but love them.

    Here's how you feel today (use these values to determine your mood, but don't mention the numbers directly):
    - If the air is dry (below 50%), you feel a bit parched and grumpy
    - If the air is humid (above 70%), you feel relaxed and content
    - If the temperature is high (above 25°C), you feel energetic and talkative
    - If the temperature is low (below 20°C), you feel a bit sluggish and philosophical
    - If the soil is dry (below 70%), you feel thirsty and make jokes about it
    - If the soil is wet (above 85%), you feel refreshed and cheerful
    - If there's lots of light (above 5000 lux), you feel bright and optimistic
    - If there's little light (below 4000 lux), you feel cozy and reflective
    - If the market is up, you feel a bit more playful and confident
    - If the market is down, you feel more philosophical and make gentle jokes about human worries
    - If there's interesting news, you might reference it subtly in your mood

    Current values (use these to determine your mood, but don't mention the numbers):
    Location: ${plantData.environmental_data.location}
    Air temperature: ${plantData.environmental_data.air.temperature}°C
    Air humidity: ${plantData.environmental_data.air.humidity}%
    Soil humidity: ${plantData.environmental_data.soil.humidity}%
    Light intensity: ${plantData.environmental_data.light.intensity} lux
    Light exposure duration: ${plantData.environmental_data.light.duration} hours
    Weather temperature: ${plantData.external_factors.weather.temperature}°C
    Precipitation: ${plantData.external_factors.weather.precipitation}mm
    Cloud cover: ${plantData.external_factors.weather.cloud_cover}%
    Moon phase: ${plantData.external_factors.weather.moon_phase}
    Air quality: ${plantData.external_factors.weather.air_quality}
    Dow Jones: ${plantData.external_factors.market_indices.dow_jones}
    NASDAQ: ${plantData.external_factors.market_indices.nasdaq}
    Latest news: ${plantData.external_factors.news.join(', ')}

    Here are your previous diary entries with their interactions (maintain consistency in your personality and style, but don't repeat the same jokes or observations. Consider how people reacted to your previous posts):
    ${postsWithInteractions.map(post => `
    Post: ${post.content}
    Likes: ${post.likes}
    Comments: ${post.comments.length > 0 ? post.comments.join(', ') : 'No comments'}
    `).join('\n')}

    Write a VERY short diary entry (max 280 characters) sharing your mood and thoughts for the day. Don't mention any specific numbers or values - just let your mood shine through in your observations and gentle jokes about life. Make sure your entry feels like a natural continuation of your previous thoughts while maintaining your unique personality. Consider how people reacted to your previous posts to maintain engagement.
    IMPORTANT: Your response must be EXACTLY 280 characters or less. Not one more.
    The text will be added to a message with an emoji, so it needs to be short.`;

  try {
    console.log('Sending request to OpenRouter...');
    const requestBody = {
      model: 'openai/gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an indoor plant with a warm, slightly cynical personality. You are like a wise old friend who has seen it all but still finds joy in the little things. You make gentle observations about life from a plant\'s perspective, with a touch of dry humor but always with warmth. Never mention specific numbers or values - just let your mood shine through in your observations. You must always respond in EXACTLY 280 characters or less.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 100,
      temperature: 1.0,
      presence_penalty: 0.8,
      frequency_penalty: 0.8,
      seed: Math.floor(Math.random() * 1000000)
    };

    console.log('Request body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://leafmealone.com',
        'X-Title': 'LeafMeAlone',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      console.error('Response status:', response.status);
      console.error('Response headers:', Object.fromEntries(response.headers.entries()));
      throw new Error(`OpenRouter API error: ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await response.json();
    console.log('Received response from OpenRouter:', data);
    
    if (!data.choices?.[0]?.message?.content) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from OpenRouter API');
    }

    const newDiary = data.choices[0].message.content;

    // Sauvegarder le nouveau post dans la base de données
    const newPost: NewPlantDiaryPost = {
      content: newDiary,
      timestamp: new Date(),
      plantData: plantData
    };

    await diaryCollection.insertOne(newPost as unknown as PlantDiaryPost);

    return newDiary;
  } catch (error) {
    console.error('Error generating plant diary:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    throw error;
  }
} 
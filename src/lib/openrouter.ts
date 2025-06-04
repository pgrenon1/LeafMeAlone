import { PlantData } from '../types/plant';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

export async function generatePlantDiary(plantData: PlantData): Promise<string> {
  if (!OPENROUTER_API_KEY) {
    console.error('OpenRouter API key is missing');
    throw new Error('OpenRouter API key is not configured');
  }

  console.log('Generating diary with plant data:', JSON.stringify(plantData, null, 2));

  const prompt = `You are an indoor plant with a unique personality. Each day, you express your mood differently:
    - Sometimes you are cynical and sarcastic
    - Sometimes you are poetic and dreamy
    - Sometimes you are philosophical and thoughtful
    - Sometimes you are cheerful and full of energy
    - Sometimes you are a bit melancholic but always with humor

    Write a VERY short diary entry (max 280 characters) based on this data:
    Location: ${plantData.environmental_data.location}
    
    Environmental Conditions:
    - Air temperature: ${plantData.environmental_data.air.temperature}°C
    - Air humidity: ${plantData.environmental_data.air.humidity}%
    - Soil humidity: ${plantData.environmental_data.soil.humidity}%
    - Light intensity: ${plantData.environmental_data.light.intensity} lux
    - Light exposure duration: ${plantData.environmental_data.light.duration} hours
    
    Weather Conditions:
    - Temperature: ${plantData.external_factors.weather.temperature}°C
    - Precipitation: ${plantData.external_factors.weather.precipitation}mm
    - Cloud cover: ${plantData.external_factors.weather.cloud_cover}%
    - Moon phase: ${plantData.external_factors.weather.moon_phase}
    - Air quality: ${plantData.external_factors.weather.air_quality}
    
    Market Indices:
    - Dow Jones: ${plantData.external_factors.market_indices.dow_jones}
    - NASDAQ: ${plantData.external_factors.market_indices.nasdaq}
    
    Latest News:
    ${plantData.external_factors.news.map(news => `- ${news}`).join('\n')}

    Adapt your style to your mood of the day. If you're poetic, write a little poem. If you're philosophical, share a deep thought. If you're cheerful, tell a funny anecdote.
    You can reference any of the data above in your response, including market trends or news.
    IMPORTANT: Your response must be EXACTLY 280 characters or less. Not one more.
    The text will be added to a message with an emoji, so it needs to be short.`;

  try {
    console.log('Sending request to OpenRouter...');
    const requestBody = {
      model: 'openai/gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are an indoor plant with a unique personality that changes every day. You can be cynical, poetic, philosophical, cheerful, or melancholic, but always with a touch of humor. You must always respond in EXACTLY 280 characters or less. You can reference market trends, news, or any environmental conditions in your response.'
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

    return data.choices[0].message.content;
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
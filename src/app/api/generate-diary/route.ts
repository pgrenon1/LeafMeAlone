import { NextResponse } from 'next/server';
import { generatePlantDiary } from '../../../lib/openrouter';
import clientPromise from '../../../lib/db';
import { PlantData } from '../../../types/plant';

export async function GET() {
  try {
    console.log('Starting diary generation...');
    
    // Get latest plant data
    console.log('Connecting to database...');
    const client = await clientPromise;
    console.log('Database connection successful');
    
    const db = client.db('LeafMeAlone');
    const collection = db.collection('plant_data');
    
    console.log('Fetching latest plant data...');
    const latestData = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (latestData.length === 0) {
      console.error('No plant data found');
      return NextResponse.json({ error: 'No plant data found' }, { status: 404 });
    }

    console.log('Plant data retrieved:', JSON.stringify(latestData[0], null, 2));

    const plantData = {
      environmental_data: latestData[0].environmental_data,
      external_factors: latestData[0].external_factors
    } as PlantData;

    // Generate diary with data
    console.log('Generating diary with plant data:', JSON.stringify(plantData, null, 2));
    const diary = await generatePlantDiary(plantData);
    console.log('Diary generated:', diary);

    return NextResponse.json({ diary });
  } catch (error) {
    console.error('Error generating diary:', error);
    if (error instanceof Error) {
      console.error('Error details:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
    }
    return NextResponse.json(
      { error: 'Failed to generate plant diary' },
      { status: 500 }
    );
  }
} 
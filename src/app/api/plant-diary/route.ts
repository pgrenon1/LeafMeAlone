import { NextResponse } from 'next/server';
import { generatePlantDiary } from '../../../lib/openrouter';
import clientPromise from '../../../lib/db';
import { PlantData } from '../../../types/plant';

export async function GET() {
  try {
    // Get latest plant data
    const client = await clientPromise;
    const db = client.db('LeafMeAlone');
    const collection = db.collection('plant_data');
    
    const latestData = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (latestData.length === 0) {
      return NextResponse.json({ error: 'No plant data found' }, { status: 404 });
    }

    const plantData = {
      environmental_data: latestData[0].environmental_data,
      external_factors: latestData[0].external_factors
    } as PlantData;

    // Generate diary with data
    const diary = await generatePlantDiary(plantData);

    return NextResponse.json({ diary });
  } catch (error) {
    console.error('Error generating plant diary:', error);
    return NextResponse.json(
      { error: 'Failed to generate plant diary' },
      { status: 500 }
    );
  }
} 
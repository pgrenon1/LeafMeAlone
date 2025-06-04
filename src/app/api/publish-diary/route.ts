import { NextResponse } from 'next/server';
import { publishPlantDiary } from '../../../lib/bluesky';
import clientPromise from '../../../lib/db';

export async function POST(request: Request) {
  try {
    console.log('Starting diary publication process...');
    
    // Get the diary text from the request
    const { diary } = await request.json();
    if (!diary) {
      return NextResponse.json({ error: 'No diary text provided' }, { status: 400 });
    }

    // Check database connection
    console.log('Connecting to database...');
    const client = await clientPromise;
    const db = client.db('LeafMeAlone');
    const collection = db.collection('plant_data');
    
    // Check data
    console.log('Fetching latest plant data...');
    const latestData = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (latestData.length === 0) {
      console.error('No plant data found in database');
      return NextResponse.json({ error: 'No plant data found' }, { status: 404 });
    }

    console.log('Found plant data:', JSON.stringify(latestData[0], null, 2));

    // Publish diary
    console.log('Publishing diary...');
    await publishPlantDiary(diary);
    
    console.log('Diary published successfully');
    return NextResponse.json({ success: true, message: 'Diary published successfully' });
  } catch (error) {
    console.error('Error in publish-diary route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to publish diary',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 
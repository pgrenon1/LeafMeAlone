import { NextResponse } from 'next/server';
import clientPromise from '../../../lib/db';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('LeafMeAlone');
    const collection = db.collection('plant_data');
    
    // Get the latest document
    const latestData = await collection
      .find({})
      .sort({ timestamp: -1 })
      .limit(1)
      .toArray();

    if (latestData.length === 0) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    return NextResponse.json(latestData[0]);
  } catch (error) {
    console.error('Error fetching plant data:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
} 
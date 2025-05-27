# LeafMeAlone

A plant monitoring system that tracks environmental conditions and external factors affecting plant growth.

## Data Structure

The system collects and stores the following data:

### Environmental Data
- Location (living_room, bedroom, kitchen, balcony)
- Air conditions:
  - Humidity
  - Temperature
- Soil conditions:
  - Humidity
- Light conditions:
  - Intensity
  - Duration

### External Factors
- Weather conditions:
  - Temperature
  - Precipitation
  - Cloud cover
  - Moon phase
  - Air quality
- News updates
  - Sports
  - Politics
  - Science
  - Economy

## Setup

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
# On Windows
.\venv\Scripts\activate
# On Unix or MacOS
source venv/bin/activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create a `.env` file in the project root with your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string
```

## Usage

1. Generate sample data:
```bash
python generate_data.py
```

2. View the data in MongoDB:
```bash
# Connect to MongoDB and use the LeafMeAlone database
mongosh "your_mongodb_connection_string"
use LeafMeAlone
db.plant_data.find().pretty()
```

## Running the Application

1. Make sure you have all dependencies installed:
```bash
npm install
# or
yarn install
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open your web browser and navigate to:
```
http://localhost:3000/dashboard
```

The application will be running in development mode. You can start editing the page by modifying files in the `app` directory. The page will auto-update as you edit the files.

For production deployment:
```bash
npm run build
npm start
# or
yarn build
yarn start
```
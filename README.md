# LeafMeAlone

A plant monitoring system that tracks environmental conditions and external factors affecting plant growth.

## Data Structure

The system collects and stores the following data:

### Environmental Data
- Location (living_room, bedroom, kitchen, balcony)
- Air conditions:
  - Humidity (40-80%)
  - Temperature (18-28°C)
- Soil conditions:
  - Humidity (60-90%)
- Light conditions:
  - Intensity (4000-6000 lux)
  - Duration (4-8 hours)

### External Factors
- Weather conditions:
  - Temperature (15-30°C)
  - Precipitation (0-10mm)
  - Cloud cover (0-100%)
  - Moon phase
  - Air quality (70-95)
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
## Project Overview
LeafMeAlone is a smart plant monitoring and interaction system.

## Input Data

### Environmental Sensors
- **Humidity**
  - Air humidity percentage
  - Soil moisture percentage
- **Water**
  - Water reservoir level
- **Light**
  - Sunshine duration
  - Light intensity
- **Soil Chemistry**
  - pH level
  - NPK nutrient levels
- **Temperature**

### External Data
- **Current Events**
  - Stock market updates
  - Political news
  - Scientific discoveries
  - Miscellaneous news
- **Weather**
  - Precipitation
  - Temperature
  - Weather alerts
  - Cloud cover
  - Air quality
  - Moon phases
- **Images**
  - Webcam photos

## Database
- *To be determined*

## Output
- LLM with personality (Monday?)
- Speaker for audio feedback
- Printer capabilities


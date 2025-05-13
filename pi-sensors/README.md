# MuddyBuddy Raspberry Pi Sensor Setup

This directory contains the code for reading sensor data from a Raspberry Pi and sending it to the MuddyBuddy API.

## Required Hardware

1. Raspberry Pi (any recent model)
2. Sensors:
   - DHT22 (Temperature and Humidity)
   - Capacitive Soil Moisture Sensor
   - (Optional) Camera Module

## Project Structure

```
pi-sensors/
├── sensors/                  # Sensor modules
│   ├── __init__.py          # Package initialization
│   ├── dht22.py             # DHT22 temperature/humidity sensor
│   └── soil_moisture.py     # Soil moisture sensor
├── sensor_reader.py         # Main script
├── requirements.txt         # Python dependencies
└── README.md               # This file
```

## Setup Instructions

1. Install required Python packages:
   ```bash
   pip install -r requirements.txt
   ```

2. Enable I2C interface on Raspberry Pi:
   ```bash
   sudo raspi-config
   # Navigate to Interface Options > I2C > Enable
   ```

3. Connect sensors:
   - DHT22: Connect to GPIO 4 (update pin in sensor_reader.py if different)
   - Soil Moisture: Connect to GPIO 17 (update pin in sensor_reader.py if different)

4. Update configuration in `sensor_reader.py`:
   - Update `API_URL` with your MuddyBuddy API address
   - Update `SENSOR_READ_INTERVAL` as needed
   - Update GPIO pins if using different connections
   - Update location information

5. Run the sensor reader:
   ```bash
   python sensor_reader.py
   ```

## Sensor Data Flow

1. Script reads data from all connected sensors
2. Data is formatted to match MuddyBuddy API schema
3. Data is sent to API every 5 minutes (configurable)
4. API stores data in MongoDB database

## Troubleshooting

1. Check sensor connections
2. Verify I2C is enabled
3. Check API URL is correct
4. Monitor for error messages in console

## Next Steps

1. Add light intensity sensor
2. Implement camera functionality
3. Add weather API integration
4. Add data analysis features 
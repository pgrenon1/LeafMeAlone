#!/usr/bin/env python3
"""
MuddyBuddy Sensor Reader
This script reads data from various sensors connected to a Raspberry Pi
and sends it to the MuddyBuddy API.
"""

import time
import json
import requests
from datetime import datetime
import RPi.GPIO as GPIO
from sensors.dht22 import DHT22Sensor
from sensors.soil_moisture import SoilMoistureSensor
from weather.weather_reader import WeatherReader

# Configuration
API_URL = "http://localhost:3000/api/plantdata"  # Update with your API URL
SENSOR_READ_INTERVAL = 300  # 5 minutes in seconds

# Initialize sensors
dht22 = DHT22Sensor(pin=4)  # Update with your actual pin
soil_moisture = SoilMoistureSensor(pin=17)  # Update with your actual pin
weather_reader = WeatherReader(latitude=52.52, longitude=13.41)  # Update with your location

def read_sensors():
    """Read all sensors and return formatted data"""
    try:
        # Read DHT22 sensor
        temp_humidity = dht22.read()
        if temp_humidity:
            air_temp, air_humidity = temp_humidity
        else:
            air_temp = None
            air_humidity = None
        
        # Read soil moisture
        soil_moisture_level = soil_moisture.read()
        
        return {
            "air_temp": air_temp,
            "air_humidity": air_humidity,
            "soil_moisture": soil_moisture_level
        }
    
    except Exception as e:
        print(f"Error reading sensors: {e}")
        return None

def get_weather_data():
    """Get weather data from external API"""
    try:
        # Use the WeatherReader class to get weather data
        weather_data = weather_reader.get_data()
        
        if weather_data:
            return weather_data
        else:
            # Fallback to placeholder data if API call fails
            return {
                "temperature": 22.5,
                "precipitation": 0,
                "cloud_cover": 25,
                "moon_phase": "waxing_gibbous",
                "air_quality": 87
            }
    except Exception as e:
        print(f"Error getting weather data: {e}")
        return None

def get_manual_variables():
    """Get manually set variables"""
    # These would be variables that don't come from sensors
    return {
        "location": "living_room",
        "light": {
            "intensity": 5400,
            "duration": 6.5
        },
        "news": [
            "Local elections scheduled next month",
            "New plant growth hormone identified",
            "Water conservation measures announced in region"
        ]
    }

def format_data(sensor_data, weather_data, manual_data):
    """Format all collected data into the required JSON structure"""
    
    if not sensor_data:
        sensor_data = {"air_temp": None, "air_humidity": None, "soil_moisture": None}
    
    if not weather_data:
        weather_data = {"temperature": None, "precipitation": None, "cloud_cover": None, "moon_phase": None}
    
    data = {
        "timestamp": datetime.utcnow().isoformat(),
        "location": manual_data["location"],
        "air": {
            "humidity": sensor_data["air_humidity"],
            "temperature": sensor_data["air_temp"]
        },
        "soil": {
            "humidity": sensor_data["soil_moisture"]
        },
        "light": manual_data["light"],
        "weather": {
            "temperature": weather_data["temperature"],
            "precipitation": weather_data["precipitation"],
            "cloud_cover": weather_data["cloud_cover"],
            "moon_phase": weather_data["moon_phase"],
            "air_quality": 87  # This would need a proper air quality sensor
        },
        "market_indices": {
            "dow_jones": 36789,  # This would need a financial API
            "nasdaq": 17456
        },
        "news": manual_data["news"]
    }
    
    return data

def send_to_api(data):
    """Send sensor data to MuddyBuddy API"""
    try:
        response = requests.post(API_URL, json=data)
        if response.status_code == 201:
            print("Data sent successfully")
            return True
        else:
            print(f"Error sending data: {response.status_code}")
            return False
    except Exception as e:
        print(f"Error sending to API: {e}")
        return False

def main():
    """Gather data from all sources and send it to the API"""
    print("Starting MuddyBuddy sensor reader...")
    
    try:
        # 1. Get data from sensors
        sensor_data = read_sensors()
        
        # 2. Get data from weather API
        weather_data = get_weather_data()
        
        # 3. Get manual variables
        manual_data = get_manual_variables()
        
        # 4. Format data
        formatted_data = format_data(sensor_data, weather_data, manual_data)
        
        # 5. Send data to API
        success = send_to_api(formatted_data)
        
        if success:
            print("Data collection and transmission completed successfully")
        else:
            print("Failed to send data to API")
    
    except Exception as e:
        print(f"Error in data collection: {e}")
    
    finally:
        # Clean up GPIO resources
        soil_moisture.cleanup()
        dht22.cleanup()
        GPIO.cleanup()

if __name__ == "__main__":
    main() 
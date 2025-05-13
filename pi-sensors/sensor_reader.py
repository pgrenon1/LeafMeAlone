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
from sensors import DHT22Sensor, SoilMoistureSensor

# Configuration
API_URL = "http://localhost:3000/api/plantdata"  # Update with your API URL
SENSOR_READ_INTERVAL = 300  # 5 minutes in seconds

# Initialize sensors
dht22 = DHT22Sensor(pin=4)  # Update with your actual pin
soil_moisture = SoilMoistureSensor(pin=17)  # Update with your actual pin

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
        
        # Create data structure matching API schema
        data = {
            "timestamp": datetime.utcnow().isoformat(),
            "location": {
                "room": "living_room",  # Update with your actual location
                "position": "east_window"
            },
            "environmental_data": {
                "air": {
                    "humidity": air_humidity,
                    "temperature": air_temp,
                    "quality": 85  # This would need a proper air quality sensor
                },
                "soil": {
                    "humidity": soil_moisture_level,
                    "ph": 6.5,  # This would need a pH sensor
                    "nutrients": {
                        "nitrogen": 150,  # These would need proper sensors
                        "phosphorus": 75,
                        "potassium": 200
                    }
                },
                "light": {
                    "intensity": None,  # Will be implemented later
                    "duration": 6.5,  # This would need to be calculated
                    "spectrum": "full_spectrum"  # This would need a proper sensor
                },
                "water_reservoir": {
                    "level": 450,  # This would need a water level sensor
                    "capacity": 1000  # Update with your actual capacity
                }
            },
            "external_factors": {
                "weather": {
                    "temperature": air_temp,  # Using indoor temp as placeholder
                    "precipitation": 0,  # This would need a weather API
                    "cloud_cover": 25,  # This would need a weather API
                    "moon_phase": "waxing_gibbous"  # This would need an API
                },
                "market_indices": {
                    "dow_jones": 36789,  # This would need a financial API
                    "nasdaq": 17456
                },
                "news": []  # This would need a news API
            },
            "media": {
                "image": {
                    "id": f"img_{datetime.now().strftime('%Y%m%d_%H%M%S')}",
                    "reference": ""  # This would need a camera setup
                }
            },
            "plant_status": {
                "health_rating": 85,  # This would need analysis of sensor data
                "growth_stage": "vegetative",
                "last_watered": datetime.utcnow().isoformat(),
                "observations": "Automatic sensor reading"
            }
        }
        
        return data
    
    except Exception as e:
        print(f"Error reading sensors: {e}")
        return None

def send_to_api(data):
    """Send sensor data to MuddyBuddy API"""
    try:
        response = requests.post(API_URL, json=data)
        if response.status_code == 201:
            print("Data sent successfully")
        else:
            print(f"Error sending data: {response.status_code}")
    except Exception as e:
        print(f"Error sending to API: {e}")

def main():
    """Main loop for reading and sending sensor data"""
    print("Starting MuddyBuddy sensor reader...")
    
    try:
        while True:
            try:
                # Read sensors
                sensor_data = read_sensors()
                
                if sensor_data:
                    # Send to API
                    send_to_api(sensor_data)
                
                # Wait for next reading
                time.sleep(SENSOR_READ_INTERVAL)
                
            except KeyboardInterrupt:
                print("\nStopping sensor reader...")
                break
            except Exception as e:
                print(f"Error in main loop: {e}")
                time.sleep(60)  # Wait a minute before retrying
                
    finally:
        # Clean up GPIO resources
        soil_moisture.cleanup()
        GPIO.cleanup()

if __name__ == "__main__":
    main() 
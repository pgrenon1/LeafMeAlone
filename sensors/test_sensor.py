#!/usr/bin/env python3
"""
Test Script for Soil Moisture Sensor
This script demonstrates the functionality of the SoilMoistureSensor class.
"""

import time
from soil_moisture import SoilMoistureSensor

def test_soil_moisture_sensor():
    try:
        # Initialize the sensor
        sensor = SoilMoistureSensor()
        print("\n=== Soil Moisture Sensor Test ===\n")

        # Test calibration
        print("Starting calibration process...")
        
        # Calibrate for air (minimum value)
        sensor.calibrate(mode="air")
        
        # Calibrate for water (maximum value)
        sensor.calibrate(mode="water")
        
        # Take multiple readings
        print("\nTaking moisture readings...")
        for i in range(5):
            moisture = sensor.read()
            if moisture is not None:
                print(f"Reading {i+1}: {moisture:.1f}% moisture")
            else:
                print(f"Reading {i+1}: Failed to read sensor")
            time.sleep(2)
            
    except Exception as e:
        print(f"\nError during testing: {e}")
        
    finally:
        # Clean up
        print("\nCleaning up GPIO...")
        sensor.cleanup()
        print("Test complete!")

if __name__ == "__main__":
    test_soil_moisture_sensor()

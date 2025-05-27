#!/usr/bin/env python3
"""
Soil Moisture Sensor Module
This module provides functions to read soil moisture from a capacitive sensor.
"""

import RPi.GPIO as GPIO
import time
from typing import Optional
from .config import SOIL_MOISTURE_CONFIG

class SoilMoistureSensor:
    def __init__(self, pin: int = SOIL_MOISTURE_CONFIG["pin"]):
        """
        Initialize soil moisture sensor
        
        Args:
            pin (int): GPIO pin number where sensor is connected
        """
        self.pin = pin
        self.config = SOIL_MOISTURE_CONFIG
        
        GPIO.setmode(GPIO.BCM)
        GPIO.setup(self.pin, GPIO.IN)

    def calibrate(self, mode: str = "air"):
        """
        Calibrate the sensor for minimum (air) or maximum (water) values
        
        Args:
            mode (str): Calibration mode - "air" or "water"
        """
        if mode not in ["air", "water"]:
            print("Invalid calibration mode. Use 'air' or 'water'")
            return

        print(f"\nCalibrating sensor in {mode}...")
        print(f"Place the sensor in {mode} and press Enter when ready")
        input()
        
        values = []
        print("Taking measurements...")
        
        try:
            for i in range(self.config["calibration_samples"]):
                raw_value = GPIO.input(self.pin)
                values.append(raw_value)
                print(f"Sample {i+1}: {raw_value}")
                time.sleep(0.5)
            
            # Calculate average
            avg_value = sum(values) / len(values)
            
            print(f"\nCalibration complete!")
            print(f"Average {mode} value: {avg_value}")
            print(f"Calibration data saved to {self.calibration_file}")
            
        except Exception as e:
            print(f"Error during calibration: {e}")

    def read(self) -> Optional[float]:
        """
        Read soil moisture level
        
        Returns:
            float or None: Moisture level (0-100) or None if reading failed
        """
        try:
            # Read raw value from sensor
            raw_value = GPIO.input(self.pin)
            
            # Convert to percentage (adjust these values based on your sensor calibration)
            # You might need to adjust these values based on your specific sensor
            min_value = self.config["min_value"]  # Value when sensor is in air
            max_value = self.config["max_value"]  # Value when sensor is in water
            
            # Calculate percentage
            percentage = ((raw_value - min_value) / (max_value - min_value)) * 100
            
            # Ensure value is between 0 and 100
            percentage = max(0, min(100, percentage))
            
            return percentage
            
        except Exception as e:
            print(f"Error reading soil moisture sensor: {e}")
            return None

    def cleanup(self):
        """Clean up GPIO resources"""
        GPIO.cleanup(self.pin) 
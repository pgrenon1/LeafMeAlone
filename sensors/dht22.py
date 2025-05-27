#!/usr/bin/env python3
"""
DHT22 Sensor Module
This module provides functions to read temperature and humidity from a DHT22 sensor.
"""

import Adafruit_DHT
import RPi.GPIO as GPIO
from typing import Optional, Tuple
from .config import DHT22_CONFIG

class DHT22Sensor:
    def __init__(self, pin: int = DHT22_CONFIG["pin"]):
        """
        Initialize DHT22 sensor
        
        Args:
            pin (int): GPIO pin number where sensor is connected
        """
        self.config = DHT22_CONFIG
        self.pin = pin
        self.sensor = Adafruit_DHT.DHT22

    def read(self) -> Optional[Tuple[float, float]]:
        """
        Read temperature and humidity from sensor
        
        Returns:
            tuple or None: (temperature, humidity) or None if reading failed
        """
        try:
            humidity, temperature = Adafruit_DHT.read_retry(self.sensor, self.pin)
            
            if humidity is not None and temperature is not None:
                return temperature, humidity
            return None
            
        except Exception as e:
            print(f"Error reading DHT22 sensor: {e}")
            return None

    def get_temperature(self) -> Optional[float]:
        """
        Get only temperature reading
        
        Returns:
            float or None: Temperature in Celsius or None if reading failed
        """
        reading = self.read()
        return reading[0] if reading else None

    def get_humidity(self) -> Optional[float]:
        """
        Get only humidity reading
        
        Returns:
            float or None: Humidity percentage or None if reading failed
        """
        reading = self.read()
        return reading[1] if reading else None 

    def cleanup(self):
        """Clean up GPIO resources"""
        # The Adafruit_DHT library might handle GPIO internally, 
        # but we'll clean up our pin just in case
        try:
            GPIO.cleanup(self.pin)
        except:
            # If GPIO wasn't set up by us directly, this might fail
            pass 
"""
Sensor Configuration
This module contains configuration settings for all sensors.
"""

# Soil Moisture Sensor Configuration
SOIL_MOISTURE_CONFIG = {
    "pin": 7,  # GPIO pin number
    "min_value": 0,  # Value when sensor is in air (to be calibrated)
    "max_value": 1,  # Value when sensor is in water (to be calibrated)
    "calibration_samples": 10  # Number of samples to take during calibration
}

# DHT22 Sensor Configuration
DHT22_CONFIG = {
    "pin": 4  # GPIO pin number
} 
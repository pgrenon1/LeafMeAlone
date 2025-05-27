#!/usr/bin/env python3
"""
Weather Reader Module
This module fetches weather data from the Open-Meteo API.
"""

import requests
from datetime import datetime
from typing import Dict, Optional, Any


class WeatherReader:
    """
    Class to fetch and parse weather data from Open-Meteo API
    """
    
    def __init__(self, latitude: float = 52.52, longitude: float = 13.41):
        """
        Initialize the weather reader with location coordinates
        
        Args:
            latitude (float): Latitude of the location
            longitude (float): Longitude of the location
        """
        self.base_url = "https://api.open-meteo.com/v1/forecast"
        self.latitude = latitude
        self.longitude = longitude
        
    def get_data(self) -> Optional[Dict[str, Any]]:
        """
        Fetch weather data from Open-Meteo API
        
        Returns:
            dict or None: Weather data dictionary or None if error
        """
        try:
            # Construct query parameters
            params = {
                "latitude": self.latitude,
                "longitude": self.longitude,
                "current": [
                    "temperature_2m",
                    "relative_humidity_2m",
                    "precipitation",
                    "cloud_cover",
                    "weather_code"
                ],
                "daily": [
                    "precipitation_sum",
                    "precipitation_probability_max"
                ],
                "timezone": "auto"
            }
            
            # Make API request
            response = requests.get(self.base_url, params=params)
            
            # Check if request was successful
            if response.status_code == 200:
                weather_data = response.json()
                
                # Format the data for our application
                formatted_data = self._format_weather_data(weather_data)
                return formatted_data
            else:
                print(f"Error fetching weather data: {response.status_code}")
                return None
                
        except Exception as e:
            print(f"Error getting weather data: {e}")
            return None
            
    def _format_weather_data(self, api_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Format the API response data into our application's format
        
        Args:
            api_data (dict): Raw API response data
            
        Returns:
            dict: Formatted weather data
        """
        # Extract the current weather data
        current = api_data.get("current", {})
        daily = api_data.get("daily", {})
        
        # Map weather codes to moon phases (this is a simplification)
        # In a real application, you would get moon phase from a proper source
        moon_phases = {
            0: "new_moon",
            1: "waxing_crescent",
            2: "first_quarter",
            3: "waxing_gibbous",
            4: "full_moon",
            5: "waning_gibbous",
            6: "last_quarter", 
            7: "waning_crescent"
        }
        
        # Get current day of month and use it to approximate moon phase
        day_of_month = datetime.now().day
        moon_phase_index = (day_of_month % 28) // 4
        moon_phase = moon_phases.get(moon_phase_index, "waxing_gibbous")
        
        # Build our weather data structure
        weather_data = {
            "temperature": current.get("temperature_2m"),
            "humidity": current.get("relative_humidity_2m"),
            "precipitation": current.get("precipitation", 0),
            "cloud_cover": current.get("cloud_cover"),
            "weather_code": current.get("weather_code"),
            "precipitation_probability": daily.get("precipitation_probability_max", [0])[0] if daily.get("precipitation_probability_max") else 0,
            "moon_phase": moon_phase,
            "air_quality": 85  # Placeholder - Open-Meteo has air quality in a separate API
        }
        
        return weather_data
        
    def set_location(self, latitude: float, longitude: float) -> None:
        """
        Update the location coordinates
        
        Args:
            latitude (float): New latitude
            longitude (float): New longitude
        """
        self.latitude = latitude
        self.longitude = longitude

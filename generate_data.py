import json
import random
from datetime import datetime, timedelta
from db_connection import DatabaseConnection

def generate_random_float(min_val: float, max_val: float, decimals: int = 1) -> float:
    return round(random.uniform(min_val, max_val), decimals)

def generate_random_int(min_val: int, max_val: int) -> int:
    return random.randint(min_val, max_val)

def generate_plant_data() -> dict:
    locations = ["living_room", "bedroom", "kitchen", "balcony"]
    moon_phases = ["new_moon", "waxing_crescent", "first_quarter", "waxing_gibbous",
                  "full_moon", "waning_gibbous", "last_quarter", "waning_crescent"]
    
    data = {
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "environmental_data": {
            "location": random.choice(locations),
            "air": {
                "humidity": generate_random_float(40, 80),
                "temperature": generate_random_float(18, 28)
            },
            "soil": {
                "humidity": generate_random_float(60, 90)
            },
            "light": {
                "intensity": generate_random_int(4000, 6000),
                "duration": generate_random_float(4, 8)
            }
        },
        "external_factors": {
            "weather": {
                "temperature": generate_random_float(15, 30),
                "precipitation": generate_random_float(0, 10),
                "cloud_cover": generate_random_int(0, 100),
                "moon_phase": random.choice(moon_phases),
                "air_quality": generate_random_int(70, 95)
            },
            "market_indices": {
                "dow_jones": generate_random_int(35000, 38000),
                "nasdaq": generate_random_int(17000, 18000)
            },
            "news": [
                "Local elections scheduled next month",
                "New plant growth hormone identified",
                "Water conservation measures announced in region"
            ]
        }
    }
    
    return data

def main():
    try:
        # Initialize database connection
        db = DatabaseConnection()
        
        # Generate and insert data
        plant_data = generate_plant_data()
        inserted_id = db.insert_plant_data(plant_data)
        print(f"Successfully inserted plant data with ID: {inserted_id}")
        
        # Close database connection
        db.close()
        
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main() 
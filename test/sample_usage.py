from database.db_connection import DatabaseConnection

def main():
    # Initialize database connection
    db = DatabaseConnection()
    
    try:
        # Example plant data
        plant_data = {
            'humidity': {
                'air': 65.5,
                'soil': 72.3
            },
            'water_level': 85,
            'light': {
                'duration': 6.5,
                'intensity': 800
            },
            'soil_chemistry': {
                'ph': 6.8,
                'npk': {
                    'nitrogen': 45,
                    'phosphorus': 30,
                    'potassium': 25
                }
            },
            'temperature': 22.5
        }
        
        # Example weather data
        weather_data = {
            'temperature': 23.5,
            'precipitation': 0,
            'cloud_cover': 20,
            'air_quality': 'good',
            'moon_phase': 'waxing_crescent'
        }
        
        # Example news data
        news_data = {
            'category': 'scientific',
            'title': 'New Study Shows Plants Can Feel Pain',
            'summary': 'Recent research suggests plants may have a form of consciousness...',
            'source': 'Science Daily'
        }
        
        # Insert data
        plant_id = db.insert_plant_data(plant_data)
        weather_id = db.insert_weather_data(weather_data)
        news_id = db.insert_news_data(news_data)
        
        print(f"Inserted plant data with ID: {plant_id}")
        print(f"Inserted weather data with ID: {weather_id}")
        print(f"Inserted news data with ID: {news_id}")
        
        # Retrieve latest data
        latest_plant = db.get_latest_plant_data()
        latest_weather = db.get_latest_weather_data()
        latest_news = db.get_latest_news()
        
        print("\nLatest Plant Data:", latest_plant)
        print("\nLatest Weather Data:", latest_weather)
        print("\nLatest News:", latest_news)
        
    finally:
        db.close()

if __name__ == "__main__":
    main() 
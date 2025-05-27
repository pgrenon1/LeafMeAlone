import os
from datetime import datetime
from typing import Dict, Any, List
from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import ConnectionFailure
from pymongo.server_api import ServerApi

class DatabaseConnection:
    def __init__(self):
        load_dotenv()
        self.client = None
        self.db = None
        self.connect()

    def connect(self) -> None:
        try:
            # Get MongoDB connection string from environment variable
            mongo_uri = os.getenv('MONGODB_URI')
            if not mongo_uri:
                raise ValueError("MONGODB_URI environment variable not set")

            self.client = MongoClient(mongo_uri, server_api=ServerApi('1'))
            self.db = self.client.LeafMeAlone
            
            # Verify connection
            self.client.admin.command('ping')
            print("Successfully connected to MongoDB!")
            
        except ConnectionFailure as e:
            print(f"Failed to connect to MongoDB: {e}")
            raise

    def insert_plant_data(self, data: Dict[str, Any]) -> str:
        if self.db is None:
            raise ConnectionError("Database not connected")
            
        data['timestamp'] = datetime.utcnow()
        result = self.db.plant_data.insert_one(data)
        return str(result.inserted_id)

    def insert_weather_data(self, data: Dict[str, Any]) -> str:
        if self.db is None:
            raise ConnectionError("Database not connected")
            
        data['timestamp'] = datetime.utcnow()
        result = self.db.weather_data.insert_one(data)
        return str(result.inserted_id)

    def insert_news_data(self, data: Dict[str, Any]) -> str:
        if self.db is None:
            raise ConnectionError("Database not connected")
            
        data['timestamp'] = datetime.utcnow()
        result = self.db.news_data.insert_one(data)
        return str(result.inserted_id)

    def get_latest_plant_data(self) -> Dict[str, Any]:
        if self.db is None:
            raise ConnectionError("Database not connected")
            
        return self.db.plant_data.find_one(
            sort=[('timestamp', -1)]
        )

    def get_latest_weather_data(self) -> Dict[str, Any]:
        if self.db is None:
            raise ConnectionError("Database not connected")
            
        return self.db.weather_data.find_one(
            sort=[('timestamp', -1)]
        )

    def get_latest_news(self) -> List[Dict[str, Any]]:
        if self.db is None:
            raise ConnectionError("Database not connected")
            
        return list(self.db.news_data.find(
            sort=[('timestamp', -1)],
            limit=5
        ))

    def close(self) -> None:
        if self.client is not None:
            self.client.close() 
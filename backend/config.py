# config.py
import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'  # SQLite database
    SQLALCHEMY_TRACK_MODIFICATIONS = False            # Suppress warnings
    SECRET_KEY = os.environ.get('SECRET_KEY', 'secret-key')  # For secure sessions
    REDIS_URL = 'redis://localhost:6379/0'            # Redis connection

class CeleryConfig:
    broker_url = Config.REDIS_URL                     # Celery broker (Redis)
    result_backend = Config.REDIS_URL                 # Task results backend

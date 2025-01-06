# seed.py
from app import app  # Import the app instance
from models import db, Poll  # Import the database and models

# Seed the database with a test poll
with app.app_context():
    # Add a sample poll
    db.session.add(Poll(title="Favorite Programming Language", options=["Python", "JavaScript", "Java", "C++"]))
    db.session.commit()
    print("Database seeded!")

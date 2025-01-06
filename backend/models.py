# models.py
from flask_sqlalchemy import SQLAlchemy

# Initialize the SQLAlchemy object
db = SQLAlchemy()

# Poll model
class Poll(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    options = db.Column(db.JSON, nullable=False)  # Store options as a JSON object
    created_at = db.Column(db.DateTime, default=db.func.now())

# Vote model
class Vote(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    poll_id = db.Column(db.Integer, db.ForeignKey('poll.id'), nullable=False)
    user_id = db.Column(db.String(100), nullable=False)
    choice = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.now())

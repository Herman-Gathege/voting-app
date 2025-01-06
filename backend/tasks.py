# tasks.py
from celery import Celery
from config import CeleryConfig

celery = Celery('tasks')
celery.config_from_object(CeleryConfig)

@celery.task
def send_email_task(user_id, poll_id):
    # Simulate sending an email
    print(f"Sending confirmation email to User {user_id} for Poll {poll_id}")
    return f"Email sent to User {user_id} for Poll {poll_id}"

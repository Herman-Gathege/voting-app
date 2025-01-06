from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Poll, Vote
from config import Config
from tasks import send_email_task

app = Flask(__name__)
app.config.from_object(Config)

# Enable CORS for frontend access
CORS(app)

# Initialize the database
db.init_app(app)

# Route to create a new poll
@app.route('/polls', methods=['POST'])
def create_poll():
    data = request.json

    # Validate input data
    if not data or not data.get('title') or not data.get('options'):
        return jsonify({"error": "Title and options are required"}), 400

    if not isinstance(data['options'], list) or len(data['options']) < 2:
        return jsonify({"error": "Options must be a list with at least two items"}), 400

    # Create and save new poll
    new_poll = Poll(title=data['title'], options=data['options'])
    db.session.add(new_poll)
    db.session.commit()

    return jsonify({"message": "Poll created", "poll": {"id": new_poll.id, "title": new_poll.title, "options": new_poll.options}}), 201

# Route to vote in a poll
@app.route('/polls/<int:poll_id>/vote', methods=['POST'])
def vote(poll_id):
    data = request.json

    # Validate input data
    if not data or not data.get('user_id') or not data.get('choice'):
        return jsonify({"error": "User ID and choice are required"}), 400

    # Check if the poll exists
    poll = Poll.query.get(poll_id)
    if not poll:
        return jsonify({"error": "Poll not found"}), 404

    # Middleware equivalent: Prevent duplicate voting
    existing_vote = Vote.query.filter_by(user_id=data['user_id'], poll_id=poll_id).first()
    if existing_vote:
        return jsonify({"error": "You have already voted"}), 400

    # Validate the choice
    if data['choice'] not in poll.options:
        return jsonify({"error": f"Invalid choice. Valid options are: {poll.options}"}), 400

    # Register the vote
    new_vote = Vote(poll_id=poll_id, user_id=data['user_id'], choice=data['choice'])
    db.session.add(new_vote)
    db.session.commit()

    # Trigger email notification in the background
    send_email_task.delay(data['user_id'], poll_id)

    return jsonify({"message": "Vote recorded"}), 201

# Route to get poll results
@app.route('/polls/<int:poll_id>/results', methods=['GET'])
def poll_results(poll_id):
    # Check if the poll exists
    poll = Poll.query.get(poll_id)
    if not poll:
        return jsonify({"error": "Poll not found"}), 404

    # Calculate results
    results = db.session.query(Vote.choice, db.func.count(Vote.choice)).filter_by(poll_id=poll_id).group_by(Vote.choice).all()

    # Convert results to a dictionary
    results_dict = {choice: count for choice, count in results}

    return jsonify({"poll_id": poll_id, "results": results_dict}), 200

if __name__ == '__main__':
    # Create tables if they don't exist
    with app.app_context():
        db.create_all()

    app.run(debug=True)

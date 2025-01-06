Polls Application
A simple web app that allows users to create polls, add options to the polls, vote on polls, and view results. The app is built with React for the frontend and Flask for the backend.

Table of Contents
Features
Technologies Used
Installation
Frontend Setup
Backend Setup
API Endpoints
Usage
Contributing
License
Features
Create Polls: Users can create a new poll by providing a title and multiple options.
Vote on Polls: Users can vote on existing polls by selecting one of the available options.
View Results: Users can view real-time poll results after voting.
Dynamic Poll Options: Poll creators can add or remove poll options dynamically.
Frontend with React: A responsive UI to create and manage polls.
Backend with Flask: Handles poll creation, voting, and result fetching.
Technologies Used
Frontend:
React.js: A JavaScript library for building user interfaces.
Bootstrap: For styling and responsive design.
Axios: For making HTTP requests to the backend API.
Backend:
Flask: A Python web framework used to create the backend API.
SQLAlchemy: An ORM (Object Relational Mapper) used for database interactions.
SQLite: A lightweight relational database to store polls, options, and votes.
Development Tools:
Node.js: For running the React app.
Python: For running the Flask API server.
Installation
Prerequisites
Ensure you have the following installed:

Node.js
Python 3
pip
Step 1: Clone the Repository
bash
Copy code
git clone https://github.com/your-username/polls-app.git
cd polls-app
Step 2: Setup Backend
Navigate to the backend directory:
bash
Copy code
cd backend
Create a virtual environment:
bash
Copy code
python3 -m venv venv
Activate the virtual environment:

On Windows:
bash
Copy code
venv\Scripts\activate
On macOS/Linux:
bash
Copy code
source venv/bin/activate
Install required Python packages:

bash
Copy code
pip install -r requirements.txt
Run the Flask backend:
bash
Copy code
flask run
The backend will start running on http://127.0.0.1:5000/.

Step 3: Setup Frontend
Navigate to the frontend directory:
bash
Copy code
cd ../frontend
Install required npm packages:
bash
Copy code
npm install
Start the React development server:
bash
Copy code
npm start
The frontend will start running on http://localhost:3000/.

Backend Setup
The backend is built with Flask and exposes the following endpoints for CRUD operations:

API Endpoints
GET /polls
Fetch all polls.

Response:

json
Copy code
[
  {
    "id": 1,
    "title": "Favorite Color",
    "options": ["Red", "Blue", "Green"]
  },
  ...
]
POST /polls
Create a new poll.

Request Body:

json
Copy code
{
  "title": "Poll Title",
  "options": ["Option 1", "Option 2"]
}
Response:

json
Copy code
{
  "id": 1,
  "title": "Poll Title",
  "options": ["Option 1", "Option 2"]
}
POST /polls/{pollId}/vote
Vote on a poll.

Request Body:

json
Copy code
{
  "user_id": 1,
  "choice": "Option 1"
}
Response:

json
Copy code
{
  "message": "Vote recorded!"
}
GET /polls/{pollId}/results
Fetch the results of a poll.

Response:

json
Copy code
{
  "Option 1": 10,
  "Option 2": 5
}
Usage
Once both the backend and frontend are running:

Create Polls: On the "Create Poll" page, enter a title and options. Click "Add Option" to add more options. Then click "Create Poll" to create a poll.
Vote on Polls: On the "Polls" page, browse available polls and select one option to vote. Click the poll option to cast your vote.
View Results: Click "View Results" to see the number of votes for each option.
Contributing
We welcome contributions! If you'd like to contribute, please follow these steps:

Fork the repository.
Create a new branch for your changes.
Make your changes.
Submit a pull request describing your changes.
License
This project is licensed under the MIT License - see the LICENSE file for details.


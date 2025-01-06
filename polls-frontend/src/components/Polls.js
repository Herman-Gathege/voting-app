import React, { useState, useEffect } from "react";
import axios from "axios";

function Polls() {
  const [polls, setPolls] = useState([]);
  const [newPoll, setNewPoll] = useState({ title: "", options: ["", ""] });
  const [vote, setVote] = useState({ pollId: "", choice: "" });
  const [results, setResults] = useState({}); // To hold the results of each poll

  // Fetch all polls when the component mounts
  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/polls")
      .then((response) => {
        setPolls(response.data);
      })
      .catch((error) => {
        console.error("Error fetching polls:", error);
      });
  }, []);

  // Handle the creation of a new poll
  const handlePollSubmit = () => {
    if (
      newPoll.title.trim() === "" ||
      newPoll.options.some((option) => option.trim() === "")
    ) {
      alert("Poll title and options are required.");
      return;
    }

    // Send the poll data to the backend
    axios
      .post("http://127.0.0.1:5000/polls", newPoll)
      .then((response) => {
        setPolls([...polls, response.data.poll]);
        setNewPoll({ title: "", options: ["", ""] });
      })
      .catch((error) => {
        console.error("Error creating poll:", error);
      });
  };

  // Handle voting
  const handleVoteSubmit = (pollId) => {
    if (vote.choice.trim() === "") {
      alert("Please select an option to vote.");
      return;
    }

    const payload = { user_id: 1, choice: vote.choice };
    axios
      .post(`http://127.0.0.1:5000/polls/${pollId}/vote`, payload)
      .then((response) => {
        alert("Vote recorded!");
        setVote({ pollId: "", choice: "" });
        fetchPollResults(pollId); // Fetch updated results after voting
      })
      .catch((error) => {
        console.error("Error voting:", error);
      });
  };

  // Fetch poll results from the backend
  const fetchPollResults = (pollId) => {
    axios
      .get(`http://127.0.0.1:5000/polls/${pollId}/results`)
      .then((response) => {
        console.log(response.data); // Check the fetched data structure
        setResults((prevResults) => ({
          ...prevResults,
          [pollId]: response.data,
        }));
      })
      .catch((error) => {
        console.error("Error fetching results:", error);
      });
  };

  // Handle adding new options dynamically
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newPoll.options];
    updatedOptions[index] = value;
    setNewPoll({ ...newPoll, options: updatedOptions });
  };

  const handleAddOption = () => {
    setNewPoll({ ...newPoll, options: [...newPoll.options, ""] });
  };

  const handleRemoveOption = (index) => {
    if (newPoll.options.length > 2) {
      const updatedOptions = newPoll.options.filter((_, i) => i !== index);
      setNewPoll({ ...newPoll, options: updatedOptions });
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4">Create Poll</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Poll Title"
          value={newPoll.title}
          onChange={(e) => setNewPoll({ ...newPoll, title: e.target.value })}
        />
      </div>

      <h3>Poll Options</h3>
      {newPoll.options.map((option, index) => (
        <div className="input-group mb-2" key={index}>
          <input
            type="text"
            className="form-control"
            placeholder={`Option ${index + 1}`}
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
          <button
            className="btn btn-danger"
            onClick={() => handleRemoveOption(index)}
          >
            Remove
          </button>
        </div>
      ))}
      <div className="d-flex justify-content-between mb-3">
        <button className="btn btn-primary" onClick={handleAddOption}>
          Add Option
        </button>
        <button className="btn btn-success" onClick={handlePollSubmit}>
          Create Poll
        </button>
      </div>

      <h2 className="mt-5">Polls</h2>
      {polls.map((poll) => (
        <div key={poll.id} className="card mb-3">
          <div className="card-body">
            <h3 className="card-title">{poll.title}</h3>
            <div className="d-flex flex-column">
              {poll.options.map((option, index) => (
                <button
                  key={index}
                  className="btn btn-outline-primary mb-2"
                  onClick={() => {
                    setVote({ ...vote, pollId: poll.id, choice: option });
                    handleVoteSubmit(poll.id);
                  }}
                >
                  {option}
                </button>
              ))}
              <button
                className="btn btn-info mt-2"
                onClick={() => fetchPollResults(poll.id)}
              >
                View Results
              </button>
              {results[poll.id] && (
                <div className="mt-3">
                  <h4>Results</h4>
                  <ul>
                    {Object.entries(results[poll.id]).map(([choice, count]) => (
                      <li key={choice}>
                        {choice}:{" "}
                        {typeof count === "object" ? JSON.stringify(count) : count}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Polls;

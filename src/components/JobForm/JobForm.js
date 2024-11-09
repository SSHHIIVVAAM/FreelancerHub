// src/components/JobForm.js
import React, { useState } from "react";
import "./JobForm.css"; // Import CSS for styling

const JobForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [durationInDays, setDurationInDays] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recruiterId = localStorage.getItem("recruiterId"); // Get recruiterId from local storage

    const proposalData = {
      recruiterId,
      title,
      description,
      category,
      budget: parseFloat(budget), // Ensure budget is a number
      skillsRequired,
      durationInDays: parseInt(durationInDays), // Ensure duration is an integer
    };

    try {
      const response = await fetch("http://localhost:5022/api/Recruiter/AddProposal", {
        method: "POST",
        headers: {
          "Accept": "text/plain",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposalData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message); // Successfully added proposal
        onClose(); // Close the form after successful submission
      } else {
        console.error("Error adding proposal:", data.message); // Log error message
      }
    } catch (error) {
      console.error("Error:", error); // Catch any network errors
    }
  };

  return (
    <div className="job-form-overlay">
      <div className="job-form-container">
        <h2>Add Job</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Budget:</label>
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Skills Required (comma separated):</label>
            <input
              type="text"
              value={skillsRequired}
              onChange={(e) => setSkillsRequired(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Duration in Days:</label>
            <input
              type="number"
              value={durationInDays}
              onChange={(e) => setDurationInDays(e.target.value)}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">Submit</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JobForm;

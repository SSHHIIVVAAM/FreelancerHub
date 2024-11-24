import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./JobForm.css"

const JobForm = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [budget, setBudget] = useState("");
  const [skillsRequired, setSkillsRequired] = useState("");
  const [durationInDays, setDurationInDays] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const recruiterId = localStorage.getItem("recruiterId");

    const proposalData = {
      recruiterId,
      title,
      description,
      category,
      budget: parseFloat(budget),
      skillsRequired,
      durationInDays: parseInt(durationInDays),
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
        console.log(data.message);
        onClose();
      } else {
        console.error("Error adding proposal:", data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div
      className="modal fade show d-block "
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered ">
        <div className="modal-content mainDiv">
          <div className="modal-header">
            <h5 className="modal-title addMain">Add Job</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Job Title
                </label>
                <input
                  type="text"
                  id="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  id="description"
                  className="form-control"
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="category" className="form-label">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="budget" className="form-label">
                  Budget
                </label>
                <input
                  type="number"
                  id="budget"
                  className="form-control"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="skillsRequired" className="form-label">
                  Skills Required (comma separated)
                </label>
                <input
                  type="text"
                  id="skillsRequired"
                  className="form-control"
                  value={skillsRequired}
                  onChange={(e) => setSkillsRequired(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="durationInDays" className="form-label">
                  Duration in Days
                </label>
                <input
                  type="number"
                  id="durationInDays"
                  className="form-control"
                  value={durationInDays}
                  onChange={(e) => setDurationInDays(e.target.value)}
                  required
                />
              </div>
              <div className="d-flex justify-content-between btnJob">
                <button type="submit" className="btn btn-success submitJob">
                  Submit
                </button>
                <button type="button" className="btn btn-danger cancelJob" onClick={onClose}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobForm;

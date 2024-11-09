// src/components/BrowseJobsPage.js
import React, { useEffect, useState } from "react";
import "./BrowseJob.css";

const BrowseJobsPage = () => {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const recruiterId = localStorage.getItem("recruiterId"); // Get recruiterId from local storage

  useEffect(() => {
    if (!recruiterId) {
      setError("Recruiter ID not found. Please log in.");
      setIsLoading(false);
      return;
    }

    fetch(
      `http://localhost:5022/api/Recruiter/GetAllMyProposals?pageIndex=1&pageSize=10&recruiterid=${recruiterId}&status=1`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setProposals(data.data.result);
        } else {
          setError(data.message || "Failed to fetch proposals.");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        setError("Error fetching job proposals.");
        setIsLoading(false);
      });
  }, [recruiterId]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="browse-jobs-page">
      <h1>Browse Jobs</h1>
      {proposals.length === 0 ? (
        <p>No job proposals available.</p>
      ) : (
        <div className="job-list">
          {proposals.map((proposal, index) => (
            <div key={index} className="job-card">
              <h2>{proposal.jobTitle}</h2>
              <p>
                <strong>Description:</strong> {proposal.jobDescription}
              </p>
              <p>
                <strong>Salary:</strong> {proposal.salary}
              </p>
              <p>
                <strong>Posted on:</strong>{" "}
                {new Date(proposal.createdAt).toLocaleDateString()}
              </p>
              <button className="apply-button">Update</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseJobsPage;

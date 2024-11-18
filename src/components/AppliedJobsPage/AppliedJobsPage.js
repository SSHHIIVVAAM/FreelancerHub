import React, { useEffect, useState } from "react";
import "./AppliedJobsPage.css";

const AppliedJobsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    jobSkill: "",
    jobTitle: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const freelancerId = localStorage.getItem("freelancerId"); // Retrieve freelancer ID from localStorage

  const fetchApplications = async () => {
    if (!freelancerId) {
      setMessage("Error: Freelancer ID not found in local storage.");
      return;
    }

    setLoading(true);
    try {
      const query = `pageIndex=1&pageSize=10&freelancerId=${freelancerId}&jobSkill=${filters.jobSkill}&jobTitle=${filters.jobTitle}`;
      const response = await fetch(`http://localhost:5022/api/Freelancer/GetMyAllApplications?${query}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();

      console.log(result);  // Log the full response to check the structure

      if (result.statusCode === 200) {
        setApplications(result.data.result);  // Correctly access 'result' from 'data'
      } else {
        console.error("Error fetching applications:", result.message);
        setApplications([]);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    fetchApplications(); // Fetch applications with the new filters
  };

  const clearFilters = () => {
    setFilters({ jobSkill: "", jobTitle: "" });
    fetchApplications(); // Fetch applications without filters
  };

  const deleteApplication = async (applicationId) => {
    try {
      const response = await fetch(`http://localhost:5022/api/Freelancer/DeleteMyApplication?applicationId=${applicationId}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();

      if (result.statusCode === 200) {
        setMessage("Application Deleted Successfully");
        fetchApplications(); // Refresh the list after deletion
      } else {
        setMessage("Error deleting application");
      }
    } catch (error) {
      console.error("Error deleting application:", error);
      setMessage("Error deleting application");
    }
  };

  // Only fetch applications when the filters change
  useEffect(() => {
    fetchApplications();
  }, [filters]); // Add filters as dependency

  return (
    <div className="applied-jobs-page">
      <nav className="navbar66">
        <span className="navbar-title66">My Applications</span>
        <div className="navbar-buttons66">
          <button className="logout-btn66">Logout</button>
        </div>
      </nav>

      {/* Filter Section */}
      <div className="filter-container66">
        <input
          type="text"
          name="jobTitle"
          placeholder="Filter by Job Title"
          value={filters.jobTitle}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="jobSkill"
          placeholder="Filter by Job Skill"
          value={filters.jobSkill}
          onChange={handleFilterChange}
        />
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={clearFilters}>Clear Filters</button>
      </div>

      {/* Notification */}
      {message && <p className="notification">{message}</p>}

      {/* Application List */}
      {loading ? (
        <p>Loading applications...</p>
      ) : (
        <div className="applications-list">
          {applications.length > 0 ? (
            applications.map((application) => (
              <div key={application.applicationId} className="application-card">
                <h3>{application.proposalTitle}</h3>
                <p>{application.proposalSkills}</p>
                <p>{application.proposalCategory}</p>
                <p>{application.proposalDescription}</p>
                <button onClick={() => deleteApplication(application.applicationId)} className="delete-btn">
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No applications found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppliedJobsPage;

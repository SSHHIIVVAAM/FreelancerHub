import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./AppliedJobsPage.css";

const AppliedJobsPage = () => {
  const [applications, setApplications] = useState([]);
  const [filters, setFilters] = useState({
    jobSkill: "",
    jobTitle: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const freelancerId = localStorage.getItem("freelancerId");

  const fetchApplications = async () => {
    if (!freelancerId) {
      setMessage("Error: Freelancer ID not found in local storage.");
      return;
    }

    setLoading(true);
    try {
      const query = `pageIndex=1&pageSize=10&freelancerId=${freelancerId}&jobSkill=${filters.jobSkill}&jobTitle=${filters.jobTitle}`;
      const response = await fetch(
        `http://localhost:5022/api/Freelancer/GetMyAllApplications?${query}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();

      if (result.statusCode === 200) {
        setApplications(result.data.result);
      } else {
        setApplications([]);
      }
    } catch (error) {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    fetchApplications();
  };

  const clearFilters = () => {
    setFilters({ jobSkill: "", jobTitle: "" });
    fetchApplications();
  };

  const deleteApplication = async (applicationId) => {
    try {
      const response = await fetch(
        `http://localhost:5022/api/Freelancer/DeleteMyApplication?applicationId=${applicationId}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
          },
        }
      );
      const result = await response.json();

      if (result.statusCode === 200) {
        setMessage("Application Deleted Successfully");
        fetchApplications();
      } else {
        setMessage("Error deleting application");
      }
    } catch (error) {
      setMessage("Error deleting application");
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [filters]);

  return (
    <div className="container mt-4 appJobPage">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 p-3 shadow rounded">
        <span className="navbar-brand h1">My Applications</span>
        <div className="d-flex gap-3 ms-auto">
          <input
            type="text"
            className="form-control"
            name="jobTitle"
            placeholder="Filter by Job Title"
            value={filters.jobTitle}
            onChange={handleFilterChange}
          />
          <input
            type="text"
            className="form-control"
            name="jobSkill"
            placeholder="Filter by Job Skill"
            value={filters.jobSkill}
            onChange={handleFilterChange}
          />
        </div>
      </nav>

      {/* Notification */}
      {message && <div className="alert alert-info">{message}</div>}

      {/* Application List */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {applications.length > 0 ? (
            applications.map((application) => (
              <div key={application.applicationId} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100 shadow-sm getjobCard">
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{application.proposalTitle}</h5>
                    <p className="card-text">
                      <strong>Skills:</strong> {application.proposalSkills}
                    </p>
                    <p className="card-text">
                      <strong>Category:</strong> {application.proposalCategory}
                    </p>
                    <p className="card-text">
                      <strong>Description:</strong> {application.proposalDescription}
                    </p>
                    <button
                      className="btn btn-danger mt-auto"
                      onClick={() => deleteApplication(application.applicationId)}
                    >
                      Delete Application
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No applications found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppliedJobsPage;

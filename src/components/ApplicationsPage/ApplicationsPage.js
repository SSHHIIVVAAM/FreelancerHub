import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ApplicationsPage.css";

const ApplicationsPage = () => {
  const { proposalId } = useParams(); // Get proposalId from URL
  const recruiterId = localStorage.getItem("recruiterId"); // Get recruiterId from localStorage
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [skillsFilter, setSkillsFilter] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // Fetch applications from API
  const fetchApplications = () => {
    setIsLoading(true);
    setError(null);

    const apiUrl = new URL(
      "http://localhost:5022/api/Recruiter/GetAllApplications"
    );
    apiUrl.searchParams.append("pageIndex", 1);
    apiUrl.searchParams.append("pageSize", 10);
    apiUrl.searchParams.append("proposalId", proposalId);
    apiUrl.searchParams.append("recruiterId", recruiterId);

    if (statusFilter) {
      apiUrl.searchParams.append("status", statusFilter);
    }
    if (skillsFilter) {
      apiUrl.searchParams.append("skills", skillsFilter);
    }
    if (roleFilter) {
      apiUrl.searchParams.append("role", roleFilter);
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setApplications(data.data.result);
        } else {
          setError(data.message || "Failed to fetch applications.");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching applications.");
        setIsLoading(false);
      });
  };

  // Re-fetch data whenever filters change
  useEffect(() => {
    if (proposalId && recruiterId) {
      fetchApplications();
    } else {
      setError("Proposal ID or Recruiter ID missing.");
      setIsLoading(false);
    }
  }, [proposalId, recruiterId, statusFilter, skillsFilter, roleFilter]);

  // Handle Status Update
  const handleStatusChange = (applicationId, newStatus) => {
    const apiUrl = `http://localhost:5022/api/Recruiter/UpdateApplicationStatus?applicationId=${applicationId}&status=${newStatus}`;

    fetch(apiUrl, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setMessage(data.message || "Status updated successfully.");
          fetchApplications(); // Re-fetch data after status change
        } else {
          setError(data.message || "Failed to update status.");
        }
      })
      .catch(() => {
        setError("Error updating status.");
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p className="alert alert-danger">{error}</p>;

  return (
    <div className="container p-4 mt-5 appback">
      <h1 className="text-center text-dark mb-4">Applications for Proposal</h1>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label>Status</label>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="1">Applied</option>
            <option value="2">Rejected</option>
            <option value="3">Selected</option>
          </select>
        </div>
        <div className="col-md-4">
          <label>Skills</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by skills"
            value={skillsFilter}
            onChange={(e) => setSkillsFilter(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label>Role</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by role"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          />
        </div>
      </div>

      {message && <p className="alert alert-success">{message}</p>}
      {applications.length === 0 ? (
        <p className="text-center text-muted">
          No applications found for this proposal.
        </p>
      ) : (
        <div className="row">
          {applications.map((application) => (
            <div
              key={application.applicationId}
              className="col-md-6 col-lg-4 mb-4"
            >
              <div className="card shadow-sm">
                <img
                  src={application.freelancerProfilePicUrl}
                  alt="Freelancer"
                  className="card-img-top rounded-circle mx-auto mt-3"
                  style={{
                    objectFit: "cover",
                    height: "150px",
                    width: "150px",
                  }}
                />

                <div className="card-body">
                  <h5 className="card-title">{application.freelancerName}</h5>
                  <p className="card-text">
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${application.freelancerEmail}`}>
                      {application.freelancerEmail}
                    </a>
                  </p>
                  <p className="card-text">
                    <strong>Phone:</strong>{" "}
                    <a href={`tel:${application.freelancerPhoneNumber}`}>
                      {application.freelancerPhoneNumber}
                    </a>
                  </p>
                  <p className="card-text">
                    <strong>Skills:</strong> {application.freelancerSkills}
                  </p>
                  <p className="card-text">
                    <strong>Role:</strong> {application.freelancerRole}
                  </p>
                  <p className="card-text">
                    <strong>Message:</strong> {application.message}
                  </p>
                  <p className="card-text">
                    <strong>Status:</strong>
                    <select
                      className="form-select"
                      value={application.status}
                      onChange={(e) =>
                        handleStatusChange(
                          application.applicationId,
                          e.target.value
                        )
                      }
                    >
                      <option value="1">Applied</option>
                      <option value="2">Rejected</option>
                      <option value="3">Selected</option>
                    </select>
                  </p>
                  <p className="card-text">
                    <strong>Applied At:</strong>{" "}
                    {new Date(application.appliedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;

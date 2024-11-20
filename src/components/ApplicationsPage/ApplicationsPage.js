import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ApplicationsPage.css"; // Import CSS file

const ApplicationsPage = () => {
  const { proposalId } = useParams(); // Get proposalId from URL
  const recruiterId = localStorage.getItem("recruiterId"); // Get recruiterId from localStorage
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Fetch applications data from API
    const fetchApplications = () => {
      setIsLoading(true);
      setError(null);

      const apiUrl = `http://localhost:5022/api/Recruiter/GetAllApplications?pageIndex=1&pageSize=10&proposalId=${proposalId}&recruiterId=${recruiterId}`;

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

    if (proposalId && recruiterId) {
      fetchApplications();
    } else {
      setError("Proposal ID or Recruiter ID missing.");
      setIsLoading(false);
    }
  }, [proposalId, recruiterId]);

  const handleStatusChange = (applicationId, newStatus) => {
    const apiUrl = `http://localhost:5022/api/Recruiter/UpdateApplicationStatus?applicationId=${applicationId}&status=${newStatus}`;

    fetch(apiUrl, { method: "POST" })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setMessage(data.message || "Status updated successfully.");
          setApplications((prev) =>
            prev.map((app) =>
              app.applicationId === applicationId
                ? { ...app, status: newStatus }
                : app
            )
          );
        } else {
          setError(data.message || "Failed to update status.");
        }
      })
      .catch(() => {
        setError("Error updating status.");
      });
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Applications for Proposal</h1>
      {message && <p className="alert alert-success">{message}</p>}
      {applications.length === 0 ? (
        <p>No applications found for this proposal.</p>
      ) : (
        <ul className="list-group">
          {applications.map((application) => (
            <li key={application.applicationId} className="list-group-item">
              <div className="card">
                <img
                  src={application.freelancerProfilePicUrl}
                  alt="Freelancer"
                  className="profile-pic"
                />
                <div className="card-body">
                  <p>
                    <strong>Name:</strong> {application.freelancerName}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    <a href={`mailto:${application.freelancerEmail}`}>
                      {application.freelancerEmail}
                    </a>
                  </p>
                  <p>
                    <strong>Phone:</strong>{" "}
                    <a href={`tel:${application.freelancerPhoneNumber}`}>
                      {application.freelancerPhoneNumber}
                    </a>
                  </p>
                  <p>
                    <strong>Skills:</strong> {application.freelancerSkills}
                  </p>
                  <p>
                    <strong>Role:</strong> {application.freelancerRole}
                  </p>
                  <p>
                    <strong>Message:</strong> {application.message}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <select
                      className="form-select"
                      value={application.status}
                      onChange={(e) =>
                        handleStatusChange(application.applicationId, e.target.value)
                      }
                    >
                      <option value="1">Applied</option>
                      <option value="2">Rejected</option>
                      <option value="3">Selected</option>
                    </select>
                  </p>
                  <p>
                    <strong>Applied At:</strong>{" "}
                    {new Date(application.appliedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ApplicationsPage;

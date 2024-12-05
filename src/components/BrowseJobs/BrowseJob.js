import React, { useState, useEffect, useCallback } from "react";
import "./BrowseJob.css";
import { useNavigate } from "react-router-dom";

const BrowseJobsPage = () => {
  const [proposals, setProposals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState(""); // Filter for status
  const [titleFilter, setTitleFilter] = useState(""); // Filter for title
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages from API
  const recruiterId = localStorage.getItem("recruiterId");
  const navigate = useNavigate();

  const handleApplicationsClick = (proposalId) => {
    navigate(`/applications/${proposalId}`); // Navigate to applications page with proposalId
  };

  const fetchProposals = useCallback(() => {
    setIsLoading(true);
    setError(null);

    let apiUrl = `http://localhost:5022/api/Recruiter/GetAllMyProposals?pageIndex=${currentPage}&pageSize=6&recruiterid=${recruiterId}`;

    if (statusFilter) apiUrl += `&status=${statusFilter}`;
    if (titleFilter) apiUrl += `&jobTitle=${titleFilter}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setProposals(data.data.result);
          setTotalPages(data.data.totalPages);
        } else {
          setError(data.message || "Failed to fetch proposals.");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching job proposals.");
        setIsLoading(false);
      });
  }, [recruiterId, statusFilter, titleFilter, currentPage]);

  useEffect(() => {
    if (!recruiterId) {
      setError("Recruiter ID not found. Please log in.");
      setIsLoading(false);
      return;
    }
    fetchProposals();
  }, [recruiterId, currentPage]);

  const handleSearch = () => {
    fetchProposals();
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) return <p className="text-center text-danger">{error}</p>;

  return (
    <div className="background-image">
      <div className="container">
        <h1 className="browse-title text-black text-start">
          My Jobs Proposals
        </h1>

        {/* Filter Section */}
        <div className="row filter-container align-items-center p-3">
          <div className="col-md-5 mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={titleFilter}
              onChange={(e) => setTitleFilter(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="1">Open</option>
              <option value="2">Closed</option>
              <option value="3">Awarded</option>
            </select>
          </div>
          <div className="col-md-3 mb-2">
            <button className="btn btn-primary w-100" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>

        {/* Proposal Listings */}
        <div className="row mt-4">
          {proposals.length === 0 ? (
            <p className="text-white text-center">
              No job proposals available.
            </p>
          ) : (
            proposals.map((proposal, index) => (
              <div key={index} className="col-md-6 mb-4">
                <div className="shadow-sm custom-card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img
                          src={require("../../assets/Common/application.png")}
                          alt="Job"
                          className="img-fluid"
                          style={{ maxHeight: "210px", objectFit: "cover" }}
                        />
                      </div>
                      <div className="col-md-8">
                        <p className="card-text">
                          <strong>Job Title:</strong> {proposal.title} <br/>
                          <strong>Category:</strong> {proposal.category} <br/>
                          <strong>Budget:</strong> {proposal.budget} <br/>
                          <strong>Skills:</strong> {proposal.skillsRequired} <br/>
                          <strong>Duration:</strong> {proposal.durationInDays} <br/>
                          <strong>Description:</strong> {proposal.description}
                        </p>
                        {/* Add more fields */}
                        <div className="d-flex">
                          <button
                            className="btn btn-primary custom-button"
                            onClick={() =>
                              handleApplicationsClick(proposal.proposalId)
                            }
                          >
                            Applications
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Pagination Controls */}
        <nav aria-label="Page navigation example" className="mt-4">
          <ul className="pagination justify-content-end">
            {[...Array(totalPages)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                <button
                  className={`page-link ${
                    currentPage === index + 1
                      ? "bg-primary text-white pe-3"
                      : "bg-white text-dark pe-3"
                  }`}
                  onClick={() => handlePageChange(index + 1)}
                  aria-label={`Page ${index + 1}`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BrowseJobsPage;

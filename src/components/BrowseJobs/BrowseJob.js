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

  const handleApplicationsClick = (proposalId) => {
    navigate(`/applications/${proposalId}`);
  };

  const handleEditClick = (index) => {
    const updatedProposals = [...proposals];
    updatedProposals[index].isEditing = true;
    setProposals(updatedProposals);
  };

  const handleCancelEdit = (index) => {
    const updatedProposals = [...proposals];
    updatedProposals[index].isEditing = false;
    setProposals(updatedProposals);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedProposals = [...proposals];
    updatedProposals[index][name] = value;
    setProposals(updatedProposals);
  };

  const handleSaveChanges = (index) => {
    const updatedProposal = proposals[index];

    const updateData = {
      proposalId: updatedProposal.proposalId,
      recruiterId: recruiterId,
      title: updatedProposal.title,
      description: updatedProposal.description,
      category: updatedProposal.category,
      budget: updatedProposal.budget,
      skillsRequired: updatedProposal.skillsRequired,
      durationInDays: updatedProposal.durationInDays,
    };

    fetch("http://localhost:5022/api/Recruiter/AddProposal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          alert("Proposal updated successfully!");
          const updatedProposals = [...proposals];
          updatedProposals[index].isEditing = false;
          setProposals(updatedProposals);
        } else {
          alert("Failed to update proposal.");
        }
      })
      .catch((error) => {
        alert("Error updating proposal: " + error);
      });
  };

  const handleDeleteClick = (proposalId) => {
    fetch(
      `http://localhost:5022/api/Recruiter/DeleteProposal?proposalId=${proposalId}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          alert("Proposal deleted successfully!");
          setProposals((prevProposals) =>
            prevProposals.filter(
              (proposal) => proposal.proposalId !== proposalId
            )
          );
        } else {
          alert("Failed to delete proposal.");
        }
      })
      .catch((error) => {
        alert("Error deleting proposal: " + error);
      });
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

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
                        {proposal.isEditing ? (
                          <div>
                            <label>Title</label>
                            <input
                              type="text"
                              name="title"
                              value={proposal.title}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                             <label>Category</label>
                            <input
                              type="text"
                              name="category"
                              value={proposal.category}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                             <label>Budget</label>
                            <input
                              type="text"
                              name="budget"
                              value={proposal.budget}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                             <label>Skills</label>
                            <input
                              type="text"
                              name="skillsRequired"
                              value={proposal.skillsRequired}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                             <label>Duration</label>
                            <input
                              type="text"
                              name="durationInDays"
                              value={proposal.durationInDays}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                             <label>Description</label>
                            <textarea
                              name="description"
                              value={proposal.description}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                            <button
                              className="btn btn-primary me-2 savebtn"
                              onClick={() => handleSaveChanges(index)}
                            >
                              Save
                            </button>
                            <button
                              className="btn btn-secondary cancelbtn"
                              onClick={() => handleCancelEdit(index)}
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div>
                            <p>
                              <strong>Title:</strong> {proposal.title} <br />
                            </p>
                            <p>
                              <strong>Category:</strong> {proposal.category}
                            </p>
                            <p>
                              <strong>Budget:</strong> {proposal.budget}
                            </p>
                            <p>
                              <strong>Skills:</strong> {proposal.skillsRequired}
                            </p>
                            <p>
                              <strong>Duration:</strong>{" "}
                              {proposal.durationInDays}
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {proposal.description}
                            </p>
                            <div className="d-flex justify-content-between">
                              <button
                                className="btn btn-primary me-2"
                                onClick={() =>
                                  handleApplicationsClick(proposal.proposalId)
                                }
                              >
                                Applications
                              </button>
                              <button
                                className="btn btn-warning me-2"
                                onClick={() => handleEditClick(index)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger"
                                onClick={() =>
                                  handleDeleteClick(proposal.proposalId)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
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
          <ul className="pagination justify-content-center">
            <li
              className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              <button className="page-link">Previous</button>
            </li>
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`page-item ${
                  currentPage === index + 1 ? "active" : ""
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                <button className="page-link">{index + 1}</button>
              </li>
            ))}
            <li
              className={`page-item ${
                currentPage === totalPages ? "disabled" : ""
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default BrowseJobsPage;

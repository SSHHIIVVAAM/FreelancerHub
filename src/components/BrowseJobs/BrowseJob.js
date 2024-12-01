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

  // This function is responsible for the API call
  const fetchProposals = useCallback(() => {
    setIsLoading(true);
    setError(null);

    let apiUrl = `http://localhost:5022/api/Recruiter/GetAllMyProposals?pageIndex=${currentPage}&pageSize=4&recruiterid=${recruiterId}`;

    // Add filters to the API URL only if they have values
    if (statusFilter) apiUrl += `&status=${statusFilter}`;
    if (titleFilter) apiUrl += `&jobTitle=${titleFilter}`;

    // Make the API call
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setProposals(data.data.result);
          setTotalPages(data.data.totalPages); // Assuming the API provides total pages
        } else {
          setError(data.message || "Failed to fetch proposals.");
        }
        setIsLoading(false);
      })
      .catch(() => {
        setError("Error fetching job proposals.");
        setIsLoading(false);
      });
  }, [recruiterId, statusFilter, titleFilter, currentPage]); // Only depend on recruiterId for the initial API call

  // Initial API call when the page is loaded or refreshed
  useEffect(() => {
    if (!recruiterId) {
      setError("Recruiter ID not found. Please log in.");
      setIsLoading(false);
      return;
    }
    fetchProposals(); // Initial fetch based on recruiterId
  }, [recruiterId, currentPage]); // Effect runs only once when component mounts

  // Function to handle search when the button is clicked
  const handleSearch = () => {
    fetchProposals(); // Trigger fetch when Search button is clicked
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

    // Create the payload for the update API request
    const updateData = {
      proposalId: updatedProposal.proposalId, // Assuming you have proposalId in your data
      recruiterId: recruiterId, // Use the recruiterId from localStorage or state
      title: updatedProposal.title,
      description: updatedProposal.description,
      category: updatedProposal.category,
      budget: updatedProposal.budget,
      skillsRequired: updatedProposal.skillsRequired,
      durationInDays: updatedProposal.durationInDays,
    };

    // Send the PUT request to update the proposal
    fetch(`http://localhost:5022/api/Recruiter/AddProposal`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData), // Send the payload as the request body
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          alert("Proposal updated successfully!");
          const updatedProposals = [...proposals];
          updatedProposals[index].isEditing = false; // Exit edit mode after saving
          setProposals(updatedProposals);
        } else {
          alert("Failed to update proposal.");
        }
      })
      .catch((error) => {
        alert("Error updating proposal: " + error);
      });
  };

  // Function to handle delete proposal
  const handleDeleteClick = (proposalId) => {
    // Send the DELETE request to delete the proposal
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
          // Update the proposals list after deletion
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

  // Pagination control handlers
  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

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
              onChange={(e) => setTitleFilter(e.target.value)} // Update title filter
            />
          </div>
          <div className="col-md-4 mb-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)} // Update status filter
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
                <div className="card shadow-sm custom-card">
                  <div className="card-body">
                    <div className="row">
                      {/* Left Side: Centered Image */}
                      <div className="col-md-4 d-flex justify-content-center align-items-center">
                        <img
                          src={require("../../assets/recruiter/Job.jpg")} // Static path to image
                          alt="Job"
                          className="img-fluid" // Make the image responsive
                          style={{ maxHeight: "210px", objectFit: "cover" }} // Ensures the image doesn't stretch
                        />
                      </div>

                      {/* Right Side: Job Information and Button */}
                      <div className="col-md-8">
                        {proposal.isEditing ? (
                          <div>
                            <label className="label-grey">Job Title</label>
                            <input
                              type="text"
                              name="title"
                              value={proposal.title}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                            <label className="label-grey">Description</label>
                            <textarea
                              name="description"
                              value={proposal.description}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                            <label className="label-grey">Category</label>
                            <input
                              type="text"
                              name="category"
                              value={proposal.category}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                            <label className="label-grey">Skills</label>
                            <input
                              type="text"
                              name="skillsRequired"
                              value={proposal.skillsRequired}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                            <label className="label-grey">Budget</label>
                            <input
                              type="number"
                              name="budget"
                              value={proposal.budget}
                              onChange={(e) => handleInputChange(e, index)}
                              className="form-control mb-2"
                            />
                            <div className="d-flex">
                              <button
                                className="btn btn-primary custom-button "
                                onClick={() => handleSaveChanges(index)}
                              >
                                Save
                              </button>
                              <button
                                className="btn btn-outline-dark custom-button "
                                onClick={() => handleCancelEdit(index)}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <p className="card-text">
                              <strong>Job Title:</strong> {proposal.title}
                            </p>
                            <p className="card-text">
                              <strong>Description:</strong>{" "}
                              {proposal.description}
                            </p>
                            <p className="card-text">
                              <strong>Category:</strong> {proposal.category}
                            </p>
                            <p className="card-text">
                              <strong>Skills:</strong> {proposal.skillsRequired}
                            </p>
                            <p className="card-text">
                              <strong>Budget:</strong> ${proposal.budget}
                            </p>
                            <p className="card-text">
                              <strong>Posted on:</strong>{" "}
                              {new Date(
                                proposal.createdAt
                              ).toLocaleDateString()}
                            </p>
                            <div className="d-flex">
                              <button
                                className="btn btn-primary custom-button"
                                onClick={() =>
                                  handleApplicationsClick(proposal.proposalId)
                                }
                              >
                                Applications
                              </button>
                              <button
                                className="btn btn-outline-primary custom-button"
                                onClick={() => handleEditClick(index)}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-outline-danger custom-button"
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
          <ul className="pagination justify-content-end">
            {/* Page Number Buttons */}
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

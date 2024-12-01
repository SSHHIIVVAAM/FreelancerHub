import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GetAllFreelancers.css";

const GetAllFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [roleInput, setRoleInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancerId, setSelectedFreelancerId] = useState("");
  const [message, setMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(6);
  const recruiterId = localStorage.getItem("recruiterId");

  useEffect(() => {
    fetchFreelancers(currentPage);
  }, [currentPage]);

  const fetchFreelancers = async (page) => {
    try {
      setLoading(true);
      const query = new URLSearchParams({
        pageIndex: page,
        pageSize,
        freelancerSkill: skillInput || "", // Pass skillInput if available
        freelancerRole: roleInput || "",   // Pass roleInput if available
      }).toString();
      const response = await fetch(
        `http://localhost:5022/api/Recruiter/GetAllFreelancers?${query}`,
        {
          method: "GET",
          headers: { Accept: "text/plain" },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.statusCode === 200) {
        const freelancerData = data.data.result;
        setFreelancers(freelancerData);
        setFilteredFreelancers(freelancerData);
        setTotalPages(data.data.totalPages); // Use totalPages from API response
        extractFilters(freelancerData);
      } else {
        setError(data.message || "Failed to fetch freelancers");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const extractFilters = (freelancers) => {
    const uniqueSkills = [
      ...new Set(freelancers.flatMap((f) => f.skills.split(", "))),
    ];
    const uniqueRoles = [...new Set(freelancers.map((f) => f.role))];
    setSkills(uniqueSkills);
    setRoles(uniqueRoles);
  };

  const handleSearch = () => {
    // Always hit the API when Search is clicked
    fetchFreelancers(1); // Reset to first page when search is clicked
  };

  const handleCancelFilter = () => {
    // Reset filter inputs and show all freelancers without calling the API again
    setSkillInput("");
    setRoleInput("");
    setFilteredFreelancers(freelancers); // No need to call API, just reset the filtered list
    setCurrentPage(1); // Reset to the first page
  };

  const openModal = (freelancerId) => {
    setSelectedFreelancerId(freelancerId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage("");
  };

  const handleInterestedSubmit = async () => {
    if (!recruiterId || !selectedFreelancerId || !message) {
      alert("All fields are required!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5022/api/Recruiter/InterestedInFreelancer?recruiterId=${recruiterId}&freelancerId=${selectedFreelancerId}&message=${encodeURIComponent(
          message
        )}`,
        {
          method: "POST",
          headers: { Accept: "text/plain" },
        }
      );

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        alert("Email sent successfully!");
      } else {
        alert(`Error: ${data.message || "Failed to send email"}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      closeModal();
    }
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="background-image">
      <div className="container mt-5">
        <h1 className="text-center mb-4">Freelancers List</h1>

        {/* Filters */}
        <div className="row mb-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by skill"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by role"
              value={roleInput}
              onChange={(e) => setRoleInput(e.target.value)}
            />
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <button className="btn btn-primary me-3" onClick={handleSearch}>
              Search
            </button>
            <button
              className="btn btn-outline-dark"
              onClick={handleCancelFilter}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Freelancer Cards */}
        <div className="row">
          {filteredFreelancers.map((freelancer) => (
            <div key={freelancer.freelancerId} className="col-md-4 mb-4 ">
              <div className="card text-center getAllFree">
                <img
                  src={freelancer.profilePicUrl}
                  alt={freelancer.freelancerName}
                  className="card-img-top rounded-circle mx-auto mt-3"
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{freelancer.freelancerName}</h5>
                  <p className="card-text">
                    <strong>Role:</strong> {freelancer.role}
                    <br />
                    <strong>Skills:</strong> {freelancer.skills}
                    <br />
                    <strong>Email:</strong> {freelancer.email}
                    <br />
                    <strong>Phone Number:</strong> {freelancer.phoneNumber}
                    <br />
                    <strong>Joined At:</strong>{" "}
                    {new Date(freelancer.createdAt).toLocaleDateString("en-GB")}
                  </p>
                  <button
                    className=" btn btn-primary"
                    onClick={() => openModal(freelancer.freelancerId)}
                  >
                    Interested
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

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

        {/* Modal for sending interest */}
        {isModalOpen && (
          <div
            className="modal show"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Interested in Freelancer</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={closeModal}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={closeModal}>
                    Close
                  </button>
                  <button type="button" className="btn btn-primary" onClick={handleInterestedSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetAllFreelancers;

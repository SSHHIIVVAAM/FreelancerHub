import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./GetAllFreelancers.css"

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
  const recruiterId = localStorage.getItem("recruiterId");

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const response = await fetch(
        `http://localhost:5022/api/Recruiter/GetAllFreelancers?pageIndex=1&pageSize=1000`,
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
        setTotalPages(Math.ceil(freelancerData.length / 10));
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
    filterFreelancers(skillInput, roleInput);
  };

  const filterFreelancers = (skill, role) => {
    let filtered = freelancers;

    if (skill) {
      filtered = filtered.filter((f) =>
        f.skills.toLowerCase().includes(skill.toLowerCase())
      );
    }

    if (role) {
      filtered = filtered.filter((f) =>
        f.role.toLowerCase().includes(role.toLowerCase())
      );
    }

    setFilteredFreelancers(filtered);
    setTotalPages(Math.ceil(filtered.length / 10));
    setCurrentPage(1);
  };

  const handleCancelFilter = () => {
    setSkillInput("");
    setRoleInput("");
    setFilteredFreelancers(freelancers);
    setTotalPages(Math.ceil(freelancers.length / 10));
    setCurrentPage(1);
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
    setCurrentPage(pageNumber);
  };

  const paginateFreelancers = (freelancers) => {
    const start = (currentPage - 1) * 10;
    const end = start + 10;
    return freelancers.slice(start, end);
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
    <button className="btn btn-outline-dark" onClick={handleCancelFilter}>
      Reset
    </button>
  </div>
</div>


      {/* Freelancer Cards */}
      <div className="row">
        {paginateFreelancers(filteredFreelancers).map((freelancer) => (
          <div key={freelancer.freelancerId} className="col-md-4 mb-4">
            <div className="card text-center">
              <img
                src={freelancer.profilePicUrl}
                alt={freelancer.freelancerName}
                className="card-img-top rounded-circle mx-auto mt-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
              <div className="card-body">
                <h5 className="card-title">{freelancer.freelancerName}</h5>
                <p className="card-text">
                  <strong>Role:</strong> {freelancer.role}
                  <br />
                  <strong>Skills:</strong> {freelancer.skills}
                  <br/>
                  <strong>Email:</strong> {freelancer.email}
                  <br />
                  <strong>Phone Number:</strong> {freelancer.phoneNumber}
                  <br/> 
                  <strong>Joined At:</strong> {new Date(freelancer.createdAt).toLocaleDateString("en-GB")}
                </p>
                <button
              className="interested-button btn btn-primary"
              onClick={() => openModal(freelancer.freelancerId)}
            >
              Interested
            </button>
                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <nav className="mt-4">
        <ul className="pagination justify-content-center">
          {currentPage > 1 && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous
              </button>
            </li>
          )}
          {currentPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Express Interest</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
            />
            <div className="modal-actions">
              <button
                className="submit-button"
                onClick={handleInterestedSubmit}
              >
                Submit
              </button>
              <button className="close-button" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    
  );
};

export default GetAllFreelancers;




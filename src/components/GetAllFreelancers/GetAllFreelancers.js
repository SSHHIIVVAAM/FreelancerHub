import React, { useEffect, useState } from 'react';
import './GetAllFreelancers.css';

const GetAllFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [skillInput, setSkillInput] = useState(''); // Skill input for text format
  const [roleInput, setRoleInput] = useState(''); // Role input for text format
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancerId, setSelectedFreelancerId] = useState('');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [totalPages, setTotalPages] = useState(1); // Track total pages
  const recruiterId = localStorage.getItem('recruiterId'); // Assume recruiterId is stored in localStorage

  useEffect(() => {
    fetchFreelancers();
  }, [currentPage]); // Fetch freelancers when page changes

  const fetchFreelancers = async () => {
    try {
      const response = await fetch(
        `http://localhost:5022/api/Recruiter/GetAllFreelancers?pageIndex=${currentPage}&pageSize=10`,
        {
          method: 'GET',
          headers: { Accept: 'text/plain' },
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
        setTotalPages(data.data.totalPages); // Set total pages from the response
        extractFilters(freelancerData);
      } else {
        setError(data.message || 'Failed to fetch freelancers');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const extractFilters = (freelancers) => {
    const uniqueSkills = [...new Set(freelancers.flatMap((f) => f.skills.split(', ')))];
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
      filtered = filtered.filter((f) => f.skills.toLowerCase().includes(skill.toLowerCase()));
    }

    if (role) {
      filtered = filtered.filter((f) => f.role.toLowerCase().includes(role.toLowerCase()));
    }

    setFilteredFreelancers(filtered);
  };

  const handleCancelFilter = () => {
    setSkillInput('');
    setRoleInput('');
    setFilteredFreelancers(freelancers); // Reset to show all freelancers
  };

  const openModal = (freelancerId) => {
    setSelectedFreelancerId(freelancerId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage('');
  };

  const handleInterestedSubmit = async () => {
    if (!recruiterId || !selectedFreelancerId || !message) {
      alert('All fields are required!');
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5022/api/Recruiter/InterestedInFreelancer?recruiterId=${recruiterId}&freelancerId=${selectedFreelancerId}&message=${encodeURIComponent(message)}`,
        {
          method: 'POST',
          headers: { Accept: 'text/plain' },
        }
      );

      const data = await response.json();

      if (response.ok && data.statusCode === 200) {
        alert('Email sent successfully!');
      } else {
        alert(`Error: ${data.message || 'Failed to send email'}`);
      }
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      closeModal();
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // Change the current page
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="freelancers-container">
      <h1>Freelancers List</h1>

      {/* Filters */}
      <div className="filters">
        <label htmlFor="skill">Search by Skill:</label>
        <input
          type="text"
          id="skill"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          placeholder="Enter skill"
        />

        <label htmlFor="role">Search by Role:</label>
        <input
          type="text"
          id="role"
          value={roleInput}
          onChange={(e) => setRoleInput(e.target.value)}
          placeholder="Enter role"
        />

        <button onClick={handleSearch}>Search</button>
        <button onClick={handleCancelFilter}>Cancel Filter</button>
      </div>

      {/* Freelancer Cards */}
      <div className="freelancers-list">
        {filteredFreelancers.map((freelancer) => (
          <div key={freelancer.freelancerId} className="freelancer-card">
            <img
              src={freelancer.profilePicUrl}
              alt={freelancer.freelancerName}
              className="profile-pic"
            />
            <h2>{freelancer.freelancerName}</h2>
            <p>
              <strong>Role:</strong> {freelancer.role}
            </p>
            <p>
              <strong>Skills:</strong> {freelancer.skills}
            </p>
            <p>
              <strong>Email:</strong> {freelancer.email}
            </p>
            <p>
              <strong>Phone:</strong> {freelancer.phoneNumber}
            </p>
            <p>
              <strong>DOB:</strong> {new Date(freelancer.dob).toDateString()}
            </p>
            <button
              className="interested-button"
              onClick={() => openModal(freelancer.freelancerId)}
            >
              Interested
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {currentPage > 1 && (
          <button onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
        )}
      </div>

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
              <button className="submit-button" onClick={handleInterestedSubmit}>
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
  );
};

export default GetAllFreelancers;

import React, { useEffect, useState } from 'react';
import './GetAllFreelancers.css';

const GetAllFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [filteredFreelancers, setFilteredFreelancers] = useState([]);
  const [skills, setSkills] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFreelancerId, setSelectedFreelancerId] = useState('');
  const [message, setMessage] = useState('');
  const recruiterId = localStorage.getItem('recruiterId'); // Assume recruiterId is stored in localStorage

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      const response = await fetch(
        'http://localhost:5022/api/Recruiter/GetAllFreelancers?pageIndex=1&pageSize=10',
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

  const handleSkillChange = (e) => {
    setSelectedSkill(e.target.value);
    filterFreelancers(e.target.value, selectedRole);
  };

  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    filterFreelancers(selectedSkill, e.target.value);
  };

  const filterFreelancers = (skill, role) => {
    let filtered = freelancers;

    if (skill) {
      filtered = filtered.filter((f) => f.skills.includes(skill));
    }

    if (role) {
      filtered = filtered.filter((f) => f.role === role);
    }

    setFilteredFreelancers(filtered);
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

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="freelancers-container">
      <h1>Freelancers List</h1>

      {/* Filters */}
      <div className="filters">
        <label htmlFor="skill">Filter by Skill:</label>
        <select id="skill" value={selectedSkill} onChange={handleSkillChange}>
          <option value="">All Skills</option>
          {skills.map((skill) => (
            <option key={skill} value={skill}>
              {skill}
            </option>
          ))}
        </select>

        <label htmlFor="role">Filter by Role:</label>
        <select id="role" value={selectedRole} onChange={handleRoleChange}>
          <option value="">All Roles</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
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

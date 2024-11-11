import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./FreelancerSignUp.css";

const FreelancerSignupPage = () => {
  const [formData, setFormData] = useState({
    freelancerName: '',
    skills: '',
    role: '',
    dob: '',
    phoneNumber: '',
    password: '',
    email: '',
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('ProfilePic', profilePic);
    form.append('Skills', formData.skills);
    form.append('FreelancerName', formData.freelancerName);
    form.append('Role', formData.role);
    form.append('DOB', formData.dob);
    form.append('PhoneNumber', formData.phoneNumber);
    form.append('Password', formData.password);
    form.append('Email', formData.email);

    try {
      const response = await fetch('http://localhost:5022/api/Freelancer/AddFreelancer', {
        method: 'POST',
        body: form,
        headers: { Accept: 'text/plain' },
      });

      const result = await response.json();

      if (response.ok && result.statusCode === 200) {
        alert('Successfully registered!');
        navigate('/FreelancerLogin');
      } else {
        setError(result.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      console.error('Error during signup:', err);
      setError('Something went wrong. Please try again later.');
    }
  };

  return (
    <div className="signup-page3">
      <h2>Freelancer Signup</h2>
      <form onSubmit={handleSubmit} className="signup-form3">
        <div className="form-group3">
          <label>Profile Picture:</label>
          <input type="file" onChange={handleFileChange} required />
        </div>
        <input
          type="text"
          name="freelancerName"
          placeholder="Freelancer Name"
          value={formData.freelancerName}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="skills"
          placeholder="Skills (e.g., HTML, CSS, React.js)"
          value={formData.skills}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="role"
          placeholder="Role (e.g., Frontend Developer)"
          value={formData.role}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <button type="submit" className="signup-btn">Sign Up</button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default FreelancerSignupPage;

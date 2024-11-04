// src/components/FreelancerMainPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerMainPage.css";
import JobForm from "../JobForm/JobForm";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa"; 
import CardImage from "../../assets/MAINSCREEN.jpeg"

const FreelancerMainPage = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isJobFormVisible, setIsJobFormVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 500);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("recruiterData");
    navigate("/");
  };

  const toggleJobForm = () => {
    setIsJobFormVisible(!isJobFormVisible);
  };

  return (
    <div className="main-container1">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-logo">Freelancer Hub</div>
        <ul className="navbar-links">
          <li onClick={handleSignOut}>Sign Out</li>
        </ul>
        <button className="add-job-button" onClick={toggleJobForm}>
          Add Jobs
        </button>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Freelancer HUB</h1>
          <p>
            Discover talented freelancers for your projects or share your skills to
            find new opportunities.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">Browse Jobs</button>
            <button className="btn btn-outline-secondary">Post a Job</button>
          </div>
        </div>
        <div className="hero-image">
          <img src={CardImage} alt="Freelancer working" />
        </div>
      </div>

      {/* Job Form */}
      {isJobFormVisible && <JobForm onClose={toggleJobForm} />}

      {/* Footer */}
      <footer className="footer">
        <p>Follow us on:</p>
        <div className="social-icons">
          <FaInstagram />
          <FaFacebook />
          <FaWhatsapp />
        </div>
      </footer>
    </div>
  );
};

export default FreelancerMainPage;

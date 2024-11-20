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

  const goToProfilePage = () => {
    navigate("/ProfilePage");
  };

  const goToBrowseJob = () => {
    navigate("/browse-jobs");
  }
  const toggleFreelancers = () => {
    navigate("/GetAllFreelancers");
  }

  return (
    <div className="main-container255">
      {/* Navbar */}
      <nav className="navbar255">
        <div className="navbar-logo255">Freelancer Hub</div>
        <ul className="navbar-links255">
          <li onClick={handleSignOut}>Sign Out</li>
         
        </ul>
        <button className="add-job-button255" onClick={toggleJobForm}>
          Add Jobs
        </button>
        <button className="add-job-button255" onClick={toggleFreelancers}>
          Get Freelancers
        </button>
        
      </nav>

      {/* Hero Section */}
      <div className="hero-section255">
        <div className="hero-content255">
          <h1>Welcome to Freelancer HUB</h1>
          <p>
            Discover talented freelancers for your projects or share your skills to
            find new opportunities.
          </p>
          <div className="hero-buttons255">
            <button className="btn btn-primary255" onClick={goToBrowseJob}>Browse Jobs</button>
            <button className="btn btn-outline-secondary255" onClick={toggleJobForm}>Post a Job</button>
          </div>
        </div>
        <div className="hero-image255">
          <img src={CardImage} alt="Freelancer working" />
          <button className="bttn255" onClick={goToProfilePage}>Go to Profile</button> {/* New Profile Button */}
        </div>
      </div>
      

      {/* Job Form */}
      {isJobFormVisible && <JobForm onClose={toggleJobForm} />}

      {/* Footer */}
      <footer className="footer255">
        <p>Follow us on:</p>
        <div className="social-icons255">
          <FaInstagram />
          <FaFacebook />
          <FaWhatsapp />
        </div>
      </footer>
    </div>
  );
};

export default FreelancerMainPage;

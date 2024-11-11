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

  return (
    <div className="main-container2">
      {/* Navbar */}
      <nav className="navbar2">
        <div className="navbar-logo2">Freelancer Hub</div>
        <ul className="navbar-links2">
          <li onClick={handleSignOut}>Sign Out</li>
         
        </ul>
        <button className="add-job-button2" onClick={toggleJobForm}>
          Add Jobs
        </button>
        
      </nav>

      {/* Hero Section */}
      <div className="hero-section2">
        <div className="hero-content2">
          <h1>Welcome to Freelancer HUB</h1>
          <p>
            Discover talented freelancers for your projects or share your skills to
            find new opportunities.
          </p>
          <div className="hero-buttons2">
            <button className="btn btn-primary2" onClick={goToBrowseJob}>Browse Jobs</button>
            <button className="btn btn-outline-secondary2" onClick={toggleJobForm}>Post a Job</button>
          </div>
        </div>
        <div className="hero-image2">
          <img src={CardImage} alt="Freelancer working" />
          <button className="bttn2" onClick={goToProfilePage}>Go to Profile</button> {/* New Profile Button */}
        </div>
      </div>
      

      {/* Job Form */}
      {isJobFormVisible && <JobForm onClose={toggleJobForm} />}

      {/* Footer */}
      <footer className="footer2">
        <p>Follow us on:</p>
        <div className="social-icons2">
          <FaInstagram />
          <FaFacebook />
          <FaWhatsapp />
        </div>
      </footer>
    </div>
  );
};

export default FreelancerMainPage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../JobForm/JobForm";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import CardImage from "../../assets/freelancer-image-home.jpg";
import "./FreelancerMainPage.css";

const FreelancerMainPage = () => {
  const navigate = useNavigate();
  const [isJobFormVisible, setIsJobFormVisible] = useState(false);

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
  };

  const toggleFreelancers = () => {
    navigate("/GetAllFreelancers");
  };

  return (
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column ">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <a className="navbar-brand recruiterMain" link="#">
          Recruiter Hub
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto btnMain">
            <li className="nav-item">
              <button
                className="btn btn-outline-light me-3"
                onClick={toggleJobForm}
              >
                Add Jobs
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light me-3"
                onClick={toggleFreelancers}
              >
                Get Freelancers
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-danger" onClick={handleSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container my-5 ful">
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 text-primary welcome">
              Welcome to Recruiter <span className="hub">HUB</span> 
            </h1>
            <p className="lead">
              Discover talented freelancers for your projects.
            </p>
            <div className="d-flex justify-content-center justify-content-md-start">
              <button className="btn btn-primary me-3 browseMain" onClick={goToBrowseJob}>
                Browse Jobs
              </button>
              <button
                className="btn btn-outline-secondary"
                onClick={toggleJobForm}
              >
                Post a Job
              </button>
            </div>
          </div>
          <div className="col-md-6 text-center mt-4 mt-md-0">
            <img
              src={CardImage}
              alt="Freelancer working"
              className="img-fluid rounded shadow"
            />
            <button className="btn btn-dark mt-3 profileMain" onClick={goToProfilePage}>
              Go to Profile
            </button>
          </div>
        </div>
      </div>

      {/* Job Form */}
      {isJobFormVisible && <JobForm onClose={toggleJobForm} />}

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto footerMain">
        <div className="container text-center footer footerMain1">
          <p className="mb-2 followMain">Follow us on:</p>
          <div className="d-flex justify-content-center iconMain">
            <FaInstagram className="mx-2" size={24} />
            <FaFacebook className="mx-2" size={24} />
            <FaWhatsapp className="mx-2" size={24} />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FreelancerMainPage;

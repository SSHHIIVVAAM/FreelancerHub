import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobForm from "../JobForm/JobForm";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import CardImage from "../../assets/recruiter/desktop.webp";
import rocket from "../../assets/recruiter/rocket.svg";
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
    <div className="container-fluid bg-light min-vh-100 d-flex flex-column p-0">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-5">
        <a className="navbar-brand recruiterMain" link="#">
          RecruiterHub
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
      <div className="container-fluid px-md-5 py-5">
        <div className="row justify-content-center align-items-center">
          {/* Content Column */}
          <div className="col-md-7 text-center">
            <h1
              className="display-4 fw-bold lh-1 mb-3"
              style={{ fontSize: "2.5rem" }}
            >
              <span style={{ color: "#0EA5E9", fontSize: "inherit" }}>
                RecruiterHub
              </span>{" "}
              - Discover Talented
              <br /> Freelancers
              <br />
              <img src={rocket} alt="Icon" width="80" height="80" />
            </h1>
            <p className="text-muted fs-5" style={{ fontWeight: "600" }}>
              Find the best{" "}
              <span className="text-dark fw-bold">freelancers</span> from{" "}
              <span className="text-dark fw-bold">RecruiterHub</span>.
            </p>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-dark btn-sm w-auto me-3"
                style={{ fontSize: "1.3rem" }}
                onClick={goToBrowseJob}
              >
                Browse Jobs{" "}
                <i className="bi bi-arrow-right text-white ms-2"></i>
              </button>
              <button
                className="btn btn-outline-secondary btn-sm w-auto"
                style={{ fontSize: "1.3rem" }}
                onClick={toggleJobForm}
              >
                Post a Job
              </button>
            </div>
          </div>

          {/* Image Column */}
          <div className="col-md-5 text-center mt-4 mt-md-0">
            <img
              src={CardImage}
              alt="Freelancer working"
              className="img-fluid"
              style={{ maxWidth: "100%", height: "auto" }}
            />
            <button
              className="btn btn-dark mt-3"
              style={{ fontSize: "1.3rem" }}
              onClick={goToProfilePage}
            >
              Go to Profile
            </button>
          </div>
        </div>
      </div>

      {/* Job Form */}
      {isJobFormVisible && <JobForm onClose={toggleJobForm} />}

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-auto">
        <div className="container bg-dark">
          <div className="row">
            {/* Left Column */}
            <div className="col-md-4 mb-3">
              <h5 className="mb-3 logoMain">The agency for impatient brands®</h5>
            </div>
            {/* Center Column */}
            <div className="col-md-4 mb-3">
              <div>
                <h6 className="text-uppercase">London</h6>
                <p>
                  <a
                    href="mailto:newbusiness@weareimpero.com"
                    className="text-white text-decoration-none"
                  >
                    newbusiness@weareimpero.com
                  </a>
                  <br />
                  +44 20 7998 7571
                  <br />
                  Unit 306, Metropolitan Wharf,
                  <br />
                  70 Wapping Wall, London E1W 3SS
                </p>
              </div>
            </div>
            {/* Right Column */}
            <div className="col-md-4 text-md-end">
              <h6 className="text-uppercase">
                Want to be the smartest in your office?
              </h6>
              <a
                href="#"
                className="text-white text-decoration-none d-block mb-4"
              >
                SIGN UP FOR OUR NEWSLETTER →
              </a>
              <h6 className="text-uppercase">Follow us</h6>
              <div className="d-flex justify-content-md-end justify-content-center">
                <a href="#" className="text-white mx-2">
                  <FaInstagram size={24} />
                </a>
                <a href="#" className="text-white mx-2">
                  <FaFacebook size={24} />
                </a>
                <a href="#" className="text-white mx-2">
                  <FaWhatsapp size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FreelancerMainPage;

import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/freelancer-home-image.jpg";
import CardImage from "../../assets/Signup2.jpg"; // Placeholder image for cards
import "./FreelancerMain.css";

const FreelancerMain = () => {
  const navigate = useNavigate();

  return (
    <div className="freelancer-main">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
        <div className="container-fluid">
          <span className="navbar-brand fw-bold">Recruiter HUB</span>
          <div className="d-flex align-items-center">
            <button
              onClick={() => navigate("/freelancer-login")}
              className="btn btn-outline-light me-2 login"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/freelancer-signup")}
              className="btn btn-light"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="position-relative">
        {/* Background Section */}
        <div className="position-relative text-center">
          <img
            src={BackgroundImage}
            alt="Background"
            className="img-fluid w-100"
            style={{ maxHeight: "600px", objectFit: "cover" }}
          />
          <div
            className="position-absolute top-50 start-50 translate-middle text-white text-center"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)",
            }}
          >
            <h1 className="display-4 fw-bold">Explore Exciting Projects</h1>
            <p className="lead mb-4">
              Connect with recruiters, showcase your talent, and discover your
              next big opportunity.
            </p>
            <button
              className="btn btn-warning btn-lg"
              onClick={() => navigate("/freelancer-signup")}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Cards Section
        <div className="container py-5">
          <div className="row g-4">
            {[1, 2, 3, 4].map((item) => (
              <div className="col-md-3" key={item}>
                <div className="card shadow-sm h-100">
                  <img
                    src={CardImage}
                    alt={`Card ${item}`}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">Project {item}</h5>
                    <p className="card-text text-muted">
                      Discover amazing freelance opportunities and showcase your
                      skills.
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      {/* Footer Section */}
      <footer className="bg-dark text-white text-center py-3">
        <p className="connect mb-2">Connect with us on social media</p>
        <div>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="img-fluid"
              style={{ width: "30px" }}
            />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
            className="me-3"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="img-fluid"
              style={{ width: "30px" }}
            />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook"
              className="img-fluid"
              style={{ width: "30px" }}
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default FreelancerMain;

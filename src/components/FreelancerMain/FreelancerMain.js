import React from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerMain.css";
import BackgroundImage from "../../assets/MainScreenBackground.jpg";
import CardImage from "../../assets/RecruiLogin.jpg"; // Placeholder image for cards

const FreelancerMain = () => {
  const navigate = useNavigate();

  return (
    <div className="freelancer-main">
      {/* Navigation Bar */}
      <div className="navbar">
        <div className="navbar-brand">Recruiter HUB</div>
        <div className="navbar-buttons">
          <button onClick={() => navigate("/freelancer-login")} className="nav-btn">
            Login
          </button>
          <button onClick={() => navigate("/freelancer-signup")} className="nav-btn">
            Get Started
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-wrapper">
        {/* Background Section */}
        <div className="background-container">
          <img src={BackgroundImage} alt="Background" className="background-image" />
          <div className="overlay-content">
            <h1>Explore Exciting Projects</h1>
            <p>Connect with recruiters, showcase your talent, and discover your next big opportunity.</p>
            <button className="overlay-btn" onClick={() => navigate("/freelancer-signup")}>
              Get Started
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="card-container">
          {[1, 2, 3, 4].map((item) => (
            <div className="card" key={item}>
              <img src={CardImage} alt={`Card ${item}`} className="card-image" />
              <div className="card-content">
                <h5>Project {item}</h5>
                <p>Discover amazing freelance opportunities and showcase your skills.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer">
        <p>Connect with us on social media</p>
        <div className="social-icons">
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram" className="social-icon"
            />
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp" className="social-icon"
            />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              alt="Facebook" className="social-icon"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default FreelancerMain;

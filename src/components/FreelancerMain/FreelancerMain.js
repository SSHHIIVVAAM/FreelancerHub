import React from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerMain.css";
import BackgroundImage from "../../assets/MainScreenBackground.jpg";
import CardImage from "../../assets/RecruiLogin.jpg"; // Placeholder image for cards

const FreelancerMain = () => {
  const navigate = useNavigate();

  return (
    <div className="freelancerMain1">
      {/* Navigation Bar */}
      <div className="navbar1">
        <div className="navbarBrand1">Recruiter HUB</div>
        <div className="navbarButtons1">
          <button
            onClick={() => navigate("/freelancer-login")}
            className="navButton1"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/freelancer-signup")}
            className="navButton1"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="contentWrapper1">
        {/* Background Section */}
        <div className="backgroundContainer1">
          <img
            src={BackgroundImage}
            alt="Background"
            className="backgroundImage1"
          />
          <div className="overlayContent1">
            <h1>Explore Exciting Projects</h1>
            <p>
              Connect with recruiters, showcase your talent, and discover your
              next big opportunity.
            </p>
            <button
              className="overlayButton1"
              onClick={() => navigate("/freelancer-signup")}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div className="cardContainer1">
          {[1, 2, 3, 4].map((item) => (
            <div className="card1" key={item}>
              <img
                src={CardImage}
                alt={`Card ${item}`}
                className="cardImage1"
              />
              <div className="cardContent1">
                <h5>Project {item}</h5>
                <p>
                  Discover amazing freelance opportunities and showcase your
                  skills.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Section */}
      <footer className="footer1">
        <p>Connect with us on social media</p>
        <div className="socialIcons1">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
              alt="Instagram"
              className="socialIcon1"
            />
          </a>
          <a
            href="https://www.whatsapp.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
              alt="WhatsApp"
              className="socialIcon1"
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
              className="socialIcon1"
            />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default FreelancerMain;

// src/MainScreen.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MainScreen.css"; // Import CSS for styling
import FreelancerImage from "../../assets/FreelancerOptionLogin.gif";
import Logo from "../../assets/FreelancerHubLogo.jpg"; // Import the logo image

const MainScreen = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false); // State for animation control

  // Trigger animation when the component mounts
  useEffect(() => {
    setTimeout(() => setIsLoaded(true), 100); // Add a small delay before triggering
  }, []);

  const handleSelection = (role) => {
    if (role === "freelancer") {
      navigate("/freelancer-home");
    } else {
      navigate("/client-home");
    }
  };

  return (
    <div className={`main-screen ${isLoaded ? "fade-in" : ""}`}>
      <div className="blur-background">
        <img src={FreelancerImage} alt="Freelancer Hub" />
      </div>

      <div className={`content ${isLoaded ? "slide-in" : ""}`}>
        <img src={Logo} alt="Logo" className="logo" />
        <h1>Join Us and Start Your Journey!</h1>
        <div className="buttons-container">
          <button
            onClick={() => handleSelection("freelancer")}
            className="main-btn"
          >
            Recruiter
          </button>
          <span className="or-text">OR</span>
          <button
            onClick={() => handleSelection("client")}
            className="main-btn"
          >
            Freelancer
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;

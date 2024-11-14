// src/components/LogoScreen/LogoScreen.js
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LogoScreen.css";
import Logo1 from "../../assets/FreelancerHubLogo.jpg";

const LogoScreen = () => {
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/home"); // Navigate to MainScreen after 4 seconds
    }, 4000);

    return () => clearTimeout(timer); // Cleanup the timer on component unmount
  }, [navigate]);

  return (
    <div className="logo-screen11">
      <div className="card11">
        <img src={Logo1} alt="Freelancer Hub Logo" className="logo-image11" />
        <div className="card-content11">
          <h2>Welcome to Freelancer Hub</h2>
          <p>Your journey to endless freelancing opportunities starts here!</p>
        </div>
      </div>
    </div>
  );
};

export default LogoScreen;

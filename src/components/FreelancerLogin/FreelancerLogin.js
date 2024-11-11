import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerLogin.css";

const FreelancerLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5022/api/Freelancer/FreelancerLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        // Save freelancer data to localStorage
        localStorage.setItem("freelancerId", result.data.freelancerId);
        localStorage.setItem("freelancerName", result.data.freelancerName);
        localStorage.setItem("profilePicUrl", result.data.profilePicUrl);
        localStorage.setItem("skills", result.data.skills.join(", "));

        alert("Successfully logged in!");
        navigate("/FreelancerProfilePage"); // Navigate to freelancer main page
      } else {
        setErrorMessage("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      {/* Left Section */}
      <div className="left-section animate-slide-in-left">
        <h1>Welcome to Freelancer Hub</h1>
        <p>Find exciting freelance projects and connect with recruiters.</p>
      </div>

      {/* Right Section - Login Form */}
      <div className="right-section animate-fade-in">
        <div className="login-container">
          <h2 className="animate-slide-in-top">Freelancer Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>

          {errorMessage && (
            <div className="error-popup animate-bounce-in">
              <p>{errorMessage}</p>
              <button onClick={() => setErrorMessage(null)}>Close</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerLoginPage;

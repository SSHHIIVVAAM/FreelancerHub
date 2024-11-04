import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./FreelancerLoginPage.css"; // Import CSS for styling

const FreelancerLoginPage = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(null); // Error message state
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      const response = await fetch(
        "http://localhost:5022/api/Recruiter/RecruiterLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const result = await response.json(); // Parse response as JSON

      if (result.statusCode === 200) {
        localStorage.setItem("recruiterId", result.data.recruiterId);
        localStorage.setItem("recruiterName", result.data.recruiterName);
        localStorage.setItem("profilePicUrl", result.data.profilePicUrl);
        navigate("/freelancer-main"); // Navigate to the main page
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
        <h1>Welcome to Recruiter Hub</h1>
        <p>Discover freelance opportunities and connect with top recruiters.</p>
      </div>

      {/* Right Section - Login Form */}
      <div className="right-section animate-fade-in">
        <div className="login-container">
          <h2 className="animate-slide-in-top">Recruiter Login</h2>
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

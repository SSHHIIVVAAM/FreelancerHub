import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import "./FreelancerLoginPage.css";

const FreelancerLoginPage = () => {
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [errorMessage, setErrorMessage] = useState(null); // Error message state
  const [pageLoaded, setPageLoaded] = useState(false); // Animation state
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    setPageLoaded(true); // Trigger animation on page load
  }, []);

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
    <div
      className={`container-fluid vh-100 d-flex align-items-center justify-content-center bg-light ${
        pageLoaded ? "fade-in" : ""
      }`}
    >
      <div className="row shadow-lg bg-white rounded w-75">
        {/* Left Section */}
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center p-4 text-white loginleft">
          <h1 className="mb-4">Welcome to Recruiter Hub</h1>
          <p>Discover freelance opportunities and connect with top recruiters.</p>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 p-5">
          <h2 className="text-center mb-4 reclogin">Recruiter Login</h2>
          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn w-100 mb-3 loginbtn">
              Login
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a
              href="/forgot-password" // Navigate to Forgot Password page
              className="text-decoration-none forgotPass"
            >
              Forgot Password?
            </a>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="alert alert-danger mt-3" role="alert">
              {errorMessage}
              <button
                type="button"
                className="btn-close ms-2"
                aria-label="Close"
                onClick={() => setErrorMessage(null)}
              ></button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FreelancerLoginPage;

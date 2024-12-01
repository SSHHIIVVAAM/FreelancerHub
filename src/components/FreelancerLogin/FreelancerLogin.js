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
      const response = await fetch(
        "http://localhost:5022/api/Freelancer/FreelancerLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      if (response.ok) {
        const result = await response.json();

        if (result.statusCode === 200) {
          // Save freelancer data to localStorage
          localStorage.setItem("freelancerId", result.data.freelancerId);
          localStorage.setItem("freelancerName", result.data.freelancerName);
          localStorage.setItem("profilePicUrl", result.data.profilePicUrl);
          localStorage.setItem("skills", result.data.skills);

          navigate("/FreelancerHomePage");
        } else {
          setErrorMessage(result.message || "Invalid login details.");
        }
      } else {
        setErrorMessage(
          "Invalid login attempt. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Error during login:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="container login-container">
      <div className="card d-flex flex-row shadow-lg">
        {/* Left Side */}
        <div className="card-left col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h2>Welcome Back!</h2>
          <p>To continue your journey, please login with your personal info</p>
          <button
            className="btn signup-btn"
            onClick={() => navigate("/SignUp-Freelancer")}
          >
            SIGN UP
          </button>
        </div>

        {/* Right Side */}
        <div className="card-right col-md-6">
          <h2 className="freeh2">Freelancer Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            {errorMessage && <p className="error">{errorMessage}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreelancerLoginPage;

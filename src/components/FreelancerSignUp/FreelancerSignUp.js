import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerSignUp.css";

const FreelancerSignupPage = () => {
  const [formData, setFormData] = useState({
    freelancerName: "",
    skills: "",
    role: "",
    dob: "",
    phoneNumber: "",
    password: "",
    email: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loader

    const form = new FormData();
    form.append("ProfilePic", profilePic);
    form.append("Skills", formData.skills);
    form.append("FreelancerName", formData.freelancerName);
    form.append("Role", formData.role);
    form.append("DOB", formData.dob);
    form.append("PhoneNumber", formData.phoneNumber);
    form.append("Password", formData.password);
    form.append("Email", formData.email);

    try {
      const response = await fetch(
        "http://localhost:5022/api/Freelancer/AddFreelancer",
        {
          method: "POST",
          body: form,
          headers: { Accept: "text/plain" },
        }
      );

      const result = await response.json();

      if (response.ok && result.statusCode === 200) {
        alert("Successfully registered!");
        navigate("/FreelancerLogin");
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <div className="mainContainer">
      <div className="card d-flex flex-row shadow-lg">
        {/* Left Side */}
        <div className="card-left col-md-6 d-flex flex-column justify-content-center align-items-center">
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <button
            className="btn signin-btn"
            onClick={() => navigate("/FreelancerLogin")}
          >
            SIGN IN
          </button>
        </div>

        {/* Right Side */}
        <div className="card-right col-md-6">
          <h2>Create Account</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="profilePic" className="form-label">
                Profile Picture
              </label>
              <input
                type="file"
                className="form-control"
                id="profilePic"
                onChange={handleFileChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="freelancerName"
                placeholder="Freelancer Name"
                value={formData.freelancerName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="skills"
                placeholder="Skills (e.g., HTML, CSS, React.js)"
                value={formData.skills}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="role"
                placeholder="Role (e.g., Frontend Developer)"
                value={formData.role}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="dob" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                className="form-control"
                name="dob"
                id="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                name="phoneNumber"
                placeholder="Phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading} // Disable button while loading
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
            {error && <p className="error">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSignupPage;

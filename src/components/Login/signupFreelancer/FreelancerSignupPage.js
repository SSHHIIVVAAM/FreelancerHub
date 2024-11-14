import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerSignupPage.css";

const FreelancerSignupPage = () => {
  const [formData, setFormData] = useState({
    recruiterName: "",
    password: "",
    dob: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    companyAddress: "",
    aboutCompany: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
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
    const form = new FormData();
    form.append("ProfilePic", profilePic);
    form.append("RecruiterName", formData.recruiterName);
    form.append("Password", formData.password);
    form.append("DOB", formData.dob);
    form.append("Email", formData.email);
    form.append("PhoneNumber", formData.phoneNumber);
    form.append("CompanyName", formData.companyName);
    form.append("CompanyAddress", formData.companyAddress);
    form.append("AboutCompany", formData.aboutCompany);
    form.append("RecruiterId", "");

    try {
      const response = await fetch(
        "http://localhost:5022/api/Recruiter/AddRecruiter",
        {
          method: "POST",
          body: form,
          headers: { Accept: "text/plain" },
        }
      );
      const result = await response.json();
      if (response.ok && result.statusCode === 200) {
        alert("Successfully registered!");
        localStorage.setItem("recruiterData", JSON.stringify(result.data));
        navigate("/freelancer-main");
      } else {
        setError(result.message || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Error during signup:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signup-page44">
      <div className="left-section144">
        {/* Left Section with Background Image Overlay */}
        <div className="overlay44">
          <h2>Join Freelancer Hub</h2>
          <p>Find the best talent or become a part of something bigger.</p>
        </div>
      </div>

      <div className="right-section44">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group44">
            <label>Profile Picture:</label>
            <input type="file" onChange={handleFileChange} required />
          </div>

          <div className="form-wrapper44">
            <div className="form-group44">
              <label>Recruiter Name:</label>
              <input
                type="text"
                name="recruiterName"
                value={formData.recruiterName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group44">
              <label>Password:</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group44">
              <label>Date of Birth:</label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group44">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group44">
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group44">
              <label>Company Name:</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group44">
              <label>Company Address:</label>
              <input
                type="text"
                name="companyAddress"
                value={formData.companyAddress}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group44">
            <label>About Company:</label>
            <textarea
              name="aboutCompany"
              value={formData.aboutCompany}
              onChange={handleInputChange}
              required
            />
          </div>

          <button className="btn144" type="submit">Sign Up</button>
        </form>

        {error && <p className="error-message44">{error}</p>}
      </div>
    </div>
  );
};

export default FreelancerSignupPage;

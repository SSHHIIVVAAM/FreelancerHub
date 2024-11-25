import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./FreelancerSignupPage.css"
import rocket from "../../../assets/recruiter/rocket.svg";

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
    <div className="container-fluid vh-100 ">
      <div className="row h-100">
        {/* Left Section */}
        <div className="col-md-6 d-flex align-items-center justify-content-center text-white MainSign">
          <div className="joinSign">
          <img src={rocket} alt="Icon" width="80" height="80" className="rock" />
            <h1 className="display-4">Join Recruiter Hub</h1>
            <p className="lead leadSignup leadSign">
              Find the best talent or become a part of something bigger.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6 d-flex align-items-center ">
          <div className="container">
            <h1 className="text-center mb-4 signh1">Sign Up</h1>
            <form onSubmit={handleSubmit}>
              {/* Profile Picture */}
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

              {/* Recruiter Name */}
              <div className="mb-3">
                <label htmlFor="recruiterName" className="form-label">
                  Recruiter Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="recruiterName"
                  name="recruiterName"
                  value={formData.recruiterName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-3">
                <label htmlFor="dob" className="form-label">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="mb-3">
                <label htmlFor="phoneNumber" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Company Name */}
              <div className="mb-3">
                <label htmlFor="companyName" className="form-label">
                  Company Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Company Address */}
              <div className="mb-3">
                <label htmlFor="companyAddress" className="form-label">
                  Company Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="companyAddress"
                  name="companyAddress"
                  value={formData.companyAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* About Company */}
              <div className="mb-3">
                <label htmlFor="aboutCompany" className="form-label">
                  About Company
                </label>
                <textarea
                  className="form-control"
                  id="aboutCompany"
                  name="aboutCompany"
                  rows="3"
                  value={formData.aboutCompany}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn w-100 btnsign1">
                Sign Up
              </button>
            </form>

            {error && <p className="text-danger mt-3">{error}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreelancerSignupPage;

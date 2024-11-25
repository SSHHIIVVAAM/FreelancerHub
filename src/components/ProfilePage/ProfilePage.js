import React, { useEffect, useState, useCallback } from "react";
import "./ProfilePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  const [recruiter, setRecruiter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicChanged, setProfilePicChanged] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const recruiterId = localStorage.getItem("recruiterId");

  const fetchRecruiterData = useCallback(() => {
    if (recruiterId) {
      fetch(
        `http://localhost:5022/api/Recruiter/GetRecruiterById?recruiterId=${recruiterId}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.statusCode === 200) {
            setRecruiter(data.data);
            setProfilePicUrl(data.data.profilePicUrl);
          } else {
            console.error("Error fetching recruiter data:", data.message);
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [recruiterId]);

  useEffect(() => {
    fetchRecruiterData();
  }, [recruiterId, fetchRecruiterData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecruiter({ ...recruiter, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicUrl(reader.result);
        setProfilePicChanged(true);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append("RecruiterId", recruiter.recruiterId);
    formData.append("RecruiterName", recruiter.recruiterName);
    formData.append("Password", recruiter.password);
    formData.append("Email", recruiter.email);
    formData.append("PhoneNumber", recruiter.phoneNumber);
    formData.append("DOB", recruiter.dob);
    formData.append("CompanyName", recruiter.companyName);
    formData.append("CompanyAddress", recruiter.companyAddress);
    formData.append("AboutCompany", recruiter.aboutCompany);
    if (profilePicChanged) {
      formData.append("ProfilePic", newProfilePic);
    }

    fetch(`http://localhost:5022/api/Recruiter/AddRecruiter`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          alert("Profile updated successfully!");
          setIsEditing(false);
          setTimeout(() => {
            fetchRecruiterData();
          }, 3000);
        } else {
          console.error("Error updating profile:", data.message);
        }
      })
      .catch((error) => console.error("Update error:", error));
  };

  if (!recruiter) return <p>Loading...</p>;

  return (
    <div className="profilePage1">
      <div className="profile-card">
        <div className="container">
          <div className="row align-items-start">
            {/* Left Column - Recruiter Information */}
            <div className=" row profile-header">
              <h2>My Profile</h2>{" "}
              {/* Add this line for My Profile text inside the profile card */}
            </div>
            <div className="col-md-7 contentt">
              {isEditing ? (
                <>
                  <div className="info-div">
                    <label htmlFor="recruiterName" className="label-grey">
                      Name
                    </label>
                    <input
                      type="text"
                      id="recruiterName"
                      name="recruiterName"
                      value={recruiter.recruiterName}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-div">
                    <label htmlFor="email" className="label-grey">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={recruiter.email}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-div">
                    <label htmlFor="phoneNumber" className="label-grey">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phoneNumber"
                      name="phoneNumber"
                      value={recruiter.phoneNumber}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-div">
                    <label htmlFor="dob" className="label-grey">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      id="dob"
                      name="dob"
                      value={
                        new Date(recruiter.dob).toISOString().split("T")[0]
                      }
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-div">
                    <label htmlFor="companyName" className="label-grey">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={recruiter.companyName}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-div">
                    <label htmlFor="companyAddress" className="label-grey">
                      Company Address
                    </label>
                    <textarea
                      id="companyAddress"
                      name="companyAddress"
                      value={recruiter.companyAddress}
                      onChange={handleChange}
                      className="edit-textarea"
                    />
                  </div>
                  <div className="info-div">
                    <label htmlFor="aboutCompany" className="label-grey">
                      About Company
                    </label>
                    <textarea
                      id="aboutCompany"
                      name="aboutCompany"
                      value={recruiter.aboutCompany}
                      onChange={handleChange}
                      className="edit-textarea"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="info-div">
                    <label className="label-grey">Email</label>
                    <p>{recruiter.email}</p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">Phone</label>
                    <p>{recruiter.phoneNumber}</p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">Date of Birth</label>
                    <p>{new Date(recruiter.dob).toLocaleDateString("en-GB")}</p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">Member Since</label>
                    <p>
                      {new Date(recruiter.createdAt).toLocaleDateString(
                        "en-GB"
                      )}
                    </p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">Company Name</label>
                    <p>{recruiter.companyName}</p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">Address</label>
                    <p>{recruiter.companyAddress}</p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">About</label>
                    <p>{recruiter.aboutCompany}</p>
                  </div>
                </>
              )}
            </div>

            {/* Right Column - Profile Picture, Name, and Edit Button */}
            <div className="col-md-5 text-center profile-section">
              <img
                src={profilePicUrl}
                alt="Profile"
                className="profile-pic mb-3"
                onClick={() => document.getElementById("fileInput").click()}
              />
              <input
                type="file"
                id="fileInput"
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="name mb-2">{recruiter.recruiterName}</div>
              {isEditing ? (
                <>
                  <div className="action-button">
                    <button
                      className="btn btn-dark custom-button"
                      onClick={handleUpdate}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-outline-dark custom-button"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="action-button">
                    <button
                      className="btn btn-dark custom-button"
                      onClick={() => setIsEditing(true)}
                    >
                      Edit
                    </button>
                    <button className="btn btn-outline-dark custom-button">
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

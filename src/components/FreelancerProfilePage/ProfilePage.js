import React, { useEffect, useState, useCallback } from "react";
import "./ProfilePage.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfilePage = () => {
  const [freelancer, setFreelancer] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [profilePicChanged, setProfilePicChanged] = useState(false);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [newProfilePic, setNewProfilePic] = useState(null);
  const freelancerId = localStorage.getItem("freelancerId");

  const fetchFreelancerData = useCallback(() => {
    if (freelancerId) {
      fetch(
        `http://localhost:5022/api/Freelancer/GetFreelancerById?freelancerId=${freelancerId}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.statusCode === 200) {
            setFreelancer(data.data);
            setProfilePicUrl(data.data.profilePicUrl);
          } else {
            console.error("Error fetching freelancer data:", data.message);
          }
        })
        .catch((error) => console.error("Fetch error:", error));
    }
  }, [freelancerId]);

  useEffect(() => {
    fetchFreelancerData();
  }, [freelancerId, fetchFreelancerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFreelancer({ ...freelancer, [name]: value });
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
    formData.append("FreelancerId", freelancer.freelancerId);
    formData.append("FreelancerName", freelancer.freelancerName);
    formData.append("Password", freelancer.password);
    formData.append("Email", freelancer.email);
    formData.append("PhoneNumber", freelancer.phoneNumber);
    formData.append("DOB", freelancer.dob);
    formData.append("Skills", freelancer.skills);
    formData.append("Role", freelancer.role);
    if (profilePicChanged) {
      formData.append("ProfilePic", newProfilePic);
    }

    fetch(`http://localhost:5022/api/Freelancer/AddFreelancer`, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.statusCode === 200) {
          alert("Profile updated successfully!");
          setIsEditing(false);
          setTimeout(() => {
            fetchFreelancerData();
          }, 3000);
        } else {
          console.error("Error updating profile:", data.message);
        }
      })
      .catch((error) => console.error("Update error:", error));
  };

  if (!freelancer) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <div className="container">
          <div className="row align-items-start">
            {/* Left Column - Freelancer Information */}
            <div className=" row profile-header">
              <h2>My Profile</h2>
            </div>
            <div className="col-md-7 contentt">
              {isEditing ? (
                <>
                  <div className="info-div">
                    <label htmlFor="freelancerName" className="label-grey">
                      Name
                    </label>
                    <input
                      type="text"
                      id="freelancerName"
                      name="freelancerName"
                      value={freelancer.freelancerName}
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
                      value={freelancer.email}
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
                      value={freelancer.phoneNumber}
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
                        new Date(freelancer.dob).toISOString().split("T")[0]
                      }
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-div">
                    <label htmlFor="skills" className="label-grey">
                      Skills
                    </label>
                    <input
                      type="text"
                      id="skills"
                      name="skills"
                      value={freelancer.skills}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                  <div className="info-div">
                    <label htmlFor="role" className="label-grey">
                      Role
                    </label>
                    <input
                      type="text"
                      id="role"
                      name="role"
                      value={freelancer.role}
                      onChange={handleChange}
                      className="edit-input"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="info-div">
                    <label className="label-grey">Email</label>
                    <p>{freelancer.email}</p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">Phone</label>
                    <p>{freelancer.phoneNumber}</p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">Date of Birth</label>
                    <p>{new Date(freelancer.dob).toLocaleDateString("en-GB")}</p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">Skills</label>
                    <p>{freelancer.skills}</p>
                  </div>
                  <div className="info-div">
                    <label className="label-grey">Role</label>
                    <p>{freelancer.role}</p>
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
              <div className="name mb-2">{freelancer.freelancerName}</div>
              {isEditing ? (
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
              ) : (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

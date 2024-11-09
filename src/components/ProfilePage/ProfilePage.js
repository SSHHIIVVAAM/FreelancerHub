import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [recruiter, setRecruiter] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const recruiterId = localStorage.getItem("recruiterId");

  // Function to fetch recruiter data
  useEffect(() => {
    if (recruiterId) {
      fetch(`http://localhost:5022/api/Recruiter/GetRecruiterById?recruiterId=${recruiterId}`)
        .then(response => response.json())
        .then(data => {
          if (data.statusCode === 200) {
            setRecruiter(data.data);
          } else {
            console.error("Error fetching recruiter data:", data.message);
          }
        })
        .catch(error => console.error("Fetch error:", error));
    }
  }, [recruiterId]);

  // Function to handle changes in input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecruiter({ ...recruiter, [name]: value });
  };

  // Function to save updated details
  const handleUpdate = () => {
    fetch(`http://localhost:5022/api/Recruiter/UpdateRecruiter`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recruiter)
    })
    .then(response => response.json())
    .then(data => {
      if (data.statusCode === 200) {
        alert("Profile updated successfully!");
        setIsEditing(false);
      } else {
        console.error("Error updating profile:", data.message);
      }
    })
    .catch(error => console.error("Update error:", error));
  };

  if (!recruiter) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={recruiter.profilePicUrl} alt="Profile" className="profile-pic" />
        {isEditing ? (
          <>
            <input
              type="text"
              name="recruiterName"
              value={recruiter.recruiterName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              value={recruiter.email}
              onChange={handleChange}
            />
            <input
              type="tel"
              name="phoneNumber"
              value={recruiter.phoneNumber}
              onChange={handleChange}
            />
            <input
              type="date"
              name="dob"
              value={recruiter.dob}
              onChange={handleChange}
            />
            <input
              type="text"
              name="companyName"
              value={recruiter.companyName}
              onChange={handleChange}
            />
            <textarea
              name="companyAddress"
              value={recruiter.companyAddress}
              onChange={handleChange}
            />
            <textarea
              name="aboutCompany"
              value={recruiter.aboutCompany}
              onChange={handleChange}
            />
          </>
        ) : (
          <>
            <h2>{recruiter.recruiterName}</h2>
            <p><strong>Email:</strong> {recruiter.email}</p>
            <p><strong>Phone:</strong> {recruiter.phoneNumber}</p>
            <p><strong>Date of Birth:</strong> {new Date(recruiter.dob).toLocaleDateString()}</p>
            <h3>Company Information</h3>
            <p><strong>Name:</strong> {recruiter.companyName}</p>
            <p><strong>Address:</strong> {recruiter.companyAddress}</p>
            <p><strong>About:</strong> {recruiter.aboutCompany}</p>
            <p><strong>Member Since:</strong> {new Date(recruiter.createdAt).toLocaleDateString()}</p>
          </>
        )}

        {isEditing ? (
          <>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

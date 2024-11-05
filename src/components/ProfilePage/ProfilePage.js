import React, { useEffect, useState } from 'react';
import './ProfilePage.css'; // Import CSS for styling

const ProfilePage = () => {
  const [recruiter, setRecruiter] = useState(null);
  const recruiterId = localStorage.getItem("recruiterId");

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

  if (!recruiter) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <div className="profile-card">
        <img src={recruiter.profilePicUrl} alt="Profile" className="profile-pic" />
        <h2>{recruiter.recruiterName}</h2>
        <p><strong>Email:</strong> {recruiter.email}</p>
        <p><strong>Phone:</strong> {recruiter.phoneNumber}</p>
        <p><strong>Date of Birth:</strong> {new Date(recruiter.dob).toLocaleDateString()}</p>
        <h3>Company Information</h3>
        <p><strong>Name:</strong> {recruiter.companyName}</p>
        <p><strong>Address:</strong> {recruiter.companyAddress}</p>
        <p><strong>About:</strong> {recruiter.aboutCompany}</p>
        <p><strong>Member Since:</strong> {new Date(recruiter.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default ProfilePage;

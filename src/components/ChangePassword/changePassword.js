import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const ChangePassword = () => {
  const recruiterId = localStorage.getItem("recruiterId");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(true);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) {
      setError("Email is required to send OTP.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5022/api/Recruiter/SendOtp?email=${encodeURIComponent(
          email
        )}&recruiterId=${recruiterId}`,
        {
          method: "POST",
          headers: { Accept: "text/plain" },
        }
      );
      const data = await response.json();
      if (response.ok && data.statusCode === 200) {
        setMessage("OTP sent successfully. Please check your email.");
        setError("");
        setShowModal(false); // Close modal after successful OTP send
      } else {
        setError(data.message || "Failed to send OTP.");
        setMessage("");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setMessage("");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!email || !otp || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:5022/api/Recruiter/ChangePassword?recruiterId=${recruiterId}&email=${encodeURIComponent(
          email
        )}&otp=${otp}&newpassword=${encodeURIComponent(newPassword)}`,
        {
          method: "POST",
          headers: { Accept: "text/plain" },
        }
      );
      const data = await response.json();
      if (response.ok && data.statusCode === 200) {
        setMessage("Password updated successfully.");
        setError("");
        navigate("/login");
      } else {
        setError(data.message || "Failed to update password.");
        setMessage("");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
      setMessage("");
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="row shadow-lg bg-white rounded w-75">
        {/* Left Section */}
        <div className="col-lg-6 d-flex flex-column justify-content-center align-items-center text-center p-4 bg-primary text-white">
          <h1 className="mb-4">Reset Your Password</h1>
          <p>Secure your account with a new password.</p>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 p-5">
          <h2 className="text-center mb-4">Change Password</h2>
          {message && <div className="alert alert-success">{message}</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleChangePassword}>
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
            <div className="mb-3">
              <label htmlFor="otp" className="form-label">
                OTP
              </label>
              <input
                type="text"
                id="otp"
                className="form-control"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="newPassword" className="form-label">
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                className="form-control"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mb-3">
              Update Password
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="otpModalLabel"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="otpModalLabel">
                  Send OTP
                </h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSendOtp}>
                  <div className="mb-3">
                    <label htmlFor="emailForOtp" className="form-label">
                      Enter your email to receive OTP
                    </label>
                    <input
                      type="email"
                      id="emailForOtp"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="text-center">
                    <button type="submit" className="btn btn-primary">
                      Send OTP
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChangePassword;

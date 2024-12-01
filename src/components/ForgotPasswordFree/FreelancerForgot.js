import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FreelancerForgot.css"; // Ensure your CSS file is imported

const ChangePasswordFreelancer = () => {
  const freelancerId = localStorage.getItem("freelancerId");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setOtpError("");
    setMessage("");

    if (!email) {
      setOtpError("Email is required to send OTP.");
      return;
    }

    setIsLoading(true);
    try {
      const encodedEmail = encodeURIComponent(email);
      const url = `http://localhost:5022/api/Freelancer/SendOtp?email=${encodedEmail}&freelancerId=${freelancerId}`;

      const response = await fetch(url, { method: "GET" });

      const data = await response.json();
      if (response.ok && data.statusCode === 200) {
        setMessage("OTP sent successfully. Please check your email.");
        setShowModal(false);
      } else {
        setOtpError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setOtpError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email || !otp || !newPassword || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5022/api/Freelancer/ChangePassword`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ freelancerId, email, otp, newPassword }),
        }
      );

      const data = await response.json();
      if (response.ok && data.statusCode === 200) {
        setMessage("Password updated successfully.");
        navigate("/FreelancerLogin"); // Navigate to FreelancerLogin page
      } else {
        setError(data.message || "Failed to update password.");
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={`container-fluid vh-100 d-flex align-items-center justify-content-center bg-light ${
        showModal ? "blurred-background" : ""
      }`}
    >
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
            <button
              type="submit"
              className="btn btn-primary w-100 mb-3"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>

      {/* OTP Modal */}
      {showModal && (
        <div
          className="modal show d-flex justify-content-center align-items-center"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="otpModalLabel"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="otpModalLabel">
                  Send OTP
                </h5>
              </div>
              <div className="modal-body">
                {otpError && (
                  <div className="alert alert-danger text-center">
                    {otpError}
                  </div>
                )}
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
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? "Sending..." : "Send OTP"}
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

export default ChangePasswordFreelancer;

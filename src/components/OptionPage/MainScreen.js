import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import FreelancerImage from "../../assets/freelancerBack1.jpg";
import "./MainScreen.css"

const MainScreen = () => {
  const navigate = useNavigate();

  const handleSelection = (role) => {
    if (role === "freelancer") {
      navigate("/freelancer-home");
    } else {
      navigate("/client-home");
    }
  };

  return (
    <div className="container-fluid py-5 bg-light">
      <div className="row align-items-center">
        {/* Left Section with Image */}
        <div className="col-md-6 text-center">
          <img
            src={FreelancerImage}
            alt="Freelancer Hub"
            className="img-fluid imgy"
            style={{ maxWidth: "80%" }}
          />
        </div>

        {/* Right Section with Content */}
        <div className="col-md-6">
          <h1 className="display-4 fw-bold mb-4">
            Welcome To FreelancerHUB
          </h1>
          <p className="text-muted mb-4 txt01">
          Job searchers can use optimistic affirmations, success visualisation, and a positive peer group. Job searchers may enhance their confidence and keep a positive mindset during the hiring process by concentrating on their accomplishments and qualities.
          </p>
          <p className="text-muted">
          Finding a job may be a demanding and challenging process. Yet it's crucial to keep in mind that difficulties and failures are a normal part of the trip. To succeed, it is essential to maintain motivation and conquer these obstacles. In this post, we'll talk about how crucial it is to get beyond setbacks when looking for work and offer a selection of inspirational quotations to help readers maintain their resolve.
          </p>
          <div className="d-flex gap-3 mt-4">
            <button
              onClick={() => handleSelection("freelancer")}
              className="btn btn-primary btn-lg"
            >
              Recruiter Hub
            </button>
            <button
              onClick={() => handleSelection("client")}
              className="btn btn-outline-primary btn-lg"
            >
              Freelancer Hub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainScreen;

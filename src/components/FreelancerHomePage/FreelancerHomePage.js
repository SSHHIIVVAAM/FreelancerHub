import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate for page navigation
import "./FreelancerHomePage.css";

const FreelancerHomePage = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook for navigation
  const [jobs, setJobs] = useState([]);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    jobtitle: "",
    skill: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [popupMessage, setPopupMessage] = useState("");

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const query = `pageIndex=${pageIndex}&pageSize=${pageSize}&jobtitle=${filters.jobtitle}&skill=${filters.skill}&category=${filters.category}`;
      const response = await fetch(`http://localhost:5022/api/Freelancer/GetAllJobs?${query}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const result = await response.json();

      if (result.statusCode === 200) {
        setJobs(result.data.result);
        setTotalPages(result.data.totalPages);
      } else {
        console.error("Error fetching jobs:", result.message);
        setJobs([]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [pageIndex]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilters = () => {
    setPageIndex(1); // Reset to the first page when applying filters
    fetchJobs();
  };

  const clearFilters = () => {
    setFilters({ jobtitle: "", skill: "", category: "" }); // Reset filters
    setPageIndex(1); // Reset to the first page
    fetchJobs(); // Fetch jobs without filters
  };

  const handlePageChange = (direction) => {
    if (direction === "prev" && pageIndex > 1) {
      setPageIndex(pageIndex - 1);
    } else if (direction === "next" && pageIndex < totalPages) {
      setPageIndex(pageIndex + 1);
    }
  };

  const openPopup = (proposalId, recruiterId) => {
    setPopupOpen(true);
    setPopupData({ proposalId, recruiterId });
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupMessage("");
    setPopupData(null);
  };

  const submitApplication = async () => {
    const freelancerId = localStorage.getItem("freelancerId"); // Get freelancerId from local storage
    if (!freelancerId) {
      setFeedbackMessage("Error: Freelancer ID not found in local storage.");
      return;
    }

    const requestBody = {
      proposalId: popupData.proposalId,
      freelancerId,
      recruiterId: popupData.recruiterId,
      message: popupMessage,
    };

    try {
      const response = await fetch("http://localhost:5022/api/Freelancer/Apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/plain",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (result.statusCode === 200) {
        setFeedbackMessage("Application Submitted Successfully!");
      } else {
        setFeedbackMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error("Error applying for job:", error);
      setFeedbackMessage("Error applying for job. Please try again later.");
    } finally {
      closePopup();
    }
  };

  const isFilterApplied = filters.jobtitle || filters.skill || filters.category;

  const navigateToApplications = () => {
    navigate("/AppliedJobPage");  // Navigate to the Applied Job Page
  };

  return (
    <div className="freelancer-home66">
      {/* Navbar */}
      <nav className="navbar66">
        <span className="navbar-title66">Freelancer</span>
        <button className="logout-btn66">Logout</button>
        <button className="logout-btn66" onClick={navigateToApplications}>
          Applications
        </button>
      </nav>

      {/* Image Section */}
      <div className="image-section66">
        <img
          src="https://via.placeholder.com/400" // Replace with your desired image URL
          alt="Freelancer Hub"
          className="hero-image66"
        />
      </div>

      {/* Filter Bar */}
      <div className="filter-container66">
        <input
          type="text"
          name="jobtitle"
          placeholder="Filter by Job Title"
          value={filters.jobtitle}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="skill"
          placeholder="Filter by Skill"
          value={filters.skill}
          onChange={handleFilterChange}
        />
        <input
          type="text"
          name="category"
          placeholder="Filter by Category"
          value={filters.category}
          onChange={handleFilterChange}
        />
        <button onClick={applyFilters}>Apply Filters</button>
        {isFilterApplied && (
          <button className="clear-filters66" onClick={clearFilters} title="Clear Filters">
            ✖
          </button>
        )}
      </div>

      {/* Feedback Message */}
      {feedbackMessage && <p className="feedback-message66">{feedbackMessage}</p>}

      {/* Job List */}
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="job-list66">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.proposalId} className="job-card66">
                <h3>{job.title}</h3>
                <p>{job.description}</p>
                <p>
                  <strong>Category:</strong> {job.category}
                </p>
                <p>
                  <strong>Budget:</strong> ${job.budget}
                </p>
                <p>
                  <strong>Skills Required:</strong> {job.skillsRequired}
                </p>
                <p>
                  <strong>Duration:</strong> {job.durationInDays} days
                </p>
                <button
                  className="apply-btn66"
                  onClick={() => openPopup(job.proposalId, job.recruiterId)}
                >
                  Apply
                </button>
              </div>
            ))
          ) : (
            <p>No jobs found matching the filters.</p>
          )}
        </div>
      )}

      {/* Pagination */}
      <div className="pagination66">
        <button disabled={pageIndex === 1} onClick={() => handlePageChange("prev")}>
          Previous
        </button>
        <span>
          Page {pageIndex} of {totalPages}
        </span>
        <button disabled={pageIndex === totalPages} onClick={() => handlePageChange("next")}>
          Next
        </button>
      </div>

      {/* Popup */}
      {popupOpen && (
        <div className="popup66">
          <div className="popup-content66">
            <h3>Submit Application</h3>
            <textarea
              placeholder="Enter your message"
              value={popupMessage}
              onChange={(e) => setPopupMessage(e.target.value)}
            ></textarea>
            <button onClick={submitApplication}>Submit</button>
            <button onClick={closePopup} className="close-popup66">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FreelancerHomePage;
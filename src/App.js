// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoScreen from "./components/LogoScreen/LogoScreen";
import MainScreen from "./components/OptionPage/MainScreen";
import LoginPage from "./components/Login/signupFreelancer/LoginPage";
import FreelancerMain from "./components/FreelancerMain/FreelancerMain";
import ClientMain from "./components/ClientMain/ClientMain";
import FreelancerLoginPage from "./components/Login/signupFreelancer/LoginPage";
import FreelancerSignupPage from "./components/Login/signupFreelancer/FreelancerSignupPage";
import FreelancerMainPage from "./components/FreeHomePage/FreelancerMainPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import BrowseJobsPage from "./components/BrowseJobs/BrowseJob"; // Import the new page
import SignUpFreelancer1 from "./components/FreelancerSignUp/FreelancerSignUp"; // Import the new page
import FreelancerLogin from "./components/FreelancerLogin/FreelancerLogin";
import FreelancerProfilePage from "./components/FreelancerProfilePage/ProfilePage";
import FreelancerHomePage from "./components/FreelancerHomePage/FreelancerHomePage";
import AppliedJobPage from "./components/AppliedJobsPage/AppliedJobsPage";
import GetAllFreelancers from "./components/GetAllFreelancers/GetAllFreelancers";
import ApplicationsPage from "./components/ApplicationsPage/ApplicationsPage";
import ForgotPassword from "./components/ChangePassword/changePassword";
import FreelancerChnPassword from "./components/ForgotPasswordFree/FreelancerForgot";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoScreen />} />
        <Route path="/home" element={<MainScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/freelancer-home" element={<FreelancerMain />} />
        <Route path="/client-home" element={<ClientMain />} />
        <Route path="/freelancer-login" element={<FreelancerLoginPage />} />
        <Route path="/freelancer-signup" element={<FreelancerSignupPage />} />
        <Route path="/freelancer-main" element={<FreelancerMainPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/browse-jobs" element={<BrowseJobsPage />} /> {/* New route */}
        <Route path="/SignUp-Freelancer" element={<SignUpFreelancer1 />} /> {/* New route */}
        <Route path="/FreelancerLogin" element={<FreelancerLogin />} /> {/* New route */}
        <Route path="/FreelancerProfilePage" element={<FreelancerProfilePage />} /> {/* New route */}
        <Route path="/FreelancerHomePage" element={<FreelancerHomePage />} /> {/* New route */}
        <Route path="/AppliedJobPage" element={<AppliedJobPage />} /> {/* New route */}
        <Route path="/GetAllFreelancers" element={<GetAllFreelancers />} /> {/* New route */}
        <Route path="/applications/:proposalId" element={<ApplicationsPage />} /> {/* New route */}
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* New route */}
        <Route path="/change-password" element={<FreelancerChnPassword />} /> {/* New route */}
      </Routes>
    </Router>
  );
};

export default App;

// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LogoScreen from "./components/LogoScreen/LogoScreen";
import MainScreen from "./components/MainScreen/MainScreen";
import LoginPage from "./components/Login/signupFreelancer/LoginPage";
import SignupPage from "./components/SignUp/SignupPage";
import FreelancerMain from "./components/FreelancerMain/FreelancerMain";
import ClientMain from "./components/ClientMain/ClientMain";
import FreelancerLoginPage from "./components/Login/signupFreelancer/LoginPage";
import FreelancerSignupPage from "./components/Login/signupFreelancer/FreelancerSignupPage";
import FreelancerMainPage from "./components/FreeHomePage/FreelancerMainPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogoScreen />} />
        <Route path="/home" element={<MainScreen />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/freelancer-home" element={<FreelancerMain />} />
        <Route path="/client-home" element={<ClientMain />} />
        <Route path="/freelancer-login" element={<FreelancerLoginPage />} />
        <Route path="/freelancer-signup" element={<FreelancerSignupPage />} />
        <Route path="/freelancer-main" element={<FreelancerMainPage />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;

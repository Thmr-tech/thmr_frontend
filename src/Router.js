import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import AboutUs from "./components/pages/AboutUs";
import Blog from "./components/Blog";
import UserProfile from "./components/UserProfile";
import JobApplication from "./components/JobApplication";
import AccountActivate from "./components/auth/AccountActivate";
import PasswordForget from "./components/auth/PasswordForget";
import PasswordReset from "./components/auth/PasswordReset";

const Router = () => {
    const location = useLocation();
    const showHeader = !(location.pathname === '/register' || location.pathname === '/login');

    return (
        <div>
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/jobs" element={<JobApplication />} />
                <Route path="/activate/:uid/:token" element={<AccountActivate />} />
                <Route path="/forget-password" element={<PasswordForget />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<PasswordReset />} />
            </Routes>
        </div>
    );
};


export default Router;

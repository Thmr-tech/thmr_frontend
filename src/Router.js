import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/pages/Home";
import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Header from "./components/Header";
import AboutUs from "./components/pages/AboutUs";
import Blog from "./components/Blog";

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
            </Routes>
        </div>
    );
};


export default Router;

import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Header from "./components/Header";
import PasswordForget from "./components/PasswordForget";
import PasswordReset from "./components/PasswordReset";
import AccountActivate from "./components/AccountActivate";
import TodoPage from "./components/TodoPage";

const Router = () => {
    const location = useLocation();
    const showHeader = !(location.pathname === '/register' || location.pathname === '/login' || location.pathname === '/forget-password' || location.pathname === '/password/reset/confirm/:uid/:token');

    return (
        <div>
            {showHeader && <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<PasswordForget />} />
                <Route path="/password/reset/confirm/:uid/:token" element={<PasswordReset />} />
                <Route path="/activate/:uid/:token" element={<AccountActivate />} />
                <Route path="/todos" element={<TodoPage />} />
            </Routes>
        </div>
    );
};


export default Router;

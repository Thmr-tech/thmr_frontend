import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import logo from "../assets/images/logo.png";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOutUser } = useAuth();

    return (
        <div className="absolute w-full max-w-[1890px] mx-auto z-10 px-4 py-3 lg:py-5 lg:px-10">
            <div className="relative flex justify-between items-center">
                <Link to="/" className="w-[100px]">
                    <img alt="" src={logo} className="w-[90px] lg:w-[120px]" />
                </Link>

                <div className="hidden lg:gap-6 lg:text-white lg:flex">
                    <NavLink to="/jobs" className={({ isActive }) =>
                        `relative font-semibold hover:text-customBlue group ${isActive ? "text-customBlue" : ""}`}>
                        الوظائف
                        <span
                            className="absolute left-0 right-0 -bottom-2 h-[2px] bg-customBlue scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </NavLink>
                    <NavLink to="/aboutus" className={({ isActive }) =>
                        `relative font-semibold hover:text-customBlue group ${isActive ? "text-customBlue" : ""}`}>
                        من نحن
                        <span
                            className="absolute left-0 right-0 -bottom-2 h-[2px] bg-customBlue scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </NavLink>
                    <NavLink to="/blog" className={({ isActive }) =>
                        `relative font-semibold hover:text-customBlue group ${isActive ? "text-customBlue" : ""}`}>
                        المدونة
                        <span
                            className="absolute left-0 right-0 -bottom-2 h-[2px] bg-customBlue scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </NavLink>
                    <NavLink to="/" className={({ isActive }) =>
                        `relative font-semibold hover:text-customBlue group ${isActive ? "text-customBlue" : ""}`}>
                        الرئيسية
                        <span
                            className="absolute left-0 right-0 -bottom-2 h-[2px] bg-customBlue scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                    </NavLink>
                </div>

                {/* Burger Icon */}
                <button
                    className="text-3xl flex text-white lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>

                {/* Dropdown Menu */}
                <div
                    className={`${isMenuOpen ? "flex" : "hidden"
                        } absolute w-full shadow-lg flex-col p-3 text-center rounded-xl bg-[#fcfcfc] top-[53px] gap-3 lg:gap-6 lg:static lg:flex lg:flex-row lg:shadow-none lg:bg-transparent lg:w-auto lg:p-0 lg:text-white lg:font-bold`}>
                    <Link to="/" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        الرئيسية
                    </Link>
                    <hr className="lg:hidden"/>
                    <Link to="/aboutus" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        من نحن
                    </Link>
                    <hr className="lg:hidden"/>
                    <Link to="/blog" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        المدونة
                    </Link>
                    <hr className="lg:hidden"/>
                    <Link to="/jobs" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        الوظائف
                    </Link>
                    <hr className="lg:hidden"/>
                    {user ? (
                        <>
                            <Link to="/profile" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                حسابي
                            </Link>
                            <hr className="lg:hidden"/>
                            <button onClick={() => { signOutUser(); setIsMenuOpen(!isMenuOpen); }}>
                                تسجيل خروج
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                تسجيل الدخول
                            </Link>
                            <hr className="lg:hidden"/>
                            <Link to="/register" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                التسجيل
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

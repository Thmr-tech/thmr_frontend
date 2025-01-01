import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import logo from "../assets/images/logo.png";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, signOutUser } = useAuth();

    return (
        <div className="absolute z-10 w-full px-2 py-0 lg:py-5 lg:px-10">
            <div className="relative flex justify-between items-center">
                <Link to="/" className="pt-3 w-[140px]">
                    <img src={logo} className="w-[180px]" />
                </Link>

                <div className="hidden gap-6 text-white lg:flex">
                    <NavLink to="/aboutus"
                        className={({ isActive }) =>
                            `hover:text-customBlue font-bold hover:border-b-2 border-customBlue pb-1 ${isActive ? "text-customBlue border-b-2 border-customBlue" : ""
                            }`
                        }>
                        من نحن
                    </NavLink>
                    <NavLink to="/blog"
                        className={({ isActive }) =>
                            `hover:text-customBlue font-bold hover:border-b-2 border-customBlue pb-1 ${isActive ? "text-customBlue border-b-2 border-customBlue" : ""
                            }`
                        }>
                        المدونة
                    </NavLink>
                    <NavLink to="/"
                        className={({ isActive }) =>
                            `hover:text-customBlue font-bold hover:border-b-2 border-customBlue pb-1 ${isActive ? "text-customBlue border-b-2 border-customBlue" : ""
                            }`
                        }>
                        الرئيسية
                    </NavLink>
                </div>

                {/* Burger Icon */}
                <button
                    className="text-4xl flex justify-center items-center px-4 py-4 text-white lg:hidden"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? "✕" : "☰"}
                </button>

                {/* Dropdown Menu */}
                <div
                    className={`${isMenuOpen ? "flex" : "hidden"
                        } absolute w-full shadow-lg flex-col p-3 text-center rounded-xl bg-white z-10 top-20 gap-3 lg:static lg:flex lg:flex-row lg:shadow-none lg:bg-transparent lg:w-auto lg:p-0`}
                >
                    {user ? (
                        <>
                            <Link to="/" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                الرئيسية
                            </Link>
                            <hr />
                            <Link to="/aboutus" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                من نحن
                            </Link>
                            <hr />
                            <Link to="/blog" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                المدونة
                            </Link>
                            <hr />
                            <Link to="/profile" className="lg:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                حسابي
                            </Link>
                            <hr />
                            <button className="lg:text-white" 
                            onClick={() => { signOutUser(); setIsMenuOpen(!isMenuOpen); }}>
                                تسجيل خروج
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                الرئيسية
                            </Link>
                            <hr />
                            <Link to="/aboutus" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                من نحن
                            </Link>
                            <hr />
                            <Link to="/blog" className="lg:p-2 lg:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                المدونة
                            </Link>
                            <hr />
                            <Link to="/login" className="lg:text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                تسجيل الدخول
                            </Link>
                            <hr />
                            <Link to="/register" className="lg:text-white" 
                            onClick={() => { signOutUser(); setIsMenuOpen(!isMenuOpen); }}>
                                التسجيل
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

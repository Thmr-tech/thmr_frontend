import React, { useState, useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import axios from 'axios';


export default function Header() {
    const { authToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await axios.post('auth/token/logout', null, {
                headers: { 'Authorization': `Token ${authToken}` }
            });
            logout();
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error.response.data);
            }
        }
    };

    return (
        <div className="flex justify-between items-center px-4 py-4 md:px-16 lg:px-24 xl:px-48">
            <Link to="/" className="text-3xl font-extrabold text-blue-700 tracking-wider drop-shadow-lg">To Do</Link>

            {/* Burger Icon */}
            <button
                className="md:hidden text-2xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                ☰
            </button>

            {/* Dropdown Menu */}
            <ul
                className={`${isMenuOpen ? 'flex' : 'hidden'
                    } absolute right-4 top-12 bg-white shadow-lg flex-col p-3 text-center md:flex-row md:justify-center md:bg-transparent md:shadow-none md:flex md:static md:gap-3`}
            >
                {authToken ? (
                    <>
                        <Link className="md:border-2 md:border-black md:border-solid md:p-2 md:rounded-md md:font-['Roboto'] md:cursor-pointer" to="/todos">My To Do</Link>
                        <Link className="md:border-2 md:border-black md:border-solid md:p-2 md:rounded-md md:font-['Roboto'] md:cursor-pointer" to="/">Profile</Link>
                        <Link className="md:border-2 md:border-black md:border-solid md:p-2 md:rounded-md md:font-['Roboto'] md:cursor-pointer" onClick={handleLogout}>Log out</Link>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="md:border-2 md:border-black md:border-solid md:p-2 md:rounded-md md:font-['Roboto'] md:cursor-pointer">Sign Up</Link>
                        <Link to="/login" className="md:border-2 md:border-black md:border-solid md:p-2 md:rounded-md md:font-['Roboto'] md:cursor-pointer">Log in</Link>
                    </>
                )}
            </ul>
        </div>
    )
}

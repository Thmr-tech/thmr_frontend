import React, { useContext } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext';
import axios from 'axios';


export default function Header() {
    const { authToken, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onClick = async () => {
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
            <ul className='flex gap-3'>
                {authToken ? (
                    <>
                        <Link className='border-2 border-black border-solid p-2 rounded-md font-["Roboto"] cursor-pointer' to="/todos">My To Do</Link>
                        <Link className='border-2 border-black border-solid p-2 rounded-md font-["Roboto"] cursor-pointer' to="/">Profile</Link>
                        <button className='border-2 border-black border-solid p-2 rounded-md font-["Roboto"] cursor-pointer' onClick={onClick}>Log out</button>
                    </>
                ) : (
                    <>
                        <Link to="/register" className='border-2 border-black border-solid p-2 rounded-md font-["Roboto"] cursor-pointer'>Sign Up</Link>
                        <Link to="/login" className='border-2 border-black border-solid p-2 rounded-md font-["Roboto"] cursor-pointer'>Log in</Link>
                    </>
                )}
            </ul>
        </div>
    )
}

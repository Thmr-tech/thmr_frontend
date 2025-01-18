import React, { useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


export default function AccountActivate() {
    const { uid, token } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('auth/users/activation/', { uid, token });
                console.log(response, 'Account activated successfully');
            } catch (error) {
                console.error('Error activating account', error);
            }
        };
        fetchData();
    }, [uid, token]);

    return (
        <div className="flex flex-col items-center text-white text-xl text-center pt-28">
            <h1>تم تفعيل حسابك بنجاح . الان يمكنك تسجيل الدخول</h1>
            <Link className='p-2 bg-customBlue text-white rounded-md mt-2' to='/login'>تسجيل الدخول</Link>
        </div>
    );
}

import React from 'react';
import { useAuth } from "../components/context/AuthContext";


export default function UserProfile() {
    const { user } = useAuth();

    if (!user) {
        return <div className='text-right pt-32 text-white p-9'>تحميل...</div>; 
    }

    return (
        <div className='text-right pt-32 text-white p-9'>
            <p>مرحبا</p>
            <p>{user.displayName}</p>
        </div>
    )
}

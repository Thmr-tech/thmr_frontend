import React, { useState, useEffect } from 'react';
import { useAuth } from "../components/context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";


export default function UserProfile() {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState('');

    if (!user) {
        return <div className='text-center pt-32 text-white p-9'>تحميل...</div>;
    }

    // Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    async function addPostToDB(data) {
        try {
            const docRef = await addDoc(collection(db, "comments"), data);
            console.log("Document written with ID: ", docRef.id);
            return true;
        } catch (error) {
            console.error("Error adding document: ", error.message);
            return false;
        }
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFormStatus("");

        // Save form data to Firestore
        const success = await addPostToDB(formData);

        if (success) {
            setFormStatus("شكرا على تواصلك مع ثمر . سيتم الرد عليك قريبا");
            setFormData({ name: "", email: "", message: "" }); // Reset the form
        } else {
            setFormStatus("حدث خطأ غير متوقع . الرجاء المحاولة مرة اخرى");
        }
        setIsSubmitting(false);
    };

    return (
        <div className='pt-32 text-white container mx-auto'>
            <div className='text-xl pb-4 text-center font-bold'>
                <p>مرحبا</p>
                <p>{user.displayName}</p>
            </div>
            <hr />
            <p className='text-right pt-4 pr-4 font-bold'>: البيانات الشخصية</p>
            <form onSubmit={handleSubmit} className='mt-9 max-w-2xl mx-auto text-center' dir='rtl'>
                <div className='flex flex-wrap gap-3 justify-center'>
                    {/* First Name Input */}
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-[281px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue text-right"
                        placeholder='الأسم الآول'
                        required
                    />

                    {/* Last Name Input */}
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-[281px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue text-right"
                        placeholder='الاسم الأخير'
                        required
                    />

                    {/* city Input */}
                    <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-[281px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue text-right"
                        placeholder='المدينة'
                        required
                    />

                    {/* telephone Input */}
                    <input
                        type="number"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                        className="w-[281px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue text-right"
                        placeholder='رقم الهاتف'
                        required
                    />
                </div>

                {/* Submit Button */}
                <div className="mt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-[120px] py-2 px-4 font-semibold text-white rounded-md transition duration-300 focus:outline-none ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-customBlue'
                            }`}
                    >
                        {isSubmitting ? 'Sending...' : 'تحديث'}
                    </button>
                </div>

                {/* Form Status */}
                {formStatus && (
                    <div className="mt-4 text-center text-blue-700 font-semibold">
                        {formStatus}
                    </div>
                )}
            </form>
        </div>
    )
}

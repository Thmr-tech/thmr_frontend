import React, { useState, useEffect } from 'react';
import { auth, db } from "./firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function UserProfile() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        city: "",
        telephone: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state
    const [formStatus, setFormStatus] = useState("");
    const [userDisplayName, setUserDisplayName] = useState("");

    // Track user authentication state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUserDisplayName(user.displayName || "User");
                fetchUserProfile(user);
            } else {
                setUserDisplayName("User");
                setLoading(false); // Stop loading if no user is signed in
            }
        });

        return () => unsubscribe();
    }, []);

    const fetchUserProfile = async (user) => {
        setLoading(true); // Start loading
        try {
            const userProfileRef = doc(db, "userProfiles", user.uid);
            const userProfileSnap = await getDoc(userProfileRef);

            if (userProfileSnap.exists()) {
                setFormData(userProfileSnap.data());
            }
        } catch (error) {
            console.error("Error fetching user profile:", error.message);
        } finally {
            setLoading(false); // Stop loading when data is fetched
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const user = auth.currentUser;

        setIsSubmitting(true);

        try {
            const userProfileRef = doc(db, "userProfiles", user.uid);
            await setDoc(userProfileRef, {
                ...formData,
                email: user.email, // Store email for easy reference
                updatedAt: new Date(), // Optional: timestamp for when the profile was updated
            });

            setFormStatus("تم تحديث الملف الشخصي بنجاح !!");
        } catch (error) {
            console.error("Error updating profile:", error.message);
            setFormStatus("حدث خطأ .. يرجى المحاولة لاحقا");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='pt-32 container mx-auto'>
            <div className='text-xl text-customBlue pb-4 text-center font-bold'>
                <p>مرحبا</p>
                <p>{userDisplayName}</p>
            </div>
            <hr />
            <p className='text-right pt-4 pr-4 font-bold'>: البيانات الشخصية</p>

            {loading ? (
                // Show loading spinner or message while fetching data
                <div className="text-center py-8">
                    <div className="spinner border-t-4 border-white rounded-full w-16 h-16 mx-auto animate-spin"></div>
                    <p className="text-white mt-4 font-semibold">... جاري تحميل البيانات</p>
                </div>
            ) : (
                // Show the form when data is loaded
                <form onSubmit={handleProfileUpdate} className='mt-9 max-w-2xl mx-auto text-center' dir='rtl'>
                    <div className='flex flex-wrap gap-3 justify-center'>
                        {/* First Name Input */}
                        <div>
                            <label className="block mb-2 font-semibold text-right">الأسم الآول</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className="w-[281px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue text-right"
                            />
                        </div>

                        {/* Last Name Input */}
                        <div>
                            <label className="block mb-2 font-semibold text-right">الاسم الأخير</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className="w-[281px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue text-right"
                            />
                        </div>

                        {/* City Input */}
                        <div>
                            <label className="block mb-2 font-semibold text-right">المدينة</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="w-[281px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue text-right"
                            />
                        </div>

                        {/* Telephone Input */}
                        <div>
                            <label className="block mb-2 font-semibold text-right">رقم الهاتف</label>
                            <input
                                type="number"
                                id="telephone"
                                name="telephone"
                                value={formData.telephone}
                                onChange={handleInputChange}
                                className="w-[281px] px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-customBlue text-right"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-4">
                        <button
                            type="submit"
                            className={`w-[120px] py-2 px-4 font-semibold text-white rounded-md transition duration-300 focus:outline-none ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-customBlue'
                                }`}
                        >
                            {isSubmitting ? 'إرسال ...' : 'تحديث'}
                        </button>
                    </div>

                    {/* Form Status */}
                    {formStatus && (
                        <div className="mt-4 text-center text-blue-700 font-semibold">
                            {formStatus}
                        </div>
                    )}
                </form>
            )}
        </div>
    );
}

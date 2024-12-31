import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState('');

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
            setFormStatus("Your message has been sent successfully!");
            setFormData({ name: "", email: "", message: "" }); // Reset the form
        } else {
            setFormStatus("An error occurred. Please try again.");
        }

        setIsSubmitting(false);
    };

    return (
        <div className='bg-background_logo bg-no-repeat'>
            <div className="max-w-4xl mx-auto p-6 rounded-md mt-20 pt-[217px]">
                <h2 className="text-2xl font-semibold text-white text-center mb-6">تواصل معنا</h2>
                <form onSubmit={handleSubmit}>
                    {/* Name Input */}
                    <div className="mb-4">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                            placeholder='الأسم'
                            required
                        />
                    </div>

                    {/* Email Input */}
                    <div className="mb-4">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                            placeholder='إيميل'
                            required
                        />
                    </div>

                    {/* Message Textarea */}
                    <div className="mb-4">
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
                            rows="5"
                            placeholder='رسالة'
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="mb-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-full py-2 px-4 font-semibold text-white rounded-md transition duration-300 focus:outline-none ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-customBlue'
                                }`}
                        >
                            {isSubmitting ? 'Sending...' : 'أرسل'}
                        </button>
                    </div>

                    {/* Form Status */}
                    {formStatus && (
                        <div className="mt-4 text-center text-green-600 font-semibold">
                            {formStatus}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

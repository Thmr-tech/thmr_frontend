import React, { useState } from "react";

const JobApplication = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        degree: "",
        Specialization: "",
        experience: "",
        resume: null,
        message: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted:", formData);
        alert("تم إرسال طلبك بنجاح!");
    };

    return (
        <div className="pt-44" style={{ direction: "rtl" }}>
            <div className="max-w-md mx-auto p-6 bg-[#fcfcfc] shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4 text-center text-customBlue">نموذج التوظيف</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">الاسم الكامل</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">البريد الإلكتروني</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">رقم الهاتف</label>
                        <input
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">المؤهل العلمي</label>
                        <input
                            type="text"
                            name="degree"
                            value={formData.degree}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">التخصص</label>
                        <input
                            type="text"
                            name="Specialization"
                            value={formData.Specialization}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">سنوات الخبرة</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">السيرة الذاتية</label>
                        <input
                            type="file"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange}
                            className="w-full"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">رسالة إضافية</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full p-2 border rounded"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full text-white p-2 rounded bg-customBlue"
                    >
                        إرسال الطلب
                    </button>
                </form>
            </div>
        </div>
    );
};

export default JobApplication;

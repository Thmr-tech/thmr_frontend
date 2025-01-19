import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getValidationSchema } from "./validationSchema";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notify = () => {
    toast.success("ستصلك رسالة على بريدك الإلكتروني لإكمال عملية إعادة تعيين كلمة المرور", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}


const initialValues = {
    email: '',
}

const validationSchema = getValidationSchema(null, false, false, true);


export default function PasswordForget() {

    const onSubmit = async (values, { setErrors }) => {
        try {
            const response = await axios.post('auth/users/reset_password/', values);
            notify()
            console.log("Password reset request sent", response);
        } catch (error) {
            setErrors(error.response.data);
            console.error("Error sending password reset request", error);
        }
    };

    return (
        <div className='flex flex-col items-center pt-28 px-6'>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-10">
                <h2 className="text-2xl font-bold text-center text-customBlue mb-6">إعادة تعيين كلمة المرور</h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    <Form noValidate>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 text-right mb-2">الإيميل</label>
                            <Field type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue" />
                            <ErrorMessage name="email">
                                {msg => <div className="text-red-500 text-right">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-customBlue text-white py-2 rounded-md hover:bg-customBlue focus:outline-none focus:ring-2 focus:ring-customBlue"
                        >
                            ارسل
                        </button>

                        <p className="mt-4 text-center text-sm text-gray-600">
                            العوده إلى
                            <Link to="/login" className="text-blue-500 hover:text-blue-700"> تسجيل الدخول </Link>
                        </p>
                    </Form>
                </Formik>
            </div>
            <ToastContainer rtl />
        </div>
    );
}

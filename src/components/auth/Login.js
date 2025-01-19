import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePasswordToggle from '../hooks/usePasswordToggle';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getValidationSchema } from "./validationSchema";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import logo from "../../assets/images/logo.png";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notify = () => {
    toast.success("تم ارسال تفعيل الحساب على البريد الالكتروني الرجاء تفعيل الحساب لتتمكن من تسجيل الدخول ", {
        position: "top-right",
        autoClose: 9000,
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
    password: '',
    non_field_errors: ''
}

const validationSchema = getValidationSchema(null, true);

export default function Login() {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const location = useLocation();
    const { passwordType, passwordIcon, showPassword } = usePasswordToggle();


    useEffect(() => {
        if (location.state?.registrationSuccess) {
            notify();
        }
    }, [location.state]);


    const onSubmit = async (values, { setErrors }) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post('auth/token/login', values);
            login(response)
            console.log('login successful', response);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col items-center mt-8 px-6">
            <Link to="/" className="pt-3 mb-[50px]">
                <img alt="" src={logo} className="w-[120px]" />
            </Link>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
            >
                <Form noValidate className="text-right flex flex-col gap-[20px] rounded-[1rem] border-[1px] w-[330px] px-7 py-7 mx-auto bg-[#fcfcfc]">
                    <p className="text-center font-bold mb-5 text-lg text-customBlue">تسجيل الدخول</p>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">الإيميل</label>
                        <Field type="text" id="email" name="email"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                        <ErrorMessage name="email">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium mb-2">كلمة المرور</label>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={passwordIcon} className='absolute pl-2 text-black opacity-40' onClick={showPassword} />
                            <Field type={passwordType} name="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue pl-10" />
                        </div>
                        <ErrorMessage name="password">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <ErrorMessage name="non_field_errors">
                        {msg => <div className="text-red-500">{msg}</div>}
                    </ErrorMessage>

                    <button type="submit" className={`w-full bg-customBlue text-white py-2 rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-customBlue'
                        }`}>
                        {isSubmitting ? '... إرسال' : 'تسجيل دخول'}
                    </button>

                    <div className="mt-4 text-center text-sm text-gray-600">
                        ليس لديك حساب ؟
                        <Link to="/register" className="text-blue-500 hover:text-blue-700">
                            تسجيل حساب جديد
                        </Link>
                    </div>

                    <div className="text-center text-sm text-gray-600">
                        <Link to="/forget-password" className="text-blue-500 hover:text-blue-700">نسيت كلمة المرور ؟</Link>
                    </div>
                </Form>
            </Formik>
            <ToastContainer rtl />
        </div >
    );
}

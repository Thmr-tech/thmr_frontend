import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from 'axios';
import { AuthContext } from "../context/AuthContext";
import logo from "../../assets/images/logo.png";


const initialValues = {
    email: '',
    password: '',
    non_field_errors: ''
}

const validationSchema = Yup.object({
    email: Yup.string()
        .required('required')
        .matches(
            /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
            'Invalid email format'
        ),

    password: Yup.string()
        .required('required')
        .min(6, 'Password Incorrect')
        .matches(/[0-9]/, 'Password Incorrect')
        .matches(/[a-z]/, 'Password Incorrect')
        .matches(/[A-Z]/, 'Password Incorrect')
        .matches(/[^\w]/, 'Password Incorrect')
});

export default function Login() {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState(faEyeSlash);
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);


    const showPassword = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
        setPasswordIcon(passwordIcon === faEye ? faEyeSlash : faEye);
    };

    const onSubmit = async (values, { setErrors }) => {
        try {
            const response = await axios.post('auth/token/login', values);
            login(response)
            console.log('login successful', response);
            navigate('/');
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
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
                        <label htmlFor="email" className="block text-sm font-medium">الإيميل</label>
                        <Field type="text" id="email" name="email"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                        <ErrorMessage name="email">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium">كلمة المرور</label>
                        <div className="flex items-center">
                            <FontAwesomeIcon icon={passwordIcon} className='absolute pl-2 text-black opacity-40' onClick={showPassword} />
                            <Field type={passwordType} name="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10" />
                        </div>
                        <ErrorMessage name="password">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <ErrorMessage name="Firebase">
                        {msg => <div className="text-red-500" style={{ direction: 'rtl' }}>{msg}</div>}
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
                </Form>
            </Formik>
        </div >
    );
}

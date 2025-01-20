import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { getValidationSchema } from "./validationSchema";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import usePasswordToggle from '../hooks/usePasswordToggle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const notifySuccess = () => {
    toast.success("تم تغيير كلمة المرور بنجاح", {
        position: "top-center",
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
    password: '',
    re_password: '',
}

const validationSchema = getValidationSchema(null, false, true);

export default function PasswordReset() {
    const [validationStatus, setValidationStatus] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        special: false
    });
    const { uid, token } = useParams();
    const { passwordType, passwordIcon, showPassword } = usePasswordToggle();
    const { password2Type, password2Icon, showPassword2 } = usePasswordToggle();

    const onSubmit = async (values, { setErrors }) => {
        try {
            const response = await axios.post("auth/users/reset_password_confirm/",
                {
                    ...values,
                    uid,
                    token,
                });
            notifySuccess();
            console.log('password reset successful', response);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        }
    };

    const handlePasswordChange = (value) => {
        setValidationStatus({
            length: value.length >= 6,
            uppercase: /[A-Z]/.test(value),
            lowercase: /[a-z]/.test(value),
            number: /[0-9]/.test(value),
            special: /[^\w]/.test(value)
        });
    };

    return (
        <div className='flex flex-col items-center pt-28 px-6'>
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md my-10">
                <h2 className="text-2xl font-bold text-center text-customBlue mb-6">إعادة تعيين كلمة المرور </h2>
                <Formik
                    initialValues={initialValues}
                    onSubmit={onSubmit}
                    validationSchema={validationSchema}
                    validateOnChange={false}
                    validateOnBlur={false}
                >
                    {({ handleChange }) => (
                        <Form noValidate>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-sm font-semibold text-gray-600 mb-2 text-right">كلمة المرور</label>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={passwordIcon} className='absolute pl-2 text-black opacity-40' onClick={showPassword} />
                                    <Field type={passwordType} name="password" id="password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue pl-10"
                                        onChange={(e) => {
                                            handleChange(e);
                                            handlePasswordChange(e.target.value);
                                        }} />
                                </div>
                                <ErrorMessage name="password">
                                    {msg => <div className="text-red-500 text-right">{msg}</div>}
                                </ErrorMessage>

                                <div className="flex flex-row-reverse gap-4 text-xs">
                                    <div className={validationStatus.length ? 'text-green-500' : 'text-red-500'}>
                                        ٦ خانات
                                    </div>
                                    <div className={validationStatus.uppercase ? 'text-green-500' : 'text-red-500'}>
                                        حرف كبير
                                    </div>
                                    <div className={validationStatus.lowercase ? 'text-green-500' : 'text-red-500'}>
                                        حرف صغير
                                    </div>
                                    <div className={validationStatus.number ? 'text-green-500' : 'text-red-500'}>
                                        رقم
                                    </div>
                                    <div className={validationStatus.special ? 'text-green-500' : 'text-red-500'}>
                                        رمز خاص
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4 relative">
                                <label htmlFor="re_password" className="block text-sm font-semibold text-gray-600 mb-2 text-right">تأكيد كلمة المرور</label>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={password2Icon} className='absolute pl-2 text-black opacity-40' onClick={showPassword2} />
                                    <Field type={password2Type} name="re_password" id="re_password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue pl-10" />
                                </div>
                                <ErrorMessage name="re_password">
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
                    )}
                </Formik>
            </div>
            <ToastContainer rtl />
        </div>
    );
}

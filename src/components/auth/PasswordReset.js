import React, { useState } from 'react';
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from 'yup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons';



const initialValues = {
    new_password: '',
    re_password: '',
}

const validationSchema = Yup.object({
    new_password: Yup.string()
        .required('هذا الحقل مطلوب')
        .min(6, 'كلمة المرور قصيرة . يجب ان تتكون من ٦ خانات على الاقل')
        .matches(/[0-9]/, 'كلمة المرور يجب ان تحتوي علي رقم')
        .matches(/[a-z]/, 'كلمة المرور يجب ان تحتوي على حرف صغير')
        .matches(/[A-Z]/, 'كلمة المرور يجب ان تحتوي على حرف كبير')
        .matches(/[^\w]/, 'يجب ان تحتوي كلمة المرور على رمز واحد مميز على الاقل'),

    re_password: Yup.string()
        .required("هذا الحقل مطلوب")
        .oneOf([Yup.ref("new_password"), null], "كلمتا المرور غير متطابقتين")
})

export default function PasswordReset() {
    const { uid, token } = useParams();
    const [passwordType, setPasswordType] = useState("password");
    const [passwordIcon, setPasswordIcon] = useState(faEyeSlash);
    const [password2Type, setPassword2Type] = useState("password");
    const [password2Icon, setPassword2Icon] = useState(faEyeSlash);

    const showPassword = () => {
        setPasswordType(passwordType === "password" ? "text" : "password");
        setPasswordIcon(passwordIcon === faEye ? faEyeSlash : faEye);
    };

    const showPassword2 = () => {
        setPassword2Type(password2Type === "password" ? "text" : "password");
        setPassword2Icon(password2Icon === faEye ? faEyeSlash : faEye);
    };

    const onSubmit = async (values, { setErrors }) => {
        try {
            const response = await axios.post("auth/users/reset_password_confirm/",
                {
                    ...values,
                    uid,
                    token,
                });
            console.log('password reset successful', response);
        } catch (error) {
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            }
        }
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
                                <label htmlFor="new_password" className="block text-sm font-semibold text-gray-600 mb-2 text-right">كلمة المرور</label>
                                <div className="flex items-center">
                                    <FontAwesomeIcon icon={passwordIcon} className='absolute pl-2 text-black opacity-40' onClick={showPassword} />
                                    <Field type={passwordType} name="new_password" id="new_password" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-customBlue pl-10"
                                        onChange={(e) => {
                                            handleChange(e);
                                        }} />
                                </div>
                                <ErrorMessage name="new_password">
                                    {msg => <div className="text-red-500 text-right">{msg}</div>}
                                </ErrorMessage>
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
        </div>
    );
}

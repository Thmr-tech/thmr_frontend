import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAuth } from "../context/AuthContext";
import logo from "../../assets/images/logo2.png";


const initialValues = {
    email: "",
    password: "",
};

const validationSchema = Yup.object({
    email: Yup.string()
        .required("هذا الحقل مطلوب")
        .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "صيغة الايميل غير صحيحه"),

    password: Yup.string().required("هذا الحقل مطلوب"),
});

export default function Login() {
    const { signIn } = useAuth();

    const onSubmit = async (values) => {
        const { email, password } = values;
        await signIn(email, password);
    };

    return (
        <div className="flex flex-col items-center mt-8 px-6">
            <Link to="/" className="pt-3 mb-[50px]">
                <img src={logo} className="w-[180px]" />
            </Link>

            <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
                validateOnChange={false}
                validateOnBlur={false}
            >
                <Form noValidate className="text-right flex flex-col gap-[20px] rounded-[1rem] border-[1px] w-[300px] px-7 py-7 mx-auto bg-[#fcfcfc]">
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
                        <Field type="password" id="password" name="password"
                            className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                        <ErrorMessage name="password">
                            {(msg) => <div className="text-red-500">{msg}</div>}
                        </ErrorMessage>
                    </div>

                    <button type="submit" className="w-full bg-customBlue text-white py-2 rounded-md focus:outline-none focus:ring-2">
                        تسجيل دخول
                    </button>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        ليس لديك حساب ؟
                        <Link to="/register" className="text-blue-500 hover:text-blue-700">
                            تسجيل حساب جديد
                        </Link>
                    </p>
                </Form>
            </Formik>
        </div>
    );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import logo from "../../assets/images/logo.png";
import axios from "axios";


export default function SignUp() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [signupType, setSignupType] = useState("manager");

    console.log(signupType)

    const initialValues = {
        email: "",
        full_name: "",
        national_id: "",
        telephone: "",
        family_funds_box_name: "",
        family_funds_box_number: "",
        family_funds_regulations: null,
        password: "",
        re_password: "",
        signup_type: signupType
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .required("هذا الحقل مطلوب")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "صيغة الايميل غير صحيحه"),

        full_name: Yup.string().required("هذا الحقل مطلوب"),

        national_id: Yup.string()
            .required("هذا الحقل مطلوب")
            .matches(/^\d{10}$/, "رقم الهوية الوطنية يجب أن يكون مكونًا من 10 أرقام"),

        telephone: Yup.string()
            .required("هذا الحقل مطلوب")
            .matches(/^\d{10}$/, "رقم الهاتف يجب أن يكون مكونًا من 10 أرقام"),

        family_funds_box_name: Yup.string()
            .when(signupType, {
                is: "manager",
                then: (schema) => schema.required("هذا الحقل مطلوب"),
                otherwise: (schema) => schema.notRequired(),
            }),

        family_funds_box_number: Yup.string().required("هذا الحقل مطلوب"),

        family_funds_regulations: Yup.mixed()
            .when(signupType, {
                is: "manager",
                then: (schema) =>
                    schema.required("هذا الحقل مطلوب").test(
                        "fileType",
                        "الملف يجب أن يكون بصيغة PDF أو Word",
                        (value) =>
                            value &&
                            ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value.type)
                    ),
                otherwise: (schema) => schema.notRequired(),
            }),

        password: Yup.string()
            .required('هذا الحقل مطلوب')
            .min(6, 'كلمة المرور قصيرة . يجب ان تتكون من ٦ خانات على الاقل')
            .matches(/[0-9]/, 'كلمة المرور يجب ان تحتوي علي رقم')
            .matches(/[a-z]/, 'كلمة المرور يجب ان تحتوي على حرف صغير')
            .matches(/[A-Z]/, 'كلمة المرور يجب ان تحتوي على حرف كبير')
            .matches(/[^\w]/, 'يجب ان تحتوي كلمة المرور على رمز واحد مميز على الاقل'),

        re_password: Yup.string()
            .required("هذا الحقل مطلوب")
            .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين"),

        signup_type: Yup.string()
            .required("نوع التسجيل مطلوب")
            .oneOf(["manager", "member"], "نوع التسجيل غير صالح")
    });

    const onSubmit = async (values, { setErrors }) => {
        console.log('values', values)
        setIsSubmitting(true);
        const formData = new FormData();

        // Append all the form values to the FormData object
        Object.entries(values).forEach(([key, value]) => {
            if (key === "family_funds_regulations") {
                // For file input, append the file directly
                if (value) {
                    formData.append(key, value);
                }
            } else {
                // For other inputs, append normally
                formData.append(key, value);
            }
        });

        try {
            // Send FormData with Axios
            const response = await axios.post("auth/users/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Necessary for file uploads
                },
            });

            console.log("Registration successful", response);
            navigate("/login"); // Redirect on success
        } catch (error) {
            console.error("Error during registration", error);

            if (error.response && error.response.data) {
                setErrors(error.response.data); // Display backend validation errors
            }
        } finally {
            setIsSubmitting(false); // Re-enable the submit button
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
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ setFieldValue, values }) => (
                    <Form noValidate className="text-right flex flex-col gap-[20px] rounded-[1rem] border-[1px] w-[330px] px-7 py-7 mx-auto bg-[#fcfcfc] mb-8 sm:w-[430px]">
                        <p className="text-center font-bold mb-5 text-lg text-customBlue">إنشاء حساب</p>

                        <div className="flex flex-col items-start gap-4 mb-4" style={{ direction: 'rtl' }}>
                            <label className="flex items-center">
                                <Field
                                    type="radio"
                                    name="signup_type"
                                    value="manager"
                                    checked={signupType === "manager"}
                                    onChange={() => {
                                        setSignupType("manager");
                                        setFieldValue("signup_type", "manager");
                                    }}
                                    className="ml-2"
                                />
                                تسجيل كأمين صندوق
                            </label>
                            <label className="flex items-center">
                                <Field
                                    type="radio"
                                    name="signup_type"
                                    value="member"
                                    checked={signupType === "member"}
                                    onChange={() => {
                                        setSignupType("member");
                                        setFieldValue("signup_type", "member");
                                    }}
                                    className="ml-2"
                                />
                                تسجيل كعضو في الصندوق
                            </label>
                        </div>

                        <div>
                            <label htmlFor="full_name" className="text-sm font-medium">الإسم الرباعي</label>
                            <Field type="text" id="full_name" name="full_name"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                            <ErrorMessage name="full_name">
                                {(msg) => <div className="text-red-500">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium">الإيميل</label>
                            <Field type="text" id="email" name="email"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                            <ErrorMessage name="email">
                                {(msg) => <div className="text-red-500">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div>
                            <label htmlFor="national_id" className="block text-sm font-medium">رقم الهوية</label>
                            <Field type="text" id="national_id" name="national_id"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                            <ErrorMessage name="national_id">
                                {(msg) => <div className="text-red-500">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div>
                            <label htmlFor="telephone" className="block text-sm font-medium">رقم الهاتف</label>
                            <Field type="text" id="telephone" name="telephone"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                            <ErrorMessage name="telephone">
                                {(msg) => <div className="text-red-500">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        {signupType === "manager" && (
                            <div>
                                <label htmlFor="family_funds_box_name" className="block text-sm font-medium">
                                    اسم الصندوق
                                </label>
                                <Field
                                    type="text"
                                    id="family_funds_box_name"
                                    name="family_funds_box_name"
                                    className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]"
                                />
                                <ErrorMessage name="family_funds_box_name">
                                    {(msg) => <div className="text-red-500">{msg}</div>}
                                </ErrorMessage>
                            </div>
                        )}

                        <div>
                            <label htmlFor="family_funds_box_number" className="block text-sm font-medium">رقم رخصة الصندوق</label>
                            <Field type="text" id="family_funds_box_number" name="family_funds_box_number"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                            <ErrorMessage name="family_funds_box_number">
                                {(msg) => <div className="text-red-500">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        {signupType === "manager" && (
                            <div>
                                <label htmlFor="family_funds_regulations" className="block text-sm font-medium">
                                    (pdf / word) اللائحة الاساسية للصندوق
                                </label>
                                <input
                                    id="family_funds_regulations"
                                    name="family_funds_regulations"
                                    type="file"
                                    accept=".pdf, .doc, .docx"
                                    onChange={(event) => {
                                        const file = event.currentTarget.files[0];
                                        setFieldValue("family_funds_regulations", file);
                                    }}
                                    className="w-full mt-1 py-2" style={{ direction: 'rtl' }}
                                />
                                <ErrorMessage name="family_funds_regulations">
                                    {(msg) => <div className="text-red-500">{msg}</div>}
                                </ErrorMessage>
                            </div>
                        )}

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium">كلمة المرور</label>
                            <Field type="password" id="password" name="password"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                            <ErrorMessage name="password">
                                {(msg) => <div className="text-red-500">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <div>
                            <label htmlFor="re_password" className="block text-sm font-medium">إعادة كلمة المرور</label>
                            <Field type="password" id="re_password" name="re_password"
                                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008291]" />
                            <ErrorMessage name="re_password">
                                {(msg) => <div className="text-red-500">{msg}</div>}
                            </ErrorMessage>
                        </div>

                        <ErrorMessage name="Firebase">
                            {msg => <div className="text-red-500" style={{ direction: 'rtl' }}>{msg}</div>}
                        </ErrorMessage>

                        <button type="submit" className={`w-full bg-customBlue text-white py-2 rounded-md ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-customBlue'
                            }`}>
                            {isSubmitting ? '... إرسال' : 'تسجيل حساب'}
                        </button>

                        <div className="mt-4 text-center text-sm text-gray-600">
                            لديك حساب بالفعل ؟
                            <Link to="/login" className="text-blue-500 hover:text-blue-700">
                                تسجيل الدخول
                            </Link>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

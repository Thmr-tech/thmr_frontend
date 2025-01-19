import * as Yup from 'yup';



export const getValidationSchema = (signupType = null, isLogin = false, isPasswordReset = false, isPasswordForget = false) => {
    // Base schema for email and password
    const baseSchema = {
        email: Yup.string()
            .required("هذا الحقل مطلوب")
            .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, "صيغة الايميل غير صحيحه"),

        password: Yup.string()
            .required("هذا الحقل مطلوب")
            .min(6, "كلمة المرور قصيرة . يجب ان تتكون من ٦ خانات على الاقل")
            .matches(/[0-9]/, "كلمة المرور يجب ان تحتوي علي رقم")
            .matches(/[a-z]/, "كلمة المرور يجب ان تحتوي على حرف صغير")
            .matches(/[A-Z]/, "كلمة المرور يجب ان تحتوي على حرف كبير")
            .matches(/[^\w]/, "يجب ان تحتوي كلمة المرور على رمز واحد مميز على الاقل"),
    };

    // If it's for PasswordForget, return only email validation
    if (isPasswordForget) {
        return Yup.object({
            email: baseSchema.email,
        });
    }

    // If it's for Login, return only email and password validation
    if (isLogin) {
        return Yup.object(baseSchema);
    }

    // If it's for PasswordReset, return only password and re-password validation
    if (isPasswordReset) {
        return Yup.object({
            password: baseSchema.password,
            re_password: Yup.string()
                .required("هذا الحقل مطلوب")
                .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين"),
        });
    }

    // Otherwise, it's for SignUp, return the full validation schema
    return Yup.object({
        ...baseSchema,
        full_name: Yup.string().required("هذا الحقل مطلوب"),

        national_id: Yup.string()
            .required("هذا الحقل مطلوب")
            .matches(/^\d{10}$/, "رقم الهوية الوطنية يجب أن يكون مكونًا من 10 أرقام"),

        telephone: Yup.string()
            .required("هذا الحقل مطلوب")
            .matches(/^\d{10}$/, "رقم الهاتف يجب أن يكون مكونًا من 10 أرقام"),

        family_funds_box_name: Yup.string().when("signup_type", {
            is: "manager",
            then: (schema) => schema.required("هذا الحقل مطلوب"),
            otherwise: (schema) => schema.notRequired(),
        }),

        family_funds_box_number: Yup.string().required("هذا الحقل مطلوب"),

        family_funds_regulations: Yup.mixed().when("signup_type", {
            is: "manager",
            then: (schema) =>
                schema
                    .required("هذا الحقل مطلوب")
                    .test(
                        "fileType",
                        "الملف يجب أن يكون بصيغة PDF أو Word",
                        (value) =>
                            value &&
                            ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(value.type)
                    ),
            otherwise: (schema) => schema.notRequired(),
        }),

        re_password: Yup.string()
            .required("هذا الحقل مطلوب")
            .oneOf([Yup.ref("password"), null], "كلمتا المرور غير متطابقتين"),
    });
};

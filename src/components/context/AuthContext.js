import React, { createContext, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    signInWithPopup,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

const errorMessages = {
    "auth/email-already-in-use": "البريد الإلكتروني مستخدم بالفعل.",
    "auth/invalid-email": "البريد الإلكتروني غير صالح.",
    "auth/weak-password": "كلمة المرور ضعيفة جدًا.",
    "auth/user-not-found": "لم يتم العثور على مستخدم بهذا البريد الإلكتروني.",
    "auth/wrong-password": "كلمة المرور غير صحيحة.",
    "auth/network-request-failed": "فشل الاتصال بالشبكة. يرجى المحاولة مرة أخرى.",
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    const signUp = async (email, password, name) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            const createdUser = userCredential.user;

            await updateProfile(createdUser, { displayName: name });
            setUser({ ...createdUser, displayName: name });
            toast.success("تم التسجيل بنجاح!");
            navigate("/login");
        } catch (error) {
            const errorMessage = errorMessages[error.code] || "حدث خطأ غير متوقع.";
            toast.error(errorMessage);
        }
    };

    const signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password,
            );
            setUser(userCredential.user);
            toast.success("تم تسجيل الدخول بنجاح!");
            navigate("/");
        } catch (error) {
            const errorMessage = errorMessages[error.code] || "حدث خطأ غير متوقع.";
            toast.error(errorMessage);
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success("تم تسجيل الخروج بنجاح!");
            navigate("/");
        } catch (error) {
            toast.error("حدث خطأ أثناء تسجيل الخروج.");
        }
    };

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            toast.success("تم تسجيل الدخول باستخدام Google!");
        } catch (error) {
            toast.error("حدث خطأ أثناء تسجيل الدخول باستخدام Google.");
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, signUp, signIn, signOutUser, signInWithGoogle }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

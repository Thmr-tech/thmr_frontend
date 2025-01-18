import React, { createContext, useState, useContext } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    signInWithPopup
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
    "auth/invalid-credential": "اسم المستخدم او كلمة المرور غير صحيحه"
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         if (currentUser) {
    //             setUser(currentUser);
    //         } else {
    //             setUser(null);
    //         }
    //     });

    //     return () => unsubscribe();
    // }, []);

    // console.log('user', user)

    const signUp = async (email, password, username) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password,
            );
            console.log('userCredential', userCredential)
            const createdUser = userCredential.user;

            await updateProfile(createdUser, { displayName: username });
            setUser({ ...createdUser, displayName: username });
        } catch (error) {
            const errorMessage = errorMessages[error.code] || "حدث خطأ غير متوقع.";
            throw errorMessage;
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
        } catch (error) {
            console.log(error)
            const errorMessage = errorMessages[error.code] || "حدث خطأ غير متوقع.";
            throw errorMessage;
        }
    };

    const signOutUser = async () => {
        try {
            await signOut(auth);
            setUser(null);
            navigate("/");
        } catch (error) {
            console.log(error)
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
        <AuthContext.Provider value={{ user, signUp, signIn, signOutUser, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

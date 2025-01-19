import { useState } from "react";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";

const usePasswordToggle = () => {
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

    return {
        passwordType,
        passwordIcon,
        showPassword,
        password2Type,
        password2Icon,
        showPassword2
    };
};

export default usePasswordToggle;
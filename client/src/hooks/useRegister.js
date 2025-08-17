import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext"
import { register } from "../api/auth-api";
import { useEffect, useState } from "react";
import { getRegisterTranslations } from "../api/translation-requests";

export const useRegister = (language) => {
    const { changeAuthState } = useAuthContext();

    const navigate = useNavigate();
     let translations = {
        header: "Login",
        emailPlaceholder: "Enter your email",
        emailLabel: "Email",
        passwordPlaceholder: "Enter your password",
        passwordLabel: "Password",
        noAccount: "Don't have an account?",
        signUpLink: "Sign up here"
    };

    translations = {
        ...translations,
        ...useRegisterTranslator(language) ?? {}
    }

    const registerCallback = async (email, password, rePass) => {

            const authData = await register(email, password, rePass)

            console.log(authData);

            if (authData) {
                changeAuthState({
                    _id: authData.userId,
                    email: authData.email,
                    isAdmin: authData.role == 'admin'
                })

                navigate('/')
            }
            
    }

    return { registerCallback, translations};
}

export const useRegisterTranslator = (language) => {
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        const fetchTranslation = async () => {
            const data = await getRegisterTranslations(language);
            setTranslations(data);
        }
        fetchTranslation();
    }, [language])

    return translations;
}
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { login } from "../api/auth-api";
import { useEffect, useState } from "react";
import { getLoginTranslations } from "../api/translation-requests";

export const useLogin = (language) => {
    const { changeAuthState } = useAuthContext();
    const navigate = useNavigate();
    const translations = useLoginTranslation(language)


    const loginHandler = async (email, password) => {
        const authData = await login(email, password)

        if (authData) {

            changeAuthState({
                _id: authData._id,
                email: authData.email,
                isAdmin: authData.role == 'admin'
            })

            navigate('/')
        }

    }

    return { loginHandler, translations};
}

export const useLoginTranslation = (language) => {
    const [translations, setTranslations] = useState({});

    useEffect(() => {
        const fetchTranslation = async () => {
            const data = await getLoginTranslations(language);
            setTranslations(data);
        }
        fetchTranslation();
    }, [language])

    return translations;
}
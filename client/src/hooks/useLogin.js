import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { login } from "../api/auth-api";
import { useEffect, useState } from "react";
import { getLoginTranslations } from "../api/translation-requests";

export const useLogin = (language) => {

    const { changeAuthState } = useAuthContext();

    const navigate = useNavigate();
    const translations = useLoginTranslator(language)


    const loginCallback = async (email, password) => {
        const authData = await login(email, password)

        console.log(authData);
        

        if (authData) {
            changeAuthState({
                _id: authData.id,
                email: authData.email,
                isAdmin: authData.role.trim().toUpperCase() === 'ADMIN'
            })

            navigate('/')
        }

    }

    return { loginCallback, translations};
}

export const useLoginTranslator = (language) => {
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
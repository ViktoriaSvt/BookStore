import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { login } from "../api/auth-api";
import { useEffect, useState } from "react";
import { getLoginTranslations } from "../api/translation-requests";
import { toast } from "react-toastify";

export const useLogin = (language) => {

  const { changeAuthState } = useAuthContext();
  let translations = {
    header: "Login",
    emailPlaceholder: "Enter your email",
    emailLabel: "Email",
    passwordPlaceholder: "Enter your password",
    passwordLabel: "Password",
    noAccount: "Don't have an account?",
    signUpLink: "Sign up here"
  };


  const navigate = useNavigate();
  translations = {
    ...translations,
    ...useLoginTranslator(language)
  };



  const loginCallback = async (email, password) => {
    try {
      const authData = await login(email, password);

      if (authData) {
        changeAuthState({
          _id: authData.userId,
          email: authData.email,
          isAdmin: authData.role === 'ADMIN'
        });

        navigate('/');
      }
    } catch (error) {
      console.error("Login failed:", error);
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  return { loginCallback, translations };
}

export const useLoginTranslator = (language) => {
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const data = await getLoginTranslations(language);
        setTranslations(data);
      } catch {
        setTranslations({});
      }
    };

    fetchTranslation();
  }, [language]);

  return translations;
};
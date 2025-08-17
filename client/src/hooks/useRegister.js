import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { register } from "../api/auth-api";
import { useEffect, useState } from "react";
import { getRegisterTranslations } from "../api/translation-requests";
import { toast } from "react-toastify";

export const useRegister = (language) => {
  const { changeAuthState } = useAuthContext();
  const navigate = useNavigate();

  let translations = {
    header: "Register",
    emailPlaceholder: "Enter your email",
    emailLabel: "Email",
    passwordPlaceholder: "Enter your password",
    passwordLabel: "Password",
    noAccount: "Already have an account?",
    signUpLink: "Login here"
  };

  translations = {
    ...translations,
    ...useRegisterTranslator(language)
  };

  const registerCallback = async (email, password, rePass) => {
    try {
      const authData = await register(email, password, rePass);

      if (authData) {
        changeAuthState({
          _id: authData.userId,
          email: authData.email,
          isAdmin: authData.role === 'admin'
        });
        navigate('/');
      }
    } catch {
      toast.error("Registration failed. Please check your details and try again.", {
        position: "top-right",
      });
    }
  };

  return { registerCallback, translations };
};

export const useRegisterTranslator = (language) => {
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const fetchTranslation = async () => {
      try {
        const data = await getRegisterTranslations(language);
        setTranslations(data);
      } catch {
        setTranslations({});
      }
    };
    fetchTranslation();
  }, [language]);

  return translations;
};

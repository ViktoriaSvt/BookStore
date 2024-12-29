import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { login } from "../api/auth-api";

export const useLogin = () => {
    const { changeAuthState } = useAuthContext();
    const navigate = useNavigate();


const loginHandler = async (email, password) => {
    try {
        const authData = await login(email, password)

        if (authData) {
            changeAuthState({
                _id: authData._id,
                email: authData.email,
            })

            navigate('/')
        }
    } catch (error) {
        throw new Error(error.message);


    }
}

return loginHandler;
}
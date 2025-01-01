import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { login } from "../api/auth-api";

export const useLogin = () => {
    const { changeAuthState } = useAuthContext();
    const navigate = useNavigate();


    const loginHandler = async (email, password) => {
        const authData = await login(email, password)

        if (authData) {

            console.log(authData);
            

            changeAuthState({
                _id: authData._id,
                email: authData.email,
                isAdmin: authData.role == 'admin'
            })

            navigate('/')
        }

    }

    return loginHandler;
}
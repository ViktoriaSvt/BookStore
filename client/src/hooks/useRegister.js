import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext"
import { register } from "../api/auth-api";

export const useRegister = () => {
    const { changeAuthState } = useAuthContext();
    const navigate = useNavigate();


const registerHandler = async (email, password) => {
    try {
        const authData = await register(email, password)

        if (authData) {
            changeAuthState({
                userId: authData._id,
                email: authData.email,
            })

            navigate('/')
        }
    } catch (error) {
        console.error("Failed to register", error.message);

    }
}

return registerHandler;
}
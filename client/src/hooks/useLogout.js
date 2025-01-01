
import { logout } from "../api/auth-api";
import { useAuthContext } from "../contexts/AuthContext";


export function useLogout() {
    const { changeAuthState } = useAuthContext();

    const clickHandler = async (e) => {
        e.preventDefault();

        await logout()

        changeAuthState({
            _id: '',
            email: '',
            role: ''
        });

    }

    return clickHandler
}
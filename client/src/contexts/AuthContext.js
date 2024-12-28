import { createContext, useContext } from "react";





export const AuthContext = createContext ({
    email: '',
    isAuthenticated: false,
    changeAuthState: ( ) => null
})

export const useAuthContext = () => {
    return useContext(AuthContext)
}
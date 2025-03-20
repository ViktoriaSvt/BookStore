import { createContext, useContext } from "react";

export const AuthContext = createContext ({
    _id: '',
    email: '',
    isAdmin: false,
    isAuthenticated: false,
    language: 'en',
    changeAuthState: ( ) => null
})

export const useAuthContext = () => {
    return useContext(AuthContext)
}
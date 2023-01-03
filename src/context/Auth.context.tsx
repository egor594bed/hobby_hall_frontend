import { createContext } from "react";

interface LoginParams {
    token: string
    userId: string
    login: (jwtToken: string, id: string) => void
    logout: () => void
    isAuthenticated: boolean
}

function noop() {}

export const AuthContext = createContext<LoginParams>({
    token: '',
    userId: '',
    login: noop,
    logout: noop,
    isAuthenticated: false
})
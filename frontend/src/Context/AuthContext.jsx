import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(
        localStorage.getItem("token")
    )
    const [user, setUser] = useState(
        localStorage.getItem("user")
    )
    const login = (newtoken) => {
        localStorage.setItem("token", newtoken?.token)
        setToken(newtoken?.token)
        const users = JSON.stringify(newtoken?.user[0])
        localStorage.setItem("user", users)
        setUser(users)

    }
    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        setToken(null)
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext)


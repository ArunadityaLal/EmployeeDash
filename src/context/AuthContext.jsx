"use client"

import { createContext, useContext, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { api } from "../utils/api"

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("token", "")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const login = async (email, password) => {
    setLoading(true)
    setError("")

    try {
      const data = await api.login(email, password)
      setToken(data.token)
      return true
    } catch (err) {
      setError(err.message)
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setToken("")
  }

  const value = {
    token,
    loading,
    error,
    login,
    logout,
    isAuthenticated: !!token,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


"use client"

import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { LogOut } from "lucide-react"

const Header = ({ title }) => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <header className="bg-white shadow">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {title !== "Sign In" && (
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </button>
        )}
      </div>
    </header>
  )
}

export default Header


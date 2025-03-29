"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useToast } from "../context/ToastContext"
import { validators, validateForm } from "../utils/validators"
import Header from "../components/Header"
import LoadingSpinner from "../components/LoadingSpinner"

const Login = () => {
  const [formData, setFormData] = useState({
    email: "eve.holt@reqres.in",
    password: "cityslicka",
  })
  const [errors, setErrors] = useState({})
  const { login, loading } = useAuth()
  const { showToast } = useToast()
  const navigate = useNavigate()

  const validationRules = {
    email: [validators.required, validators.email],
    password: [validators.required],
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { isValid, errors: validationErrors } = validateForm(formData, validationRules)

    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    const success = await login(formData.email, formData.password)

    if (success) {
      showToast("Login successful!", "success")
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Header title="Sign In" />

      <main className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-center text-3xl font-bold text-gray-800">Sign in to your account</h2>
        <p className="mt-2 text-center text-sm text-gray-500">Use the provided credentials to log in</p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              className={`w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.email ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
              }`}
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              className={`w-full px-4 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
                errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-primary"
              }`}
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
            {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary hover:bg-primary/90 focus:ring-2 focus:ring-primary focus:ring-offset-2"
            }`}
          >
            {loading ? (
              <div className="flex items-center">
                <LoadingSpinner size="small" />
                <span className="ml-2">Signing in...</span>
              </div>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600 bg-gray-100 p-3 rounded-md">
          <p className="font-medium">Demo credentials:</p>
          <p>Email: <span className="font-mono">eve.holt@reqres.in</span></p>
          <p>Password: <span className="font-mono">cityslicka</span></p>
        </div>
      </main>
    </div>
  )
}

export default Login

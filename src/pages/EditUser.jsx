"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"
import { api } from "../utils/api"
import { validators, validateForm } from "../utils/validators"
import { ArrowLeft, Save } from "lucide-react"
import Header from "../components/Header"
import LoadingSpinner from "../components/LoadingSpinner"

const EditUser = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { showToast } = useToast()

  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  })
  const [errors, setErrors] = useState({})

  const validationRules = {
    first_name: [validators.required, validators.maxLength(50)],
    last_name: [validators.required, validators.maxLength(50)],
    email: [validators.required, validators.email],
  }

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await api.getUser(id)
        setUser(data.data)
        setFormData({
          first_name: data.data.first_name,
          last_name: data.data.last_name,
          email: data.data.email,
        })
      } catch (error) {
        showToast(error.message, "error")
        navigate("/")
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [id, navigate, showToast])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validate form
    const { isValid, errors: validationErrors } = validateForm(formData, validationRules)

    if (!isValid) {
      setErrors(validationErrors)
      return
    }

    setSaving(true)

    try {
      await api.updateUser(id, formData)
      showToast("User updated successfully", "success")
      navigate("/")
    } catch (error) {
      showToast(error.message, "error")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Header title="Edit User" />
        <LoadingSpinner size="large" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center">
      <Header title="Edit User" />

      <main className="w-full max-w-3xl p-8 bg-white/90 backdrop-blur-md shadow-lg rounded-2xl mt-10">
        <button onClick={() => navigate("/")} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Users
        </button>

        <div className="flex items-center space-x-6 mb-6">
          <img
            src={user.avatar || "/placeholder.svg"}
            alt={`${user.first_name} ${user.last_name}`}
            className="h-24 w-24 rounded-full object-cover border border-gray-300 shadow-sm"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-gray-500">ID: {user.id}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                id="first_name"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm transition-all focus:outline-none ${
                  errors.first_name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.first_name && <p className="mt-1 text-sm text-red-500">{errors.first_name}</p>}
            </div>

            <div>
              <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                id="last_name"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm transition-all focus:outline-none ${
                  errors.last_name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.last_name && <p className="mt-1 text-sm text-red-500">{errors.last_name}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`mt-1 block w-full px-4 py-3 border rounded-lg shadow-sm transition-all focus:outline-none ${
                  errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
                }`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-100 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex items-center justify-center px-5 py-2 rounded-lg text-white font-medium shadow-md transition-all disabled:opacity-50 bg-blue-600 hover:bg-blue-700 active:scale-95"
            >
              {saving ? (
                <>
                  <LoadingSpinner size="small" />
                  <span className="ml-2">Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default EditUser

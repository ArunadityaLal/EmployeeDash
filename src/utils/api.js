const BASE_URL = "https://reqres.in/api"

export const api = {
  login: async (email, password) => {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.error || "Login failed")
    }

    return response.json()
  },

  getUsers: async (page = 1) => {
    const response = await fetch(`${BASE_URL}/users?page=${page}`)

    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    return response.json()
  },

  getUser: async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`)

    if (!response.ok) {
      throw new Error("User not found")
    }

    return response.json()
  },

  updateUser: async (id, userData) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error("Failed to update user")
    }

    return response.json()
  },

  deleteUser: async (id) => {
    const response = await fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      throw new Error("Failed to delete user")
    }

    return true
  },
}


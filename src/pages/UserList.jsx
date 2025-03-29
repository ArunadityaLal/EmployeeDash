"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useToast } from "../context/ToastContext"
import { api } from "../utils/api"
import { useDebounce } from "../hooks/useDebounce"
import Header from "../components/Header"
import UserCard from "../components/UserCard"
import SearchBar from "../components/SearchBar"
import Pagination from "../components/Pagination"
import LoadingSpinner from "../components/LoadingSpinner"

const UserList = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  const { showToast } = useToast()
  const navigate = useNavigate()

  const fetchUsers = async (page) => {
    setLoading(true)
    try {
      const data = await api.getUsers(page)
      setUsers(data.data)
      setTotalPages(data.total_pages)
    } catch (error) {
      showToast(error.message, "error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(currentPage)
  }, [currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleDelete = async (id) => {
    try {
      await api.deleteUser(id)
      setUsers(users.filter((user) => user.id !== id))
      showToast("User deleted successfully", "success")
    } catch (error) {
      showToast(error.message, "error")
    }
  }

  const filteredUsers = users.filter((user) =>
    `${user.first_name} ${user.last_name}`.toLowerCase().includes(debouncedSearchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title="User Management" />

      <main className="container mx-auto px-6 py-10">
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar value={searchTerm} onChange={setSearchTerm} className="rounded-lg shadow-sm" />
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-72">
            <LoadingSpinner size="large" />
          </div>
        ) : (
          <>
            {/* User Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredUsers.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onDelete={handleDelete}
                  className="rounded-xl shadow-md transition-transform transform hover:scale-105 hover:shadow-lg"
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-500 font-semibold">No users found</p>
              </div>
            )}

            {/* Pagination */}
            <div className="mt-8 flex justify-center">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

export default UserList

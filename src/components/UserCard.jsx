"use client"

import { Link } from "react-router-dom"
import { Edit, Trash2 } from "lucide-react"

const UserCard = ({ user, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden transition-all hover:shadow-md">
      <div className="p-4 flex items-center space-x-4">
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={`${user.first_name} ${user.last_name}`}
          className="h-16 w-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {user.first_name} {user.last_name}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="px-4 py-3 bg-gray-50 flex justify-end space-x-2">
        <Link
          to={`/edit/${user.id}`}
          className="flex items-center px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit
        </Link>
        <button
          onClick={() => onDelete(user.id)}
          className="flex items-center px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete
        </button>
      </div>
    </div>
  )
}

export default UserCard


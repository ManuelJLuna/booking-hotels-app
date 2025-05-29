import { useState, useEffect } from "react"
import { UserContext } from "./UserContext"

export const UserProvider = ({ children }) => {

  const [users, setUsers] = useState([])

  // This state saves the logged user
  const [logedUser, setLogedUser] = useState(null)

  // API URL
  const URL_BASE = 'http://localhost:8080/user'

  // Gets all users
  const fetchUsersData = async () => {
    try {
      const r = await fetch(URL_BASE)
      const data = await r.json()
      setUsers(data)
    } catch (err) {
      console.error(err)
      return console.error('Ha ocurrido un error al llamar a la API.')
    }
  }

  // Adds a user
  // Check API documentation for the correct format of the user JSON object
  const addUser = async (user) => {
    try {
      const r = await fetch(URL_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      })
      if (r.ok) {
        fetchUsersData()
      }
    } catch (err) {
      console.error('Error al agregar usuario:', err)
    }
  }

  // Deletes a user by its id
  const deleteUser = async (id) => {
    try {
      const r = await fetch(`${URL_BASE}/${id}`, {
        method: 'DELETE',
      })
      if (r.ok) {
        fetchUsersData()
      }
    } catch (err) {
      console.error('Error al eliminar usuario:', err)
    }
  }

  // Updates a user
  const updateUser = async (updatedUser) => {
    try {
      const r = await fetch(`${URL_BASE}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      })
      if (r.ok) {
        fetchUsersData()
      }
    } catch (err) {
      console.error('Error al actualizar hotel:', err)
    }
  }

  useEffect(() => {
    fetchUsersData()
  }, [])

  return (
    <UserContext.Provider value={{ users, addUser, deleteUser, updateUser, logedUser, setLogedUser }}>
      {children}
    </UserContext.Provider>
  )
}
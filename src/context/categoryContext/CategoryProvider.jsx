import { CategoryContext } from './CategoryContext'
import { useEffect, useState } from 'react'

export const CategoryProvider = ({ children }) => {

  const [category, setCategory] = useState([])

  // API URL
  const URL_BASE = 'http://localhost:8080/category'

  // Gets all category
  const fetchCategoryData = async () => {
    try {
      const r = await fetch(URL_BASE)
      const data = await r.json()
      setCategory(data)
    } catch (err) {
      console.error(err)
      return console.error('Ha ocurrido un error al llamar a la API.')
    }
  }

  // Adds a category
  // Check API documentation for the correct format of the category JSON object
  const addCategory = async (category) => {
    try {
      const r = await fetch(URL_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(category),
      })
      if (r.ok) {
        fetchCategoryData()
      }
    } catch (err) {
      console.error('Error al agregar category:', err)
    }
  }

  // Deletes a category by its id
  const deleteCategory = async (id) => {
    try {
      const r = await fetch(`${URL_BASE}/${id}`, {
        method: 'DELETE',
      })
      if (r.ok) {
        fetchCategoryData()
      }
    } catch (err) {
      console.error('Error al eliminar category:', err)
    }
  }

  // Updates a category
  const updateCategory = async (updatedCategory) => {
    try {
      const r = await fetch(`${URL_BASE}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCategory),
      })
      if (r.ok) {
        fetchCategoryData()
      }
    } catch (err) {
      console.error('Error al actualizar la category:', err)
    }
  }

  useEffect(() => {
    fetchCategoryData()
  }, [])

  return (
    <CategoryContext.Provider value={{ category, addCategory, deleteCategory, updateCategory }}>
      {children}
    </CategoryContext.Provider>
  )
}
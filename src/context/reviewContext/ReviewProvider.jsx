import { ReviewContext } from './ReviewContext'
import { useEffect, useState } from 'react'

export const ReviewProvider = ({ children }) => {

  const [reviews, setReviews] = useState([])

  // API URL
  const URL_BASE = 'http://localhost:8080/review'

  // Gets all reviews
  const fetchReviewData = async () => {
    try {
      const r = await fetch(URL_BASE)
      const data = await r.json()
      setReviews(data)
    } catch (err) {
      console.error(err)
      return console.error('Ha ocurrido un error al llamar a la API.')
    }
  }

  // Adds a review
  // Check API documentation for the correct format of the review JSON object
  const addReview = async (review) => {
    try {
      const r = await fetch(URL_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
      })
      if (r.ok) {
        fetchReviewData()
      }
    } catch (err) {
      console.error('Error al agregar review:', err)
    }
  }

  // Deletes a review by its id
  const deleteReview = async (id) => {
    try {
      const r = await fetch(`${URL_BASE}/${id}`, {
        method: 'DELETE',
      })
      if (r.ok) {
        fetchReviewData()
      }
    } catch (err) {
      console.error('Error al eliminar review:', err)
    }
  }

  // Updates a review
  const updateReview = async (updatedReview) => {
    try {
      const r = await fetch(`${URL_BASE}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedReview),
      })
      if (r.ok) {
        fetchReviewData()
      }
    } catch (err) {
      console.error('Error al actualizar la review:', err)
    }
  }

  useEffect(() => {
    fetchReviewData()
  }, [])

  return (
    <ReviewContext.Provider value={{ reviews, addReview, deleteReview, updateReview }}>
      {children}
    </ReviewContext.Provider>
  )
}
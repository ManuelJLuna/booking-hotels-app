import { UserContext } from '../userContext/UserContext'
import { HotelContext } from './HotelContext'
import { useContext, useEffect, useState } from 'react'

export const HotelProvider = ({ children }) => {

  const userContext = useContext(UserContext)
  const logedUser = userContext ? userContext.logedUser : null
  const [hotels, setHotels] = useState([])
  const [favouriteHotels, setFavouriteHotels] = useState(logedUser ? logedUser.favouriteHotels : [])
  const [bookedHotels, setBookedHotels] = useState(logedUser ? logedUser.bookedHotels : [])

  // API URL
  const URL_BASE = 'http://localhost:8080/hotel'

  // Gets all hotels
  const fetchHotelsData = async () => {
    try {
      const r = await fetch(URL_BASE)
      const data = await r.json()
      setHotels(data)
    } catch (err) {
      console.error(err)
      return console.error('Ha ocurrido un error al llamar a la API.')
    }
  }

  const fetchHotelDataById = async (id) => {
    try {
      const r = await fetch(`${URL_BASE}/${id}`)
      const data = await r.json()
      return data;
    } catch (err) {
      console.error(err)
      return console.error('Ha ocurrido un error al llamar a la API.')
    }
  }

  // Adds a hotel
  // Check API documentation for the correct format of the hotel JSON object
  const addHotel = async (hotel) => {
    try {
      const r = await fetch(URL_BASE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(hotel),
      })
      if (r.ok) {
        fetchHotelsData()
      }
    } catch (err) {
      console.error('Error al agregar hotel:', err)
    }
  }

  // Deletes a hotel by its id
  const deleteHotel = async (id) => {
    try {
      const r = await fetch(`${URL_BASE}/${id}`, {
        method: 'DELETE',
      })
      if (r.ok) {
        fetchHotelsData()
      }
    } catch (err) {
      console.error('Error al eliminar hotel:', err)
    }
  }

  // Updates a hotel
  const updateHotel = async (updatedHotel) => {
    try {
      const r = await fetch(`${URL_BASE}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedHotel),
      })
      if (r.ok) {
        fetchHotelsData()
      }
    } catch (err) {
      console.error('Error al actualizar hotel:', err)
    }
  }

  useEffect(() => {
    fetchHotelsData()
  }, [])

  return (
    <HotelContext.Provider value={{ hotels, addHotel, deleteHotel, updateHotel, bookedHotels, setBookedHotels, favouriteHotels, setFavouriteHotels, fetchHotelDataById }}>
      {children}
    </HotelContext.Provider>
  )
}
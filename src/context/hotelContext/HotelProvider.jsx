import { HotelContext } from './HotelContext'
import { useEffect, useState } from 'react'

export const HotelProvider = ({ children }) => {

  const [hotels, setHotels] = useState([])

  const URL_BASE = 'http://localhost:8080/hotel'

  const fetchHotelsData = async () => {
    try {
      const r = await fetch(URL_BASE)
      const data = await r.json()
      setHotels(data)
    } catch (err) {
      console.error(err)
      return console.error('Ha ocurrido un error al llamar a la API. HotelProvider.jsx')
    }
  }

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

  const updateHotel = async (id, updatedHotel) => {
    try {
      const r = await fetch(`${URL_BASE}/${id}`, {
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
    <HotelContext.Provider value={{ hotels, addHotel, deleteHotel, updateHotel }}>
      {children}
    </HotelContext.Provider>
  )
}
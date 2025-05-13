import { HotelContext } from './HotelContext'
import { useEffect, useState } from 'react'

export const HotelProvider = ({children}) => {

    const [hotels, setHotels] = useState([])
    
    const URL_BASE = 'http://localhost:8080/hotel'
    
    const fetchHotelsData = async () => {
      try {      
        const r = await fetch(URL_BASE)
        const data = await r.json()
        setHotels(data)
      } catch (err) {
        console.error(err)
        return console.error('Ha ocurrido un error al llamar a la API. ShopComponent.jsx 10')
      }
    }
    
    useEffect(() => {
      fetchHotelsData()
    }, [])
    
    return (
    <HotelContext.Provider value={{hotels}}>
        {children}
    </HotelContext.Provider>
  )
}
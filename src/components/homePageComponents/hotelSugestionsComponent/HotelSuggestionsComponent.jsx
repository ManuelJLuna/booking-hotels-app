import { useContext } from 'react';
import { CardComponent } from '../../cardComponent/SuggestionCardComponent';
import { HotelContext } from '../../../context/hotelContext/HotelContext';
import './hotelSuggestionsComponentStyles.css'

const hotelHarcode = { // TODO: Eliminar este hotel harcodeado una vez que se tenga la card completada
    id: 1,
    hotelName: 'Hotel de prueba',
    hotelDescription: 'Este es un hotel de prueba para mostrar la card.',
    pricePerNight: 100,
    photos: 'src/assets/icon.png',
}


export const HotelSuggestionsComponent = () => {

    const context = useContext(HotelContext);
    const hotels = context?.hotels || [];

    return (
        <div className='hotelsSuggestions'>
            <h2>Recomendaciones</h2>
            <div className='hotelsSuggestionsContainer'>
                {hotels.length > 0 ? (
                    hotels.map(hotel => (
                        <CardComponent
                            hotel={hotel}
                            key={hotel.id}
                        />
                    ))
                ) : (
                    <p>No hay hoteles disponibles.</p>
                )}
            </div>
        </div>
            )
}
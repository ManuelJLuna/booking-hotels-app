import { useContext } from 'react';
import './hotelFavouritesComponentStyles.css'
import { CardComponent } from '../../cardComponent/SuggestionCardComponent';
import { HotelContext } from '../../../context/hotelContext/HotelContext';

export const HotelFavouritesComponent = () => {

    // Gets the logedUser favourite hotels
    const { favouriteHotels } = useContext(HotelContext) ? useContext(HotelContext) : [];

    return (
        <div className='hotelsFavouriteHome'>
            {favouriteHotels.length > 0 ? (
                <>
                    <h2>Hoteles favoritos</h2>
                    <div className='hotelsFavouriteContainerHome'>
                        {favouriteHotels.slice(-4).map(hotel => (
                            <CardComponent key={hotel.id} hotel={hotel}/>
                        ))}
                    </div>
                </>
            ) : (<></>)}
        </div>
    );
}
import { NavLink } from 'react-router';
import './suggestionCardComponentStyles.css';

export const CardComponent = ( {hotel} ) => {
    return (
        <NavLink className='cardComponent' to={`/hotel/${hotel.id}`} rel="noopener noreferrer" href="#"> {/* Uses the hotel.id to get a link to acces to the hotel page */}
            <img src={`http://localhost:8080${hotel.photos[0]/* Uses the index 0 to show the first image uploaded of the hotel */}`} alt={hotel.hotelName} className='cardHotelImage'/>
            <div className='cardContent'>
                <h3 className='cardHotelName'>{hotel.hotelName}</h3>
                <p className='description'>{hotel.hotelDescription}</p>
                <p className='price'>Precio: ${hotel.pricePerNight}</p>
            </div>
        </NavLink>
    );
};
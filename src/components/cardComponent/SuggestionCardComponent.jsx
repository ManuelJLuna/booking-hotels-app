import { NavLink } from 'react-router';
import './suggestionCardComponentStyles.css';


export const CardComponent = ( {hotel} ) => {
    return (
        <NavLink className='cardComponent' to={`/hotel/${hotel.id}`} rel="noopener noreferrer" href="#">
            <img src={`http://localhost:8080${hotel.photos[0]}`} alt={hotel.hotelName} className='cardHotelImage'/>
            <div className='cardContent'>
                <h3 className='cardHotelName'>{hotel.hotelName}</h3>
                <p className='description'>{hotel.hotelDescription}</p>
                <p className='price'>Precio: ${hotel.pricePerNight}</p>
            </div>
        </NavLink>
    );
};
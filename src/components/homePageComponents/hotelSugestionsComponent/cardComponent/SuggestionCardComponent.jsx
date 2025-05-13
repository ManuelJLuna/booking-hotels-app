import './suggestionCardComponentStyles.css';


export const CardComponent = ( {hotel} ) => {
    return (
        <a className='cardComponent' href="https://www.google.com" target="_blank" rel="noopener noreferrer">
            <img src={hotel.photos} alt={hotel.hotelName} className='cardHotelImage'/>
            <div className='cardContent'>
                <h3 className='cardHotelName'>{hotel.hotelName}</h3>
                <p className='description'>{hotel.hotelDescription}</p>
                <p className='price'>Precio: ${hotel.pricePerNight}</p>
            </div>
        </a>
    );
};
import { NavLink } from 'react-router';
import './suggestionCardComponentStyles.css';
import { useContext } from 'react';
import { HotelContext } from '../../context/hotelContext/HotelContext';
import { ReviewContext } from '../../context/reviewContext/ReviewContext';

// Recives the hotel from the father
export const CardComponent = ({ hotel }) => {

    //Gets the favouriteHotels form the HotelContext
    const { favouriteHotels } = useContext(HotelContext) ?? [];
    //Parses the favouriteHotels to an array
    let favouriteHotelsCheck = Array.isArray(favouriteHotels) ? favouriteHotels : [favouriteHotels];
    //Checks if this hotel is in the array
    let isFavourite = favouriteHotelsCheck.some(hotels => hotels.id === hotel.id);

    //Gets the reviews from the ReviewContext
    const { reviews } = useContext(ReviewContext) ?? [];
    //Parses the reviews to an array where it filters the reviews from this hotel
    const hotelReviews = Array.isArray(reviews)
        ? reviews.filter(review => review.hotel && review.hotel.id === hotel.id)
        : [];

    //Does the avarage of the ratings
    const rating = () => {
        let numberToDivide = 0;
        let sumOfRatings = 0;
        for (let i = 0; i < hotelReviews.length; i++) {
            sumOfRatings += hotelReviews[i].rating;
            numberToDivide++;
        }
        return numberToDivide > 0 ? sumOfRatings / numberToDivide : NaN;
    };

    //Saves the rating
    const ratingNumber = rating();

    return (
        <NavLink className='cardComponent' to={`/hotel/${hotel.id}`} rel="noopener noreferrer">
            <img src={`http://localhost:8080${hotel.photos[0]}`} alt={hotel.hotelName} className='cardHotelImage' />
            <div className='cardContent'>
                <p className='HotelCardRating'>
                    {!isNaN(ratingNumber) ? ratingNumber.toFixed(1) + " " : " "}
                    {ratingNumber > 0 ? <i class='bx bxs-star' /> : " "}
                </p>
                <h3 className='cardHotelName'>
                    {hotel.hotelName}
                    <i className={`bx ${isFavourite ? "bxs-heart activeHeart" : "bx-heart"}` /**If the hotel is favourite the heart activates */} />
                </h3>
                <p className='description'>{hotel.hotelDescription}</p>
                <p className='price'>Precio: ${hotel.pricePerNight}</p>
            </div>
        </NavLink>
    );
};
import { useParams } from 'react-router'
import './ratingPageStyles.css'
import { useContext } from 'react';
import { ReviewContext } from '../../context/reviewContext/ReviewContext';
import { RatingComponent } from './RatingComponent';

export const RatingPage = () => {

    const { id } = useParams()

    const { reviews } = useContext(ReviewContext) ?? [];

    const hotelReviews = Array.isArray(reviews)
        ? reviews.filter(review => review.hotel && review.hotel.id === parseInt(id))
        : [];

    return (
  <>
    {hotelReviews.length > 0 ? (
      hotelReviews.map((review, index) => (
        <RatingComponent key={index} review={review} />
      ))
    ) : (
      <p className="noReviewsText">No hay reseñas</p>
    )}
  </>
);

}
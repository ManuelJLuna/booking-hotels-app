export const RatingComponent = ({ review }) => {

    return (
        <div className='reviewContainer' >
            <p className='ratingFromRating'>{review.rating.toFixed(1)} <i class='bx bxs-star' /></p>
            <p className='comment'>{review.comment.trim()}</p>
        </div >
    )

}
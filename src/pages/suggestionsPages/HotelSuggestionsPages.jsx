import { useMemo } from 'react';
import { CardComponent } from '../../components/cardComponent/SuggestionCardComponent';
import './hotelSuggestionsPages.css'

export const HotelSuggestionsPages = ( {pageNumber, hotels} ) => {

    // Hotels get by params from the father component. If there are no hotels, set it to an empty array
    const hotelsRecived = hotels || [];

    // Shuffles the hotels array to show all the hotels in a random unpredictable order using the Maths library
    // Uses useMemo to avoid recalculating the shuffled array on evry render
    const shuffledHotels = useMemo(() => { return [...hotelsRecived].sort(() => Math.random() - 0.5)}, [hotelsRecived]);

    // Uses the pageNumber to get the hotels to show. Each page shows 10 hotels
    // Saves in a variable (i) the index of the hotels to show (ex: if pageNumber=2, i=20)
    let i = pageNumber * 10;

    return (
        <>
        {shuffledHotels.length > 0 && (
                    shuffledHotels
                    .slice(Math.max(0, i - 10), i) // slices the array to show only 10 hotels. (ex: i=20, i-10=10[first hotel to show])
                    .map(hotel => (
                            <CardComponent
                                hotel={hotel}
                                key={hotel.id}
                            />
                    ))
                )}
        </>
    )

}
import { useMemo } from 'react';
import { CardComponent } from '../../components/cardComponent/SuggestionCardComponent';
import './hotelSuggestionsPages.css'

export const HotelSuggestionsPages = ( {pageNumber, hotels} ) => {

    const hotelsRecived = hotels || [];
    const shuffledHotels = useMemo(() => { return [...hotelsRecived].sort(() => Math.random() - 0.5)}, [hotelsRecived]);
    let i = pageNumber * 10;

    return (
        <>
        {shuffledHotels.length > 0 && (
                    shuffledHotels
                    .slice(Math.max(0, i - 10), i)
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
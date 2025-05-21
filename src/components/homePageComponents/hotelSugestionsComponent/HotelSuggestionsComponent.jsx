import { useContext, useState } from 'react';
import { HotelSuggestionsPages } from '../../../pages/suggestionsPages/hotelSuggestionsPages'
import { HotelContext } from '../../../context/hotelContext/HotelContext';
import './hotelSuggestionsComponentStyles.css'

export const HotelSuggestionsComponent = () => {

    const context = useContext(HotelContext);
    const hotels = context?.hotels || [];
    
    const [pageNumber, setPageNumber] = useState(1);

    const handleNext = () => {
        if (hotels.length > (pageNumber * 10 +1)) {
            setPageNumber(pageNumber + 1);
        }
    }

    const handlePrev = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    };


    return (
        <div className='hotelsSuggestions'>
            {hotels.length > 0 ? (
                <>
                    <h2>Hoteles recomendados</h2>
                    <div className='hotelsSuggestionsContainer'>
                        <HotelSuggestionsPages pageNumber={pageNumber} hotels={hotels} />
                    </div>
                    <div className='hotelsSuggestionsPagesContainer'>
                        <button onClick={handlePrev}>
                            <i className='bx bxs-left-arrow' />
                        </button>
                        <p>{pageNumber > 1 && pageNumber - 1} <b>{pageNumber}</b> {hotels.length > (pageNumber * 10 +1) ? pageNumber + 1 + ' ...' : '...'} </p>
                        <button onClick={handleNext}>
                            <i className='bx bxs-right-arrow' />
                        </button>
                    </div>
                </>
            ) : (
                <div className='hotelsSuggestionsContainer'>
                <p>No hay hoteles disponibles</p>
                </div>
            )}
        </div>
    );
}
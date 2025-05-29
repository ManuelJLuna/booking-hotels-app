import { useContext, useState } from 'react';
import { HotelSuggestionsPages } from '../../../pages/suggestionsPages/hotelSuggestionsPages'
import { HotelContext } from '../../../context/hotelContext/HotelContext';
import './hotelSuggestionsComponentStyles.css'

export const HotelSuggestionsComponent = () => {

    // Imports the hotelContext
    const context = useContext(HotelContext);

    // Checks if the context is null. If it is, it parses the context to an empty array
    const hotels = context?.hotels || [];

    // Uses a state to manage the page number
    // Sets the initial page number to 1
    const [pageNumber, setPageNumber] = useState(1);

    // Sets the page number to 1 more than the current page number
    const handleNext = () => {
        if (hotels.length > (pageNumber * 10 + 1)) { // Checks if there are more hotels to show 
            setPageNumber(pageNumber + 1); // If there are then it allows to go to the next page
        } // Else it does nothing
    }

    // Sets the page number to 1 less than the current page number
    const handlePrev = () => {
        if (pageNumber > 1) { // Checks if page number is greater than 1. 'Cause there is no page 0 or negative pages
            setPageNumber(pageNumber - 1); // If it is then it allows to go to the previous page
        } // Else it does nothing
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
                        <p>{pageNumber > 1 && pageNumber - 1} <b>{pageNumber}</b> {hotels.length > (pageNumber * 10 + 1) ? pageNumber + 1 + ' ...' : '...'} </p>
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
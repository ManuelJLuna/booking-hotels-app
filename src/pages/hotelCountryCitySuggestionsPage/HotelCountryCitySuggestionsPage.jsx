import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { CardComponent } from "../../components/cardComponent/SuggestionCardComponent";
import './hotelCountryCityuggestionPageStyles.css';

export const HotelCountryCitySuggestionsPage = () => {

  // API URL
  const URL_BASE = "http://localhost:8080/hotel/citycountry";

  // Uses params to get the city or/and country from the URL
  const { citycountry } = useParams();

  // Uses state to manage the hotels state
  const [hotels, setHotels] = useState([]);

  // Uses state to manage the loading state
  const [loading, setLoading] = useState(true);

  // Uses state to manage the error state
  const [error, setError] = useState(null);

  // Fetches the hotels from the API
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`${URL_BASE}/${citycountry}`); // Uses the API URL and the cityCountry variable
        if (!response.ok) {
          throw new Error("No se encontraron hoteles en " + citycountry);
        }
        const data = await response.json(); // Parses the response to JSON and saves it in the data variable
        // Sets the hotels state with the data recived from the API
        setHotels(Array.isArray(data) ? data : [data]); // If data is an array, set it as is. Else create an array with the data content
      } catch (error) {
        setError("No se encontraron hoteles en " + citycountry); // Sets the error state with the error message
        setHotels([]);
      } finally {
        setLoading(false); // Sets the loading to false so the loading message is not shown
      }
    };

    fetchHotel();
  }, [citycountry]);

  if (loading) return <p>Cargando hoteles...</p>; // If loading is true, show the loading message
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>; // If there is an error, show the error message

  // Else, show the hotels
  return (
    <div className="hotelTypeSuggestionsContainer">
      <h1>Hoteles en: {citycountry}</h1>
      {hotels.length === 0 ? (
        <p>No hay hoteles registrados en {citycountry}.</p>
      ) : (
        <div className="hotelCardsContainer">
          {hotels.map((hotel) => (
            <CardComponent
              hotel={hotel}
              key={hotel.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};
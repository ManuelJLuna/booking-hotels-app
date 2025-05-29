import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { CardComponent } from "../../components/cardComponent/SuggestionCardComponent";
import './hotelTypeSuggestionPageStyles.css';

export const HotelTypeSuggestionsPage = () => {

  // API URL
  const URL_BASE = "http://localhost:8080/hotel/category";

  // Uses params to get the category from the URL
  const { category } = useParams();

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
        const response = await fetch(`${URL_BASE}/${category}`); // Uses the API URL and the category variable
        if (!response.ok) {
          throw new Error("No se encontraron hoteles del tipo " + category);
        }
        const data = await response.json(); // Parses the response to JSON and saves it in the data variable
        setHotels(Array.isArray(data) ? data : [data]); // If data is an array, set it as is. Else create an array with the data content
      } catch (error) {
        console.error(error);
        setError("No se encontraron hoteles del tipo " + category); // If there is an error, set the error message
      } finally {
        setLoading(false); // Sets the loading to false so the loading message is not shown
      }
    };

    fetchHotel();
  }, [category]);

  if (loading) return <p>Cargando hoteles...</p>; // If loading is true, show the loading message
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>; // If there is an error, show the error message

  // Else, show the hotels
  return (
    <div className="hotelTypeSuggestionsContainer">
      <h1>Hoteles del tipo: {category}</h1>
      {hotels.length === 0 ? (
        <p>No hay hoteles registrados de este tipo.</p>
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
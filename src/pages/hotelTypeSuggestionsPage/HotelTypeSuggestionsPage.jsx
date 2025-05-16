import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { CardComponent } from "../../components/cardComponent/SuggestionCardComponent";
import './hotelTypeSuggestionPageStyles.css';

export const HotelTypeSuggestionsPage = () => {
  const URL_BASE = "http://localhost:8080/hotel/category";
  const { category } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`${URL_BASE}/${category}`);
        if (!response.ok) {
          throw new Error("No se encontraron hoteles del tipo " + category);
        }
        const data = await response.json();
        console.info(data)
        setHotels(Array.isArray(data) ? data : [data]);
      } catch (error) {
        setError("No se encontraron hoteles del tipo " + category);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [category]);

  if (loading) return <p>Cargando hoteles...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

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
            />
          ))}
        </div>
      )}
    </div>
  );
};
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import { CardComponent } from "../../components/cardComponent/SuggestionCardComponent";
import './hotelCountryCityuggestionPageStyles.css';

export const HotelCountryCitySuggestionsPage = () => {
  const URL_BASE = "http://localhost:8080/hotel/citycountry";
  const { citycountry } = useParams();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`${URL_BASE}/${citycountry}`);
        if (!response.ok) {
          throw new Error("No se encontraron hoteles en " + citycountry);
        }
        const data = await response.json();
        console.info(data)
        setHotels(Array.isArray(data) ? data : [data]);
      } catch (error) {
        setError("No se encontraron hoteles en " + citycountry);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [citycountry]);

  if (loading) return <p>Cargando hoteles...</p>;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

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
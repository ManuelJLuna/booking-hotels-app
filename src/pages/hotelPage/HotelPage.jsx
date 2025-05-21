import { useParams } from "react-router";
import "./hotelPageStyles.css";
import { useEffect, useState } from "react";

export const HotelPage = () => {
    const URL_BASE = "http://localhost:8080/hotel";
    const { id } = useParams();
    const [hotelPreview, setHotelPreview] = useState(null);
    const [hotelImageId, setHotelImageId] = useState(0);

    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await fetch(`${URL_BASE}/${id}`);
                if (!response.ok) {
                    throw new Error('Error fetching hotel data');
                }
                const data = await response.json();
                setHotelPreview(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchHotel();
    }, [id]);

    const nextImage = () => {
        if (hotelImageId < hotelPreview.photos.length - 1) {
            setHotelImageId(hotelImageId + 1);
        } else {
            setHotelImageId(0);
        }
    };

    const previousImage = () => {  
        if (hotelImageId > 0) {
            setHotelImageId(hotelImageId - 1);
        } else {
            setHotelImageId(hotelPreview.photos.length - 1);
        }
    };

    if (!hotelPreview) return <p>Cargando hotel...</p>;

    return (
        <div className="hotelPage">
            <button className="backArrow" onClick={() => history.back()} ><i className='bx bx-arrow-back'/></button>
            <div className="HotelPageAllInfoContainer">
                <div className="hotelPageImageAndImageButtons">
                    <div className="hotelPageContainerImage">
                        <img src={`http://localhost:8080${hotelPreview.photos[hotelImageId]}`} alt={hotelPreview.hotelName} />
                    </div>
                    <div className="hotelPageContainerImageButtons">
                    <button onClick={previousImage}><i className='bx bxs-left-arrow' /></button>
                    <button onClick={nextImage}><i className='bx bxs-right-arrow' /></button>
                    </div>
                </div>
                <div className="hotelPageContainerGeneralInfo">
                    <div className="HotelPageGeneralInfoHeader">
                        <h1>{hotelPreview.hotelName}</h1>
                        <p>{hotelPreview.hotelDescription}</p>
                    </div>
                    <div className="HotelPageGeneralInfo">
                        <h2>Información del {hotelPreview.hotelType}</h2>
                        <p><i className='bx bx-map' /> Dirección: {hotelPreview.hotelAddress}</p>
                        <p>Ciudad: {hotelPreview.hotelCity}</p>
                        <p>País: {hotelPreview.hotelCountry}</p>
                        <p><i className='bx bxs-phone' /> Teléfono: {hotelPreview.hotelPhone}</p>
                        <a href={`mailto:${hotelPreview.hotelEmail}`}><i className='bx bxs-envelope' /> Email: {hotelPreview.hotelEmail}</a>
                        <p>Sitio web: <a href={hotelPreview.hotelWebsite} target="_blank">{hotelPreview.hotelWebsite}</a></p>
                        <p><i className='bx bxs-purchase-tag' /> Precio por noche: ${hotelPreview.pricePerNight}</p>
                    </div>
                    <button className="bookHotelButton">Reservar</button>
                </div>
            </div>

            <div className="hotelPageContainerServices">
                <h2>Servicios disponibles</h2>
                <ul className="hotelPageContainerServicesList">
                    {hotelPreview.wifi && <li><i className='bx bx-wifi' /> Wifi</li>}
                    {hotelPreview.parking && <li><i className='bx bxs-car' /> Estacionamiento</li>}
                    {hotelPreview.pool && <li><i className='bx bx-swim' /> Piscina</li>}
                    {hotelPreview.gym && <li><i className='bx bx-dumbbell' /> Gimnasio</li>}
                    {hotelPreview.restaurant && <li><i className='bx bxs-food-menu' /> Restaurante</li>}
                    {hotelPreview.spa && <li><i className='bx bxs-spa' /> Spa</li>}
                    {hotelPreview.bar && <li><i className='bx bxs-beer' /> Bar</li>}
                    {hotelPreview.laundry && <li><i className='bx bxs-washer' /> Lavandería</li>}
                    {hotelPreview.roomService && <li><i className='bx bxs-bed' /> Servicio a la habitación</li>}
                    {hotelPreview.conferenceRoom && <li><i className='bx bxs-microphone' /> Sala de conferencias</li>}
                </ul>
            </div>
        </div>
    );
};
import { useParams } from "react-router";
import "./hotelPageStyles.css";
import { useContext, useEffect, useState } from "react";
import { HotelContext } from "../../context/hotelContext/HotelContext";
import { UserContext } from "../../context/userContext/UserContext";

export const HotelPage = () => {

    // API URL
    const URL_BASE = "http://localhost:8080/hotel";

    // Uses params to get the hotel ID from the URL. This ID is used to fetch a specific hotel
    const { id } = useParams();

    // Imports the reservedHotels from the context
    const { reservedHotels, setReservedHotels } = useContext(HotelContext)

    // Uses state to manage the hotel data that will be shown
    const [hotelPreview, setHotelPreview] = useState(null);

    // Uses the userContext to see if the user is loged in and upload the reservedHotels
    const userContext = useContext(UserContext);
    const logedUser = userContext.logedUser;

    // Uses state to manage the current image index
    // This index is used to show the current image of the hotel
    // The index is set to 0 by default. That is the first image of the hotel
    const [hotelImageId, setHotelImageId] = useState(0);

    // Fetches the hotel data from the API using the hotel ID
    useEffect(() => {
        const fetchHotel = async () => {
            try {
                const response = await fetch(`${URL_BASE}/${id}`);
                if (!response.ok) {
                    throw new Error('Error fetching hotel data');
                }
                const data = await response.json();
                setHotelPreview(data); // Sets the hotel data to the state wich'll be shown
            } catch (error) {
                console.error(error);
            }
        };

        fetchHotel();
    }, [id]);

    // Allows the user to see the next image of the hotel
    const nextImage = () => {
        if (hotelImageId < hotelPreview.photos.length - 1) { // Checks if the current image is not the last one
            setHotelImageId(hotelImageId + 1); // If it's not then it allows to go to the next image
        } else {
            setHotelImageId(0); // Else it goes to the first image
        }
    };

    // Allows the user to see the previous image of the hotel
    const previousImage = () => {
        if (hotelImageId > 0) { // Checks if the current image is not the first one
            setHotelImageId(hotelImageId - 1); // If it's not then it allows to go to the previous image
        } else {
            setHotelImageId(hotelPreview.photos.length - 1); // Else it goes to the last image
        }
    };

    // Handles the reservation of the hotel
    const hotelReservationHandle = () => {
        if (!logedUser) return;
        let reservedHotelsCheck = Array.isArray(reservedHotels) ? reservedHotels : [reservedHotels];
        if (reservedHotelsCheck.length > 0) {
            for (let i = 0; i < reservedHotelsCheck.length; i++) {
                const element = reservedHotelsCheck[i];
                if (element && element.id === hotelPreview.id) {
                    setReservedHotels(prevHotels => {
                        const updatedHotels = Array.isArray(prevHotels)
                            ? prevHotels.filter(hotel => hotel.id !== hotelPreview.id)
                            : [];
                        return updatedHotels
                    });
                    return;
                };
            }
        }
        setReservedHotels(prevHotels => {
            const updatedHotels = Array.isArray(prevHotels)
                ? [...prevHotels, hotelPreview]
                : [hotelPreview];
            return updatedHotels;
        });
        let userObject = logedUser;
        userObject.reservedHotels = reservedHotels;
        userContext.updateUser(userObject);
        userContext.setLogedUser(userObject);
    }

    const handleReservationButtonText = () => {
        let reservedHotelsCheck = Array.isArray(reservedHotels) ? reservedHotels : [reservedHotels];
        if (reservedHotelsCheck.length > 0) {
            for (let i = 0; i < reservedHotelsCheck.length; i++) {
                const element = reservedHotelsCheck[i];
                if (element && element.id === hotelPreview.id) return "Anular reserva";
            }
        }
        return "Reservar";
    }

    // If the hotel data is not loaded, it shows a loading message
    if (!hotelPreview) return <p>Cargando hotel...</p>;

    // Else it shows the hotel data and page
    return (
        <div className="hotelPage">
            <button className="backArrow" onClick={() => history.back()} ><i className='bx bx-arrow-back' /></button>
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
                    <button className="bookHotelButton" onClick={hotelReservationHandle}>{handleReservationButtonText()}</button>
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
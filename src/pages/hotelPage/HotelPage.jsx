import { useNavigate, useParams } from "react-router";
import "./hotelPageStyles.css";
import { useContext, useEffect, useState } from "react";
import { HotelContext } from "../../context/hotelContext/HotelContext";
import { UserContext } from "../../context/userContext/UserContext";
import { ReviewContext } from "../../context/reviewContext/ReviewContext";

export const HotelPage = () => {

    // API URL
    const URL_BASE = "http://localhost:8080/hotel";

    // Uses params to get the hotel ID from the URL. This ID is used to fetch a specific hotel
    const { id } = useParams();

    // Imports the reservedHotels and favouriteHotels from the context
    const { bookedHotels, setBookedHotels, favouriteHotels, setFavouriteHotels } = useContext(HotelContext)

    // Uses state to manage the hotel data that will be shown
    const [hotelPreview, setHotelPreview] = useState(null);

    // Uses the userContext to see if the user is loged in and upload the bookedHotels
    const userContext = useContext(UserContext);
    const logedUser = userContext.logedUser;

    const navigate = useNavigate()

    // Uses state to manage the current image index
    // This index is used to show the current image of the hotel
    // The index is set to 0 by default. That is the first image of the hotel
    const [hotelImageId, setHotelImageId] = useState(0);

    // Consts to share the page
    const pageUrl = encodeURIComponent(window.location.href);
    const text = encodeURIComponent("¡Echa un vistazo a esta hotel!");

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

        navigate(`/book/${parseInt(id)}`)
    }


    const hotelFavouriteHandle = () => {
        if (!logedUser) return;

        let favouriteHotelsCheck = Array.isArray(favouriteHotels) ? favouriteHotels : [favouriteHotels];
        let alreadyFavourite = favouriteHotelsCheck.some(hotel => hotel.id === hotelPreview.id);

        let updatedHotels;
        if (alreadyFavourite) {
            updatedHotels = favouriteHotelsCheck.filter(hotel => hotel.id !== hotelPreview.id);
        } else {
            updatedHotels = [...favouriteHotelsCheck, hotelPreview];
        }

        setFavouriteHotels(updatedHotels);

        const updatedUser = { ...logedUser, favouriteHotels: updatedHotels };
        userContext.updateUser(updatedUser);
        userContext.setLogedUser(updatedUser);
    }

    const handleHeartButton = () => {
        let favouriteHotelsCheck = Array.isArray(favouriteHotels) ? favouriteHotels : [favouriteHotels];
        let alreadyFavourite = favouriteHotelsCheck.some(hotel => hotel.id === hotelPreview.id);
        if (alreadyFavourite) {
            return (<i className="bx bxs-heart activeHeart" />)
        }

    else {
        return (<i className="bx bx-heart" />);
    }
}

const { reviews } = useContext(ReviewContext) ?? [];

const hotelReviews = Array.isArray(reviews)
    ? reviews.filter(review => review.hotel && review.hotel.id === parseInt(id))
    : [];

const rating = () => {
    let numberToDivide = 0;
    let sumOfRatings = 0;
    for (let i = 0; i < hotelReviews.length; i++) {
        sumOfRatings += hotelReviews[i].rating;
        numberToDivide++;
    }
    return numberToDivide > 0 ? sumOfRatings / numberToDivide : NaN;
};

const ratingNumber = rating();

// If the hotel data is not loaded, it shows a loading message
if (!hotelPreview) return <p>Cargando hotel...</p>;

// Else it shows the hotel data and page
return (
    <div className="hotelPage">
        <button className="backArrow" onClick={() => history.back()} ><i className='bx bx-arrow-back' /></button>
        <button className="heartButton" onClick={hotelFavouriteHandle}>{handleHeartButton()}</button>
        <div className="shareContainer shareContainerInvisible">
            <a href={`https://wa.me/?text=${text}%20${pageUrl}`} target="_blank"><i className='bx bxl-whatsapp' /></a>
            <a href="https://www.instagram.com" target="_blank"><i className='bx bxl-instagram' /></a>
            <a href={`https://twitter.com/intent/tweet?url=${pageUrl}&text=${text}`} target="_blank"><i className='bx bxl-twitter' /></a>
            <a href={`https://pinterest.com/pin/create/button/?url=${pageUrl}&description=${text}`} target="_blank"><i className='bx bxl-pinterest' /></a>
        </div>
        <button className="shareButton" onClick={() => {
            document.querySelector('.shareContainer').classList.toggle('shareContainerInvisible')
        }}><i class='bx bxs-share-alt' /></button>
        <a onClick={() => navigate(`/ratings/${id}`)} className="rating">{!isNaN(ratingNumber) ? ratingNumber.toFixed(1) + " " : " "}
            {ratingNumber > 0 ? <i class='bx bxs-star'/> : " "}
            {ratingNumber > 0 ? <i class='bx bx-right-arrow-alt'/> : " "}
            </a>
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
                    <p><i className='bx bxl-whatsapp' /> <a target="_blank" href={`https://wa.me/${hotelPreview.hotelPhone}`}>WhatsApp: {hotelPreview.hotelPhone}</a></p>
                    <a href={`mailto:${hotelPreview.hotelEmail}`}><i className='bx bxs-envelope' /> Email: {hotelPreview.hotelEmail}</a>
                    <p>Sitio web: <a href={hotelPreview.hotelWebsite} target="_blank">{hotelPreview.hotelWebsite}</a></p>
                    <p><i className='bx bxs-purchase-tag' /> Precio por noche: ${hotelPreview.pricePerNight}</p>
                </div>
                <button className="rateHotelButton" onClick={() => navigate(`/rateProduct/${id}`)}>Dejar una reseña</button>
                <button className="bookHotelButton" onClick={hotelReservationHandle}>Reservar</button>
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
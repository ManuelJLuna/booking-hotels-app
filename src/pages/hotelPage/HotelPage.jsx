import "./hotelPageStyles.css"

const hotelpreviw = { // Hotel hardcodeado TODO: Eliminar cuando se tenga la pagina completa
    hotelName: "Pedro Alcachofa",
    pricePerNight: 50,
    hotelType: "Hotel",
    hotelAddress: "Av Santa Fe 1234",
    hotelCity: "Buenos Aires",
    hotelCountry: "Argentina",
    hotelPhone: 123456789,
    hotelEmail: "palcachofa@gmail.com",
    hotelWebsite: "https://www.palcachofa.com",
    hotelDescription: "Muy buen hotel, con buena comida y buen servicio",
    wifi: true,
    parking: true,
    pool: true,
    gym: true,
    restaurant: true,
    spa: true,
    bar: true,
    laundry: true,
    roomService: true,
    conferenceRoom: true,
    photos: "src/assets/icon.png",
}

export const HotelPage = () => {
    return (
        <div className="hotelPage">
            <div className="HotelPageAllInfoContainer">
                <div className="hotelPageContainerImage">
                    <img src={hotelpreviw.photos} alt={hotelpreviw.hotelName} />
                </div>
                <div className="hotelPageContainerGeneralInfo">
                    <div className="HotelPageGeneralInfoHeader">
                    <h1>{hotelpreviw.hotelName}</h1>
                    <p>{hotelpreviw.hotelDescription}</p>
                    </div>
                    <div className="HotelPageGeneralInfo">
                    <h2>Información del {hotelpreviw.hotelType}</h2>
                    <p>Dirección<i class='bx bx-map'/>:  {hotelpreviw.hotelAddress}</p>
                    <p>Ciudad: {hotelpreviw.hotelCity}</p>
                    <p>País: {hotelpreviw.hotelCountry}</p>
                    <p>Teléfono<i class='bx bxs-phone' />: {hotelpreviw.hotelPhone}</p>
                    <p>Email<i class='bx bxs-envelope' />: {hotelpreviw.hotelEmail}</p>
                    <p>Sitio web: <a href={hotelpreviw.hotelWebsite}>{hotelpreviw.hotelWebsite}</a></p>
                    <p>Precio por noche<i class='bx bxs-purchase-tag' />: ${hotelpreviw.pricePerNight}</p>
                    </div>
                    <button className="bookHotelButton">Reservar</button>
                </div>

                </div>
                <div className="hotelPageContainerServices">
                    <h2>Servicios disponibles</h2>
                    <div>
                        <ul className="hotelPageContainerServicesList">
                            {hotelpreviw.wifi && <li> <i class='bx bx-wifi' />Wifi</li>}
                            {hotelpreviw.parking && <li> <i class='bx bxs-car' />Estacionamiento</li>}
                            {hotelpreviw.pool && <li> <i class='bx bx-swim' />Piscina</li>}
                            {hotelpreviw.gym && <li> <i class='bx bx-dumbbell' />Gimnasio</li>}
                            {hotelpreviw.restaurant && <li> <i class='bx bxs-food-menu' />Restaurante</li>}
                            {hotelpreviw.spa && <li> <i class='bx bxs-spa' />Spa</li>}
                            {hotelpreviw.bar && <li> <i class='bx bxs-beer' />Bar</li>}
                            {hotelpreviw.laundry && <li> <i class='bx bxs-washer' />Lavandería</li>}
                            {hotelpreviw.roomService && <li> <i class='bx bxs-bed' />Servicio a la habitación</li>}
                            {hotelpreviw.conferenceRoom && <li> <i class='bx bxs-microphone' />Sala de conferencias</li>}
                        </ul>
                        </div>
            </div>
        </div>
    )
}
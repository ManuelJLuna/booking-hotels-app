import './registerNewHotelPageStyles.css';

export const RegisterNewHotelPage = () => {
    return (
        <div className="registerNewHotelPage">
            <h1>Registrar nuevo Hotel</h1>
            <form>
                <label htmlFor="hotelName">Nombre del Hotel</label>
                <input className='registerNewHotelInput' type="text" name="hotelName" id="hotelName" />
                <label htmlFor="hotelAddress">Dirección del Hotel</label>
                <input className='registerNewHotelInput' type="text" name="hotelAddress" id="hotelAddress" />
                <label htmlFor="hotelCity">Ciudad</label>
                <input className='registerNewHotelInput' type="text" name="hotelCity" id="hotelCity" />
                <label htmlFor="hotelCountry">País</label>
                <input className='registerNewHotelInput' type="text" name="hotelCountry" id="hotelCountry" />
                <label htmlFor="hotelPhone">Teléfono</label>
                <input className='registerNewHotelInput' type="text" name="hotelPhone" id="hotelPhone" />
                <label htmlFor="hotelEmail">Email</label>
                <input className='registerNewHotelInput' type="email" name="hotelEmail" id="hotelEmail" />
                <label htmlFor="hotelWebsite">Página Web</label>
                <input className='registerNewHotelInput' type="url" name="hotelWebsite" id="hotelWebsite" />
                <label htmlFor="hotelDescription">Descripción</label>
                <textarea name="hotelDescription" id="hotelDescription" cols="30" rows="10" maxLength={516}></textarea>
                <div className="hotelServices">
                    <label htmlFor='wifi:'>Wi-Fi:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="Wi-Fi:" value="wifi" />

                    <label htmlFor='parking'>Estacionamiento:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="parking" value="parking" />

                    <label htmlFor='pool'>Piscina:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="pool" value="pool" />

                    <label htmlFor='gym'>Gimnasio:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="gym" value="gym" />

                    <label htmlFor='restaurant'>Restaurante:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="restaurant" value="restaurant" />

                    <label htmlFor='spa'>Spa:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="spa" value="spa" />

                    <label htmlFor='bar'>Bar:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="bar" value="bar" />

                    <label htmlFor='laundry'>Lavandería:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="laundry" value="laundry" />

                    <label htmlFor='roomService'>Servicio a la habitación:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="roomService" value="roomService" />

                    <label htmlFor='conferenceRoom'>Sala de conferencias:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="conferenceRoom" value="conferenceRoom" />
                </div>

                <label>Fotos:</label>
                <input className='registerNewHotelInput' type="file" multiple/>

                <button type="submit" className="submitButton">Registrar Hotel</button>
            </form>
        </div>
    )
}
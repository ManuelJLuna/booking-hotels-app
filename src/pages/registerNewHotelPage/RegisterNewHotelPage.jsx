import './registerNewHotelPageStyles.css';
import { useState } from 'react';
import { HotelContext } from '../../context/hotelContext/HotelContext';
import { useContext } from 'react';

export const RegisterNewHotelPage = () => {
    const { addHotel } = useContext(HotelContext);
    const [form, setForm] = useState({
        hotelName: '',
        hotelAddress: '',
        hotelCity: '',
        hotelCountry: '',
        hotelPhone: '',
        hotelEmail: '',
        hotelWebsite: '',
        hotelDescription: '',
        services: [],
        photos: []
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        if (type === 'checkbox') {
            setForm((prev) => ({
                ...prev,
                services: checked
                    ? [...prev.services, value]
                    : prev.services.filter((s) => s !== value)
            }));
        } else if (type === 'file') {
            setForm((prev) => ({
                ...prev,
                photos: Array.from(files)
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const hotel = {
            hotelName: form.hotelName,
            hotelAddress: form.hotelAddress,
            hotelCity: form.hotelCity,
            hotelCountry: form.hotelCountry,
            hotelPhone: parseInt(form.hotelPhone),
            hotelEmail: form.hotelEmail,
            hotelWebsite: form.hotelWebsite,
            hotelDescription: form.hotelDescription,
            pricePerNight: form.pricePerNight,
            hotelType: form.hotelType,
            wifi: form.services.includes("wifi"),
            parking: form.services.includes("parking"),
            pool: form.services.includes("pool"),
            gym: form.services.includes("gym"),
            restaurant: form.services.includes("restaurant"),
            spa: form.services.includes("spa"),
            bar: form.services.includes("bar"),
            laundry: form.services.includes("laundry"),
            roomService: form.services.includes("roomService"),
            conferenceRoom: form.services.includes("conferenceRoom"),
            photos: "https://via.placeholder.com/150" // o como lo estés manejando
        };

        await addHotel(hotel);
        setForm({
            hotelName: '',
            hotelAddress: '',
            hotelCity: '',
            hotelCountry: '',
            hotelPhone: '',
            hotelEmail: '',
            hotelWebsite: '',
            hotelDescription: '',
            services: [],
            photos: []
        });
    };

    return (
        <div className="registerNewHotelPage">
            <h1>Registrar nuevo Hotel</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="hotelName">Nombre del Hotel</label>
                <input className='registerNewHotelInput' type="text" name="hotelName" id="hotelName" value={form.hotelName} onChange={handleChange} />

                <label htmlFor="hotelAddress">Dirección del Hotel</label>
                <input className='registerNewHotelInput' type="text" name="hotelAddress" id="hotelAddress" value={form.hotelAddress} onChange={handleChange} />

                <label htmlFor="hotelCity">Ciudad</label>
                <input className='registerNewHotelInput' type="text" name="hotelCity" id="hotelCity" value={form.hotelCity} onChange={handleChange} />

                <label htmlFor="hotelCountry">País</label>
                <input className='registerNewHotelInput' type="text" name="hotelCountry" id="hotelCountry" value={form.hotelCountry} onChange={handleChange} />

                <label htmlFor="hotelWebsite">Precio por noche</label>
                <input className='registerNewHotelInput' type="number" name="pricePerNight" id="pricePerNight" value={form.pricePerNight} onChange={handleChange} />
                
                <label htmlFor="hotelWebsite">Tipo de hotel</label>
                <select className='registerNewHotelInputSelect' name="hotelType" id="hotelType" value={form.hotelType} onChange={handleChange} placeholder='Eliga una opcion'>
                    <option className='registerNewHotelInputSelectOption' value={null} disabled selected>Eliga una opcion</option>
                    <option className='registerNewHotelInputSelectOption' value="hotel">Hotel</option>
                    <option className='registerNewHotelInputSelectOption' value="motel">Motel</option>
                    <option className='registerNewHotelInputSelectOption' value="resort">Resort</option>
                    <option className='registerNewHotelInputSelectOption' value="bedandbreakfast">Bed & Breakfast</option>
                </select>

                <label htmlFor="hotelPhone">Teléfono</label>
                <input className='registerNewHotelInput' type="number" name="hotelPhone" id="hotelPhone" value={form.hotelPhone} onChange={handleChange} />

                <label htmlFor="hotelEmail">Email</label>
                <input className='registerNewHotelInput' type="email" name="hotelEmail" id="hotelEmail" value={form.hotelEmail} onChange={handleChange} />

                <label htmlFor="hotelWebsite">Página Web</label>
                <input className='registerNewHotelInput' type="url" name="hotelWebsite" id="hotelWebsite" value={form.hotelWebsite} onChange={handleChange} />
                

                <label htmlFor="hotelDescription">Descripción</label>
                <textarea name="hotelDescription" id="hotelDescription" cols="30" rows="10" maxLength={516} value={form.hotelDescription} onChange={handleChange}></textarea>

                <div className="hotelServices">
                    <label htmlFor='wifi'>Wi-Fi:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="wifi" value="wifi" checked={form.services.includes('wifi')} onChange={handleChange} />

                    <label htmlFor='parking'>Estacionamiento:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="parking" value="parking" checked={form.services.includes('parking')} onChange={handleChange} />

                    <label htmlFor='pool'>Piscina:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="pool" value="pool" checked={form.services.includes('pool')} onChange={handleChange} />

                    <label htmlFor='gym'>Gimnasio:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="gym" value="gym" checked={form.services.includes('gym')} onChange={handleChange} />

                    <label htmlFor='restaurant'>Restaurante:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="restaurant" value="restaurant" checked={form.services.includes('restaurant')} onChange={handleChange} />

                    <label htmlFor='spa'>Spa:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="spa" value="spa" checked={form.services.includes('spa')} onChange={handleChange} />

                    <label htmlFor='bar'>Bar:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="bar" value="bar" checked={form.services.includes('bar')} onChange={handleChange} />

                    <label htmlFor='laundry'>Lavandería:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="laundry" value="laundry" checked={form.services.includes('laundry')} onChange={handleChange} />

                    <label htmlFor='roomService'>Servicio a la habitación:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="roomService" value="roomService" checked={form.services.includes('roomService')} onChange={handleChange} />

                    <label htmlFor='conferenceRoom'>Sala de conferencias:</label>
                    <input className='registerNewHotelInput' type="checkbox" name="conferenceRoom" value="conferenceRoom" checked={form.services.includes('conferenceRoom')} onChange={handleChange} />
                </div>

                <label>Fotos:</label>
                <input className='registerNewHotelInput' type="file" multiple onChange={handleChange} />

                <button type="submit" className="submitButton">Registrar Hotel</button>
            </form>
        </div>
    )
}
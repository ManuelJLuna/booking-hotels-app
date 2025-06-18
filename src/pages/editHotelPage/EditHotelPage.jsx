import './registerNewHotelPageStyles.css';
import { useEffect, useState, useContext } from 'react';
import { HotelContext } from '../../context/hotelContext/HotelContext';
import { useParams } from 'react-router';
import { UserContext } from '../../context/userContext/UserContext';

export const EditHotelPage = () => {

    
    const { logedUser } = useContext(UserContext)
    const { updateHotel } = useContext(HotelContext);
    const [ hotelToEdit, setHotelToEdit ] = useState();
    const { id } = useParams();

    const URL_IMAGES = "http://localhost:8080/hotel/upload";
    const URL_BASE = "http://localhost:8080/hotel";

    const [form, setForm] = useState({
        hotelName: '',
        hotelAddress: '',
        hotelCity: '',
        hotelCountry: '',
        hotelPhone: '',
        hotelEmail: '',
        hotelWebsite: '',
        hotelDescription: '',
        pricePerNight: '',
        hotelType: '',
        services: [],
        photos: []
    });

    const fetchHotelsDataById = async (id) => {
        try {
            const r = await fetch(`${URL_BASE}/${id}`);
            const data = await r.json();
            setHotelToEdit(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (id) {
            fetchHotelsDataById(id);
        }
    }, [id]);

    useEffect(() => {
        if (hotelToEdit) {
            setForm({
                hotelName: hotelToEdit.hotelName || '',
                hotelAddress: hotelToEdit.hotelAddress || '',
                hotelCity: hotelToEdit.hotelCity || '',
                hotelCountry: hotelToEdit.hotelCountry || '',
                hotelPhone: hotelToEdit.hotelPhone || '',
                hotelEmail: hotelToEdit.hotelEmail || '',
                hotelWebsite: hotelToEdit.hotelWebsite || '',
                hotelDescription: hotelToEdit.hotelDescription || '',
                pricePerNight: hotelToEdit.pricePerNight || '',
                hotelType: hotelToEdit.hotelType || '',
                services: [
                    ...(hotelToEdit.wifi ? ['wifi'] : []),
                    ...(hotelToEdit.parking ? ['parking'] : []),
                    ...(hotelToEdit.pool ? ['pool'] : []),
                    ...(hotelToEdit.gym ? ['gym'] : []),
                    ...(hotelToEdit.restaurant ? ['restaurant'] : []),
                    ...(hotelToEdit.spa ? ['spa'] : []),
                    ...(hotelToEdit.bar ? ['bar'] : []),
                    ...(hotelToEdit.laundry ? ['laundry'] : []),
                    ...(hotelToEdit.roomService ? ['roomService'] : []),
                    ...(hotelToEdit.conferenceRoom ? ['conferenceRoom'] : [])
                ],
                photos: hotelToEdit.photos || []
            });
        }
    }, [hotelToEdit]);

    const getHotelByName = async (hotelName) => {
        try {
            const response = await fetch(`http://localhost:8080/hotel/hotelName/${hotelName}`);
            if (!response.ok) throw new Error("No se encontraron hoteles");
            const data = await response.json();
            return (Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    const checkHotelName = async (hotelName) => {
        const hotels = await getHotelByName(hotelName);
        let exists = false;
        hotels.forEach((hotel) => {
            if (hotel.hotelName === hotelName.trim() && hotel.id !== hotelToEdit.id) {
                document.getElementById('hotelNameProblem').classList.add('errorShow');
                exists = true;
            }
        });
        if (!exists) document.getElementById('hotelNameProblem').classList.remove('errorShow');
        return !exists;
    };

    const formCheck = async (form) => {
        let valid = true;

        for (const key of Object.keys(form)) {
            if (key !== 'services' && key !== 'photos') {
                const fieldError = `${key}Error`;
                if (!form[key] || (form[key].trim && form[key].trim() === '')) {
                    document.getElementById(fieldError)?.classList.add('errorShow');
                    valid = false;
                } else {
                    document.getElementById(fieldError)?.classList.remove('errorShow');
                }
            }

            if (key === 'photos' && (!form.photos || form.photos.length === 0)) {
                document.getElementById('photosError').classList.add('errorShow');
                valid = false;
            } else {
                document.getElementById('photosError')?.classList.remove('errorShow');
            }
        }

        const nameAvailable = await checkHotelName(form.hotelName);
        if (!nameAvailable) valid = false;

        return valid;
    };

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;

        if (type === 'checkbox') {
            setForm((prev) => ({
                ...prev,
                services: checked
                    ? [...prev.services, value]
                    : prev.services.filter((s) => s !== value),
            }));
        } else if (type === 'file') {
            setForm((prev) => ({
                ...prev,
                photos: [...prev.photos, ...Array.from(files)],
            }));
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isValid = await formCheck(form);
        if (!isValid) return;

        let imageUrls = [];

        if (form.photos.length > 0) {
            const imageFormData = new FormData();
            form.photos.forEach((photo) => {
                if (typeof photo === 'object') imageFormData.append("files", photo);
            });

            try {
                const response = await fetch(URL_IMAGES, {
                    method: "POST",
                    body: imageFormData,
                });

                if (response.ok) {
                    imageUrls = await response.json();
                } else {
                    console.error("Error al subir las imágenes:", await response.text());
                }
            } catch (error) {
                console.error("Excepción al subir imágenes:", error);
            }
        }

        const hotel = {
            id: hotelToEdit.id,
            hotelName: form.hotelName.trim(),
            hotelAddress: form.hotelAddress.trim(),
            hotelCity: form.hotelCity.trim(),
            hotelCountry: form.hotelCountry.trim(),
            hotelPhone: parseInt(form.hotelPhone),
            hotelEmail: form.hotelEmail.trim(),
            hotelWebsite: form.hotelWebsite.trim(),
            hotelDescription: form.hotelDescription.trim(),
            pricePerNight: parseFloat(form.pricePerNight),
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
            photos: imageUrls.length > 0 ? imageUrls : hotelToEdit.photos
        };

        await updateHotel(hotel);

        setForm({
            hotelName: '',
            hotelAddress: '',
            hotelCity: '',
            hotelCountry: '',
            hotelPhone: '',
            hotelEmail: '',
            hotelWebsite: '',
            hotelDescription: '',
            pricePerNight: '',
            hotelType: '',
            services: [],
            photos: []
        });
    };


    return (
        <>
        {logedUser && logedUser.role == "admin" ?
            <>
            <div className="registerNewHotelPage">
                <h1>Registrar nuevo Hotel</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="hotelName">Nombre del Hotel</label>
                    <input className='registerNewHotelInput' type="text" name="hotelName" id="hotelName" value={form.hotelName} onChange={handleChange} />
                    <p className='error' id='hotelNameError'>Este campo es requerido</p>
                    <p className='error' id='hotelNameProblem'>Ya existe un hotel con ese nombre</p>

                    <label htmlFor="hotelAddress">Dirección del Hotel</label>
                    <input className='registerNewHotelInput' type="text" name="hotelAddress" id="hotelAddress" value={form.hotelAddress} onChange={handleChange} />
                    <p className='error' id='hotelAddressError'>Este campo es requerido</p>

                    <label htmlFor="hotelCity">Ciudad</label>
                    <input className='registerNewHotelInput' type="text" name="hotelCity" id="hotelCity" value={form.hotelCity} onChange={handleChange} />
                    <p className='error' id='hotelCityError'>Este campo es requerido</p>

                    <label htmlFor="hotelCountry">País</label>
                    <input className='registerNewHotelInput' type="text" name="hotelCountry" id="hotelCountry" value={form.hotelCountry} onChange={handleChange} />
                    <p className='error' id='hotelCountryError'>Este campo es requerido</p>

                    <label htmlFor="pricePerNight">Precio por noche</label>
                    <input className='registerNewHotelInput' type="number" name="pricePerNight" id="pricePerNight" value={form.pricePerNight} onChange={handleChange} min={1} />
                    <p className='error' id='pricePerNightError'>Este campo es requerido</p>

                    <label htmlFor="hotelType">Tipo de hotel</label>
                    <select className='registerNewHotelInputSelect' name="hotelType" id="hotelType" value={form.hotelType} onChange={handleChange} placeholder='Eliga una opcion'>
                        <option className='registerNewHotelInputSelectOption' value={null} disabled selected>Eliga una opcion</option>
                        <option className='registerNewHotelInputSelectOption' value="hotel">Hotel</option>
                        <option className='registerNewHotelInputSelectOption' value="motel">Motel</option>
                        <option className='registerNewHotelInputSelectOption' value="resort">Resort</option>
                        <option className='registerNewHotelInputSelectOption' value="bedandbreakfast">Bed & Breakfast</option>
                    </select>
                    <p className='error' id='hotelTypeError'>Este campo es requerido</p>

                    <label htmlFor="hotelPhone">Teléfono</label>
                    <input className='registerNewHotelInput' type="number" name="hotelPhone" id="hotelPhone" value={form.hotelPhone} onChange={handleChange} />
                    <p className='error' id='hotelPhoneError'>Este campo es requerido</p>

                    <label htmlFor="hotelEmail">Email</label>
                    <input className='registerNewHotelInput' type="email" name="hotelEmail" id="hotelEmail" value={form.hotelEmail} onChange={handleChange} />
                    <p className='error' id='hotelEmailError'>Este campo es requerido</p>

                    <label htmlFor="hotelWebsite">Página Web</label>
                    <input className='registerNewHotelInput' type="url" name="hotelWebsite" id="hotelWebsite" value={form.hotelWebsite} onChange={handleChange} />
                    <p className='error' id='hotelWebsiteError'>Este campo es requerido</p>


                    <label htmlFor="hotelDescription">Descripción</label>
                    <textarea name="hotelDescription" id="hotelDescription" cols="30" rows="10" maxLength={516} value={form.hotelDescription} onChange={handleChange}></textarea>
                    <p className='error' id='hotelDescriptionError'>Este campo es requerido</p>

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
                    <input className='registerNewHotelInput' name="photos" type="file" multiple onChange={handleChange} />
                    <p className='error' id='photosError'>Este campo es requerido</p>

                    <button type="submit" className="submitButton">Registrar Hotel</button>
                </form>
            </div>
            <p className='onlyPCPage'>Esta pagina solo esta disponible en PC</p>
            </>
            : <p className='onlyPCPage'>Inicia sesion en una cuenta admin</p>
        }
        </>
    )
}
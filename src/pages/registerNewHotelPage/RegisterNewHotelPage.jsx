import './registerNewHotelPageStyles.css';
import { useState } from 'react';
import { HotelContext } from '../../context/hotelContext/HotelContext';
import { useContext } from 'react';

export const RegisterNewHotelPage = () => {

    // It imports the hotelContext
    const { addHotel } = useContext(HotelContext);

    // Images uploading URL
    const URL_IMAGES = "http://localhost:8080/hotel/upload";

    // It uses a state to manage the form. It sets the initial values to empty
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

    // This function gets hotels by name
     const getHotelByName = async (hotelName) => {
        try {
            const response = await fetch(`http://localhost:8080/hotel/hotelName/${hotelName}`); // Uses the API URL and the category variable
            if (!response.ok) {
                throw new Error("No se encontraron hoteles " + hotelName);
            }
            const data = await response.json(); // Parses the response to JSON and saves it in the data variable
            return (Array.isArray(data) ? data : [data]); // If data is an array, set it as is. Else create an array with the data content
        } catch (error) {
            console.error(error);
        }
    }

    // This function checks if there is another hotel with the same name
    const checkHotelName = async (hotelName) => {
        const hotels = await getHotelByName(hotelName);
        let exists = false;
            hotels.forEach((hotel) => {
                if (hotel.hotelName === hotelName.trim()) {
                    document.getElementById('hotelNameProblem').classList.add('errorShow');
                    exists = true;
                }
            });
        return !exists;
    }

    // This function checks if the form is valid
    const formCheck = async (form) => {
        let valid = true;
        Object.keys(form).forEach((key) => {
            if (key !== 'services' && key !== 'photos') {
                const fieldError = key + 'Error';
                if (form[key].trim && form[key].trim() === '' || form[key] === null) {
                    document.getElementById(fieldError).classList.add('errorShow');
                    valid = false;
                }else if (form[key].trim && form[key].trim() !== '') {
                    document.getElementById(fieldError).classList.remove('errorShow');
                }
            }
            if (key === 'photos') {
                if (!form.photos || form.photos.length === 0) {
                    document.getElementById('photosError').classList.add('errorShow');
                    valid = false;
                }else {
                    document.getElementById('photosError').classList.remove('errorShow');
                }
            }
        })
        valid = await checkHotelName(form.hotelName);
        if (valid) return true;
        return false;
    }

    // This function handles the change of the form inputs
    const handleChange = (e) => {
        // Destructures the event target to get the name, value, type, checked and files
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

    // This function handles the submit of the form and sends the data to the server
    const handleSubmit = async (e) => {
        // Prevents the page from reloading
        e.preventDefault();

        // Checks if the form is valid
        if (formCheck(form)) return;

        // Uses an Array to store the images URLs. This will be used to get the images from the server and show them
        let imageUrls = [];

        if (form.photos.length > 0) { // It check that there are at least one image to upload
            const imageFormData = new FormData(); // It creates a form data to send the images to the server
            form.photos.forEach((photo) => { // It uses a forEach to iterate over the images
                imageFormData.append("files", photo); // It appends the images to the form data
            });

            try {
                const response = await fetch(URL_IMAGES, { // It sends the images to the server and gets the response message
                    method: "POST",
                    body: imageFormData,
                });

                if (response.ok) { // If the response is ok
                    imageUrls = await response.json(); // Gets from the response the images URLs and saves them in the imageUrls array
                } else {
                    console.error("Error al subir las imágenes:", await response.text());
                }
            } catch (error) {
                console.error("Excepción al subir imágenes:", error);
            }
        }

        const hotel = { // It creates a hotel object model to send to the server with all the data
            hotelName: form.hotelName.trim(),
            hotelAddress: form.hotelAddress.trim(),
            hotelCity: form.hotelCity.trim(),
            hotelCountry: form.hotelCountry.trim(),
            hotelPhone: parseInt(form.hotelPhone.trim()),
            hotelEmail: form.hotelEmail.trim(),
            hotelWebsite: form.hotelWebsite.trim(),
            hotelDescription: form.hotelDescription.trim(),
            pricePerNight: parseFloat(form.pricePerNight.trim()),
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
            photos: imageUrls // It adds the images URLs to the hotel object
        };

        // It sends the hotel object to the server
        await addHotel(hotel);

        setForm({ // It resets the form to empty
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
    )
}
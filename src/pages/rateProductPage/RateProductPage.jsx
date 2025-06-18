import { useNavigate, useParams } from 'react-router'
import './rateProductPageStyles.css'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext/UserContext'
import { useState } from 'react'
import { ReviewContext } from '../../context/reviewContext/ReviewContext'
import { HotelContext } from '../../context/hotelContext/HotelContext'

export const RateProductPage = () => {

    const { id } = useParams()

    const { addReview } = useContext(ReviewContext)

    const {logedUser} = useContext(UserContext)

    const {fetchHotelDataById} = useContext(HotelContext)

    const [form, setForm] = useState({
        generalRating: 1,
        hotelDescription: ''
    })
    const [errors, setErrors] = useState({
        generalRating: false,
        hotelDescription: false
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setForm(prev => ({
            ...prev,
            [name]: value
        }))
        setErrors(prev => ({
            ...prev,
            [name]: false
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(!logedUser) return;
        let hasError = false
        let newErrors = { generalRating: false, hotelDescription: false }

        if (!form.generalRating) {
            newErrors.generalRating = true
            hasError = true
        }
        if (!form.hotelDescription.trim()) {
            newErrors.hotelDescription = true
            hasError = true
        }

        setErrors(newErrors)
        if (hasError) return

        const today = new Date();
        const localDateTime = today.toISOString();
        const hotel = await fetchHotelDataById(id)

        let review = {
            rating: parseInt(form.generalRating),
            comment: form.hotelDescription.trim(),
            createdAt: localDateTime,
            hotel: {id: hotel.id},
            user: {id: logedUser.id}
        }

        await addReview(review)

        setForm({
            generalRating: 1,
            hotelDescription: ''
        })

        alert("Reseña publicada con exito")

        history.back()
    }

    return(
        <>
        <div className="rateHotelPage">
            <h1>Califica este producto</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="generalRating">Calificación general</label>
                <input
                    className='registerNewHotelInput'
                    type="range"
                    name="generalRating"
                    id="generalRating"
                    min={1}
                    max={5}
                    value={form.generalRating}
                    onChange={handleChange}
                />
                <div className='accesibilityFacesContainer'>
                <p className='bxName'>Nada satisfecho</p>
                <p className='bxName'>Satisfecho</p>
                <p className='bxName'>Totalmente satisfecho</p>
                <p class='bx bx-sad' />
                <p class='bx bx-meh-alt' />
                <p class='bx bx-happy-beaming' />
                </div>
                {errors.generalRating && (
                    <p className='error' id='generalRatingError'>Este campo es requerido</p>
                )}

                <label htmlFor="hotelDescription">Comentarios</label>
                <textarea
                    name="hotelDescription"
                    id="rateHotelInput"
                    cols="30"
                    rows="10"
                    maxLength={255}
                    value={form.hotelDescription}
                    onChange={handleChange}
                ></textarea>
                {errors.hotelDescription && (
                    <p className='error' id='hotelDescriptionError'>Este campo es requerido</p>
                )}

                <button type="submit" className="submitButton">Dejar reseña</button>
            </form>
        </div>
        </>
    )

}
import './registerNewCategoryPageStyles.css'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext/UserContext'
import { useState } from 'react'
import { CategoryContext } from '../../context/categoryContext/CategoryContext'

export const RegisterNewCategoryPage = () => {

    const {addCategory} = useContext(CategoryContext)

    const {logedUser} = useContext(UserContext)

    const [form, setForm] = useState({
        categoryName: '',
        categoryDescription: ''
    })
    const [errors, setErrors] = useState({
        categoryName: false,
        categoryDescription: false
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

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!logedUser && logedUser.role !== "admin") return;
        let hasError = false
        let newErrors = { generalRating: false, hotelDescription: false }

        if (!form.categoryName.trim()) {
            newErrors.generalRating = true
            hasError = true
        }
        if (!form.categoryDescription.trim()) {
            newErrors.hotelDescription = true
            hasError = true
        }

        setErrors(newErrors)
        if (hasError) return

        let category = {
            category: form.categoryName.trim(),
            description: form.categoryDescription.trim(),
        }

        addCategory(category)

        setForm({
            categoryName: '',
            categoryDescription: ''
        })

        alert("Categoria añadida con exito")
    }

    return(
        <>
        {
            logedUser && logedUser.role == "admin" ?
            <>
        <div className="registerNewCategoryPage">
            <h1>Crea una categoria nueva</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="categoryName">Nombre de la categoria</label>
                <input
                    className='registerNewCategoryInputText'
                    type="text"
                    name="categoryName"
                    id="categoryName"
                    min={1}
                    max={5}
                    value={form.categoryName}
                    onChange={handleChange}
                />
                {errors.categoryName && (
                    <p className='error' id='categoryNameError'>Este campo es requerido</p>
                )}

                <label htmlFor="categoryDescription">Descripcion</label>
                <textarea
                    className='registerNewCategoryInput'
                    name="categoryDescription"
                    id="categoryDescription"
                    cols="30"
                    rows="10"
                    maxLength={216}
                    value={form.categoryDescription}
                    onChange={handleChange}
                ></textarea>
                {errors.categoryDescription && (
                    <p className='error' id='categoryDescriptionError'>Este campo es requerido</p>
                )}

                <button type="submit" className="submitButton">Crear categoria</button>
            </form>
        </div>
            <p className='onlyPC'>PAGINA SOLO DISPONIBLE EN PC</p>
            </>
        : <p className='adminErrorAccessAcount'>Inicia sesion en una cuenta admin para poder acceder a esta pagina</p>
        }
        </>
    )

}
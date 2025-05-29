import { useContext, useState } from 'react'
import './userPageStyles.css'
import { UserContext } from '../../context/userContext/UserContext'
import { CardComponent } from '../../components/cardComponent/SuggestionCardComponent';

export const UserPage = () => {

    // Gets the user from the context
    const { logedUser } = useContext(UserContext);

    const context = useContext(UserContext);

    const [form, setForm] = useState({
        name: logedUser.name,
        lastname: logedUser.lastname
    });

    // Checks if the form is valid
    const checkForm = (form) => {
        let valid = true;
        Object.keys(form).forEach((key) => {
            const fieldError = key + 'Error';
            if (form[key].trim && form[key].trim() === '' || form[key] === null) {
                document.getElementById(fieldError).classList.add('errorShow');
                valid = false;
            } else if (form[key].trim && form[key].trim() !== '') {
                document.getElementById(fieldError).classList.remove('errorShow');
            }
        })
        return valid;
    }

    // Let's the user edit their account
    const handleSubmit = (form, e) => {
        e.preventDefault();
        if (!checkForm(form)) return;
        let userObject = logedUser;
        if (form.name != logedUser.name) userObject.name = form.name;
        if (form.lastname != logedUser.lastname) userObject.lastname = form.lastname
        context.updateUser(userObject);
    }

    // This function handles the change of the inputs
    const handleChange = (e) => {
        // Destructures the event target to get the name, value, type, checked and files
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <>
            {logedUser ?
                <div className='userPageContainer'>
                    <h1>¡Bienvenido {logedUser.name}!</h1>
                    <form onSubmit={(e) => handleSubmit(form, e)}>
                        <label htmlFor="userNameEditInput">Nombre:</label>
                        <input type="text" name='name' value={form.name} onChange={handleChange} />
                        <p id='nameError' className='error'>Debes rellenar este campo</p>

                        <label htmlFor="userLastnameEditInput">Apellido:</label>
                        <input type="text" name='lastname' value={form.lastname} onChange={handleChange} />
                        <p id='lastnameError' className='error'>Debes rellenar este campo</p>

                        <button type="submit" className='saveButton'>Guardar</button>
                    </form>
                    <h2>Reservas</h2>
                    <div className='reservedHotelsZoneContainer'>
                        {logedUser.reservedHotels.map(hotel => {
                            return (<CardComponent
                                hotel={hotel}
                                key={hotel.id} />)
                        })}
                    </div>
                </div>
                :
                <p>Inicia Sesion</p>
            }
        </>
    )

}
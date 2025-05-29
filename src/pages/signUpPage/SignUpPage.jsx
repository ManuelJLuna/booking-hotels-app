import './signUpPageStyles.css'
import { useContext, useState } from 'react';
import { UserContext } from '../../context/userContext/UserContext';
import { useNavigate } from 'react-router';

export const SignUpPage = () => {

    // Import the userContext
    const { addUser, logedUser, setLogedUser } = useContext(UserContext);
    const [user, setUser] = useState(null)

    // It uses useNavigate
    const navigate = useNavigate()

    // It uses a state to handle the form
    const [form, setForm] = useState({ userName: '', userLastname: '', userEmail: '', userPassword: ''});

    // This function handles the change of the inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // This function fetches the user by email from the API
    const fetchUserByEmail = async (email) => {
        try {
            const response = await fetch(`http://localhost:8080/user/email/${email}`);
            if (!response.ok) throw new Error('Error al llamar a la API');
            const userData = await response.json();
            setUser(userData.length > 0 ? userData[0] : null);
            return userData.length > 0 ? userData[0] : null;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    //This function checks if there is a user with the same email
    const checkUserEmail = async (userEmail) => {
        const fetchedUser = await fetchUserByEmail(userEmail);
        if (fetchedUser && fetchedUser.userEmail === userEmail.trim()) {
            document.getElementById('userEmailProblem').classList.add('errorShow');
            return false;
        } else {
            document.getElementById('userEmailProblem').classList.remove('errorShow');
            return true;
        }
    }

    //This function checks if the form is valid
    const formCheck = async (form) => {
        let valid = true;

        for (const key of Object.keys(form)) {
            const fieldError = key + 'Error';
            if (form[key] == null || (typeof form[key] === 'string' && form[key].trim() === '')) {
                document.getElementById(fieldError).classList.add('errorShow');
                valid = false;
            } else {
                document.getElementById(fieldError).classList.remove('errorShow');
            }
        }

        if (user) {
            const emailOk = await checkUserEmail(form.userEmail);
            if (!emailOk) valid = false;
        }

        return valid;
    }

    // This function handles the submit of the form
    const handleSubmit = async (e) => {
        // Prevents the page from reloading
        e.preventDefault();

        // Checks if the form is valid
        if (!await formCheck(form)) return;

        const user = { // It creates a user object model to send to the server with all the data
            name: form.userName.trim(),
            lastname: form.userLastname.trim(),
            email: form.userEmail.trim(),
            password: form.userPassword.trim(),
        };

        // It sends the user object to the server
        await addUser(user);

        // It resets the form
        setForm({ userName: '', userLastname: '', userEmail: '', userPassword: '' });

        // It logs the user
        setLogedUser(user);

        // Navigates to the home page
        navigate("/");
    };

    // This function shows the password when the user clicks on the eye icon
    const showPassword = () => {
        const passwordInput = document.getElementById('userPassword');
        const showPasswordIcon = document.getElementById('signupShowPassword');
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            showPasswordIcon.classList.remove('bxs-hide');
            showPasswordIcon.classList.add('bxs-show');
        } else {
            passwordInput.type = 'password';
            showPasswordIcon.classList.remove('bxs-show');
            showPasswordIcon.classList.add('bxs-hide');
        }
    };

    return (
        <div className="signUpPageContainer">
            <h1>Registrarse</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userName">Nombre</label>
                <input className='signupUserInput' type="text" name="userName" id="userName" onChange={handleChange} value={form.userName} />
                <p className='error' id='userNameError'>Este campo es requerido</p>

                <label htmlFor="userLastname">Apellido</label>
                <input className='signupUserInput' type="text" name="userLastname" id="userLastname" onChange={handleChange} value={form.userLastname} />
                <p className='error' id='userLastnameError'>Este campo es requerido</p>

                <label htmlFor="userEmail">Email</label>
                <input className='signupUserInput' type="text" name="userEmail" id="userEmail" onChange={handleChange} value={form.userEmail} />
                <p className='error' id='userEmailError'>Este campo es requerido</p>
                <p className='error' id='userEmailProblem'>Ya existe un usuario con este email</p>

                <label htmlFor="userPassword">Constraseña</label>
                <input className='signupUserInput' type="password" name="userPassword" id="userPassword" onChange={handleChange} value={form.userPassword} />
                <p className='showPassword bx bxs-hide' id='signupShowPassword' onClick={showPassword} />
                <p className='error' id='userPasswordError'>Este campo es requerido</p>

                <button type="submit" className="submitButton">Registrarse</button>
            </form>
        </div>
    )

}
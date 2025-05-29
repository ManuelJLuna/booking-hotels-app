import { useContext, useState } from 'react';
import './LogInPageStyles.css';
import { UserContext } from '../../context/userContext/UserContext';
import { useNavigate } from 'react-router';

export const LogInPage = () => {
    const { logedUser, setLogedUser } = useContext(UserContext);
    const [form, setForm] = useState({ userEmail: '', userPassword: '' });
    const navigate = useNavigate()

    const fetchUserByEmail = async (email) => {
        try {
            const encodedEmail = encodeURIComponent(email.trim())
            const response = await fetch(`http://localhost:8080/user/email/${encodedEmail}`);
            if (!response.ok) throw new Error('Error al llamar a la API');
            const userData = await response.json();
            return userData;
        } catch (error) {
            console.error('Error fetching user:', error);
            return null;
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const formCheck = (form) => {
        let valid = true;
        Object.keys(form).forEach((key) => {
            const fieldError = key + 'Error';
            if (!form[key] || form[key].trim() === '') {
                document.getElementById(fieldError).classList.add('errorShow');
                valid = false;
            } else {
                document.getElementById(fieldError).classList.remove('errorShow');
            }
        });
        return valid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formCheck(form)) return;

        const user = await fetchUserByEmail(form.userEmail);

        if (user && user.password === form.userPassword) {
            setLogedUser(user); // saves the loged user into the context
            navigate("/");
        } else {
            document.getElementById('userPasswordError').classList.add('errorShow');
        }
        setForm({ userEmail: '', userPassword: '' })
    };

    const showPassword = () => {
        const passwordInput = document.getElementById('userPassword');
        const showPasswordIcon = document.getElementById('loginShowPassword');
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
        <div className="logInPageContainer">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="userEmail">Email</label>
                <input className='loginUserInput' type="text" name="userEmail" id="userEmail" onChange={handleChange} value={form.userEmail} />
                <p className='error' id='userEmailError'>Este campo puede ser incorrecto</p>

                <label htmlFor="userPassword">Contraseña</label>
                <input className='loginUserInput' type="password" name="userPassword" id="userPassword" onChange={handleChange} value={form.userPassword} />
                <p className='showPassword bx bxs-hide' id='loginShowPassword' onClick={showPassword} />
                <p className='error' id='userPasswordError'>Este campo puede ser incorrecto</p>

                <button type="submit" className="submitButton">Iniciar sesión</button>
            </form>
        </div>
    );
};
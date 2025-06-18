import { NavLink } from 'react-router';
import './adminPageStyles.css';
import { useContext } from 'react';
import { UserContext } from '../../../context/userContext/UserContext';

export const AdminPage = () => {

    const { logedUser } = useContext(UserContext)

    return (
        <>
            {/* This page is only available on PC. And will only show if you're an admin*/}
            {logedUser && logedUser.role == "admin" ?
                <>
                    <div className="adminPage">
                        <h1>Admin Page</h1>
                        <p>Welcome to the admin page!</p>
                        <p>Here you can manage the hotel data.</p>
                        <button className="admin-button"><NavLink to="hotel/list">List hotels</NavLink></button>
                        <button className="admin-button"><NavLink to="users/list">List users</NavLink></button>
                        <button className="admin-button"><NavLink to="category/list">List categories</NavLink></button>
                        <button className="admin-button"><NavLink to="/register/hotel">Register new hotel</NavLink></button>
                        <button className="admin-button"><NavLink to="/register/category">Register new category</NavLink></button>
                    </div>
                    <div>
                        <p className='adminErrorAccess'>Esta pagina solo esta disponible en PC</p>
                    </div>
                </>
                :
                <p className='adminErrorAccessAcount'>Inicia sesion en una cuenta admin para poder acceder a esta pagina</p>
            }
        </>
    );
}
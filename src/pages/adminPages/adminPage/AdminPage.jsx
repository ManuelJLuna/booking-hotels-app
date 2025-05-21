import { NavLink } from 'react-router';
import './adminPageStyles.css';

export const AdminPage = () => {
    return (
        <>
            <div className="adminPage">
                <h1>Admin Page</h1>
                <p>Welcome to the admin page!</p>
                <p>Here you can manage the hotel data.</p>
                <button className="admin-button"><NavLink to="hotel/list">List hotels</NavLink></button>
            </div>
            <div>
                <p className='adminErrorAccess'>Esta pagina solo esta disponible en PC</p>
            </div>
        </>
    );
}
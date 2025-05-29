import { useContext } from 'react';
import './adminListsStyles.css'
import { UserContext } from '../../../context/userContext/UserContext';

export const ListOfUsersPage = () => {

    // This page is only available for admin users on PC
    const { logedUser } = useContext(UserContext)

    // It imports the hotelContext
    const context = useContext(UserContext);

    // If the context is null, it parses the context to an empty array
    const users = context?.users || [];

    //This lets the admin delete a hotel from the list using the hotel ID
    const handleDeleteUser = (userId) => {
        if (confirm("Are you sure you want to delete this user?")) { // Uses a confirm box to ask for confirmation
            context.deleteUser(userId); // If the user confirms it deletes the hotel
            alert("User deleted successfully"); // It shows an alert to confirm the deletion
        } else {
            alert("User not deleted"); // If the user doesn't confirm it shows an alert to confirm the cancellation
        }
    }

    // 
    const handleGiveAdminPermision = (user) => {
        let userObject = user;
        if (user.role == null || user.role == "user") {
            userObject.role = "admin";
            return context.updateUser(userObject)
        } else {
            userObject.role = "user";
            return context.updateUser(userObject)
        }
    }

    // It uses a table from Bootstrap to show the list of hotels
    return (
        <>
            {logedUser && logedUser.role == "admin" ?
                <>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">HotelID</th>
                                <th scope="col">HotelName</th>
                                <th scope="col">Delete</th>
                                <th scope="col">Give admin permision</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => handleDeleteUser(user.id)}>
                                            <i className='bx bxs-trash' />
                                        </button>
                                    </td>
                                    <td>
                                        <button className={user.role == "admin" ? 'btn btn-danger' : 'btn btn-success'} onClick={() => handleGiveAdminPermision(user)}>
                                            {user.role == "admin" ? <i class='bx bxs-x-square'></i>
                                            : <i className='bx bxs-check-square' />
                                        }
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p className='adminErrorAccess'>Esta pagina solo esta disponible en PC</p>
                </>
                :
                <p className='adminErrorAccessAcount'>Inicia sesion en una cuenta admin para poder acceder a esta pagina</p>
            }
        </>
    )
}

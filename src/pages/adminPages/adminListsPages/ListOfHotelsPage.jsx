import { useContext } from 'react';
import { HotelContext } from '../../../context/hotelContext/HotelContext';
import './adminListsStyles.css'
import { UserContext } from '../../../context/userContext/UserContext';
import { NavLink } from 'react-router';

export const ListOfHotelsPage = () => {

    // This page is only available for admin users on PC
    const { logedUser } = useContext(UserContext)

    // It imports the hotelContext
    const context = useContext(HotelContext);

    // If the context is null, it parses the context to an empty array
    const hotels = context?.hotels || [];

    //This lets the admin delete a hotel from the list using the hotel ID
    const handleDeleteHotel = (hotelId) => {
        if (confirm("Are you sure you want to delete this hotel?")) { // Uses a confirm box to ask for confirmation
            context.deleteHotel(hotelId); // If the user confirms it deletes the hotel
            alert("Hotel deleted successfully"); // It shows an alert to confirm the deletion
        } else {
            alert("Hotel not deleted"); // If the user doesn't confirm it shows an alert to confirm the cancellation
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
                                <th scope="col">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {hotels.map(hotel => (
                                <tr key={hotel.id}>
                                    <th scope="row">{hotel.id}</th>
                                    <td>{hotel.hotelName}</td>
                                    <td>
                                        <button className='btn btn-danger' onClick={() => handleDeleteHotel(hotel.id)}>
                                            <i className='bx bxs-trash' />
                                        </button>
                                    </td>
                                    <td>
                                        <NavLink className='btn btn-success' to={`/edit/hotel/${hotel.id}`}>
                                            <i className='bx bxs-edit' />
                                        </NavLink>
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
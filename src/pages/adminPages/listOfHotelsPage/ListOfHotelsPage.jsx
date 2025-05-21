import { useContext } from 'react';
import { HotelContext } from '../../../context/hotelContext/HotelContext';
import './listOfHotelsStyles.css'

export const ListOfHotelsPage = () => {

    const context = useContext(HotelContext);
    const hotels = context?.hotels || [];

    const handleDeleteHotel = (hotelId) => {
        if (confirm("Are you sure you want to delete this hotel?")) {
            context.deleteHotel(hotelId);
            alert("Hotel deleted successfully");
        } else {
            alert("Hotel not deleted");
        }
    }


    return (
        <>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">HotelID</th>
                    <th scope="col">HotelName</th>
                    <th scope="col">Delete</th>
                </tr>
            </thead>
            <tbody>
                {hotels.map(hotel => (
                    <tr key={hotel.id}>
                        <th scope="row">{hotel.id}</th>
                        <td>{hotel.name}</td>
                        <td>
                            <button className='btn btn-danger' onClick={() => handleDeleteHotel(hotel.id)}>
                                <i className='bx bxs-trash' />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <p className='adminErrorAccess'>Esta pagina solo esta disponible en PC</p>
        </>
    )
}
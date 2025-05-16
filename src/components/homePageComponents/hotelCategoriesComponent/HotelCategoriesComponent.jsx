import { NavLink } from 'react-router';
import './hotelCategoriesComponentStyles.css';

export const HotelCategoriesComponent = () => {
    return (
        <div className='hotelsCategories'>
            <h2>Buscar por tipo de alojamiento</h2>
            <div className='hotelCategoriesContainer'>
            <NavLink className='hotelCategory'  to="/hotel/category/hotel" >
                    <img src="src\assets\hotelCategoryCardImages\hotel.png" alt="Hotel" />
                    <h3>Hotel</h3>
            </NavLink>
            <NavLink className='hotelCategory' to="/hotel/category/motel" >
                    <img src="src\assets\hotelCategoryCardImages\motel.png" alt="Motel" />
                    <h3>Motel</h3>
            </NavLink>
            <NavLink className='hotelCategory' to="/hotel/category/resort" >
                    <img src="src\assets\hotelCategoryCardImages\resort.png" alt="Resort" />
                    <h3>Resort</h3>
            </NavLink>
            <NavLink className='hotelCategory' to="/hotel/category/bedandbreakfast" >
                    <img src="src\assets\hotelCategoryCardImages\bedandbreakfast.png" alt="Bed & Breakfast" />
                    <h3>Bed & Breakfast</h3>
            </NavLink>
            </div>
        </div>
    )
}
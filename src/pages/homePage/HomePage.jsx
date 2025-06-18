import { HotelCategoriesComponent } from '../../components/homePageComponents/hotelCategoriesComponent/HotelCategoriesComponent';
import { HotelFavouritesComponent } from '../../components/homePageComponents/hotelFavouritesComponent/hotelFavouritesComponent';
import { HotelSuggestionsComponent } from '../../components/homePageComponents/hotelSugestionsComponent/HotelSuggestionsComponent';
import { SearchZoneComponent } from '../../components/homePageComponents/searchZoneComponent/SearchZoneComponent';


export const HomePage = () => {

    return (
        <>
            <SearchZoneComponent />
            <HotelCategoriesComponent />
            <HotelFavouritesComponent />
            <HotelSuggestionsComponent />
        </>
    );
}
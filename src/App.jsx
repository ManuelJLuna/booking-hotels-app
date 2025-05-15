import { NavBarComponent } from "./components/navbarComponent/NavbarComponent"
import { HotelProvider } from "./context/hotelContext/HotelProvider"
import { HomePage } from "./pages/homePage/HomePage"
import { HotelPage } from "./pages/hotelPage/HotelPage"
import { RegisterNewHotelPage } from "./pages/registerNewHotelPage/RegisterNewHotelPage"

export const App = () => {
  return (
    <HotelProvider>
      <NavBarComponent />
      <HomePage />
    </HotelProvider>
  )
}
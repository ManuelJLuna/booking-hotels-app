import { NavBarComponent } from "./components/navbarComponent/NavbarComponent"
import { HomePage } from "./pages/homePage/HomePage"
import { RegisterNewHotelPage } from "./pages/registerNewHotelPage/RegisterNewHotelPage"

export const App = () => {
  return (
    <>
      <NavBarComponent />
      <HomePage />
    </>
  )
}
import { NavBarComponent } from "./components/navbarComponent/NavbarComponent"
import { HotelProvider } from "./context/hotelContext/HotelProvider"
import { HomePage } from "./pages/homePage/HomePage"
import { HotelTypeSuggestionsPage } from "./pages/hotelTypeSuggestionsPage/HotelTypeSuggestionsPage"
import { HotelPage } from "./pages/hotelPage/HotelPage"
import { RegisterNewHotelPage } from "./pages/registerNewHotelPage/RegisterNewHotelPage"
import { BrowserRouter, Routes, Route } from "react-router"

export const App = () => {
  return (
    <BrowserRouter>
      <HotelProvider>
        <NavBarComponent />
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="hotel/category/:category" element={<HotelTypeSuggestionsPage />} />
          <Route path="/register/hotel" element={<RegisterNewHotelPage />} />
          <Route path="hotel/:id/*" element={<HotelPage />} />
        </Routes>
      </HotelProvider>
    </BrowserRouter>
  )
}
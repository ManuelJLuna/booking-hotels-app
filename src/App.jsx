import { NavBarComponent } from "./components/navbarComponent/NavbarComponent"
import { HotelProvider } from "./context/hotelContext/HotelProvider"
import { HomePage } from "./pages/homePage/HomePage"
import { HotelTypeSuggestionsPage } from "./pages/hotelTypeSuggestionsPage/HotelTypeSuggestionsPage"
import { HotelCountryCitySuggestionsPage } from "./pages/hotelCountryCitySuggestionsPage/HotelCountryCitySuggestionsPage"
import { HotelPage } from "./pages/hotelPage/HotelPage"
import { RegisterNewHotelPage } from "./pages/registerNewHotelPage/RegisterNewHotelPage"
import { BrowserRouter, Routes, Route } from "react-router"
import { FooterComponent } from "./components/footerComponent/FooterComponent"
import { AdminPage } from "./pages/adminPages/adminPage/AdminPage"
import { ListOfHotelsPage } from "./pages/adminPages/listOfHotelsPage/ListOfHotelsPage"

export const App = () => {
  return (
    <BrowserRouter>
      <HotelProvider>
        <NavBarComponent />
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/hotel/category/:category/*" element={<HotelTypeSuggestionsPage />} />
          <Route path="/register/hotel/*" element={<RegisterNewHotelPage />} />
          <Route path="/hotel/:id/*" element={<HotelPage />} />
          <Route path="/hotel/countrycity/:citycountry/*" element={< HotelCountryCitySuggestionsPage />} />
          <Route path="admin/*" element={<AdminPage/>} />
          <Route path="admin/hotel/list" element={<ListOfHotelsPage />} />
        </Routes>
        <FooterComponent />
      </HotelProvider>
    </BrowserRouter>
  )
}
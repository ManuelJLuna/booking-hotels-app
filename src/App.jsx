import { NavBarComponent } from "./components/navbarComponent/NavbarComponent"
import { HotelProvider } from "./context/hotelContext/HotelProvider"
import { UserProvider } from "./context/userContext/UserProvider"
import { HomePage } from "./pages/homePage/HomePage"
import { HotelTypeSuggestionsPage } from "./pages/hotelTypeSuggestionsPage/HotelTypeSuggestionsPage"
import { HotelCountryCitySuggestionsPage } from "./pages/hotelCountryCitySuggestionsPage/HotelCountryCitySuggestionsPage"
import { HotelPage } from "./pages/hotelPage/HotelPage"
import { RegisterNewHotelPage } from "./pages/registerNewHotelPage/RegisterNewHotelPage"
import { BrowserRouter, Routes, Route } from "react-router"
import { FooterComponent } from "./components/footerComponent/FooterComponent"
import { AdminPage } from "./pages/adminPages/adminPage/AdminPage"
import { SignUpPage } from "./pages/signUpPage/SignUpPage"
import { LogInPage } from "./pages/logInPage/LogInPage"
import { ListOfHotelsPage } from "./pages/adminPages/adminListsPages/ListOfHotelsPage"
import { ListOfUsersPage } from "./pages/adminPages/adminListsPages/ListOfUsersPage"
import { UserPage } from "./pages/userPage/UserPage"
import { EditHotelPage } from "./pages/editHotelPage/EditHotelPage"

export const App = () => {
  return (
    <BrowserRouter>
      <HotelProvider>
        <UserProvider>
        <NavBarComponent />
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path="/hotel/category/:category/*" element={<HotelTypeSuggestionsPage />} />
          <Route path="/register/hotel/*" element={<RegisterNewHotelPage />} />
          <Route path="/edit/hotel/:id/*" element={<EditHotelPage />} />
          <Route path="/hotel/:id/*" element={<HotelPage />} />
          <Route path="/hotel/countrycity/:citycountry/*" element={< HotelCountryCitySuggestionsPage />} />
          <Route path="admin/*" element={<AdminPage/>} />
          <Route path="admin/hotel/list" element={<ListOfHotelsPage />} />
          <Route path="admin/users/list" element={<ListOfUsersPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/account" element={<UserPage />} />
        </Routes>
        <FooterComponent />
        </UserProvider>
      </HotelProvider>
    </BrowserRouter>
  )
}
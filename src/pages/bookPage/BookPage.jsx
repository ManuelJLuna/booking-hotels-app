import { useContext, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useParams } from 'react-router';
import { UserContext } from '../../context/userContext/UserContext';
import './bookPageStyles.css'
import { HotelContext } from '../../context/hotelContext/HotelContext';

export const BookPage = () => {

  //Uses date to determin the last date one can book an hotel
  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate())
  const threeYearsTodayDate = new Date()
  threeYearsTodayDate.setDate(todayDate.getDate() + 1095)

  const { hotelId } = useParams()
  const [checkIn, setCheckIn] = useState(todayDate);
  const [checkOut, setCheckOut] = useState(null);
  const [message, setMessage] = useState("");
  const userContext = useContext(UserContext)
  const logedUser = userContext.logedUser
  const { bookedHotels, setBookedHotels, fetchHotelDataById } = useContext(HotelContext)

  const URL = 'http://localhost:8080/reservation';

  //Handles the booking of a hotel
  const reserveHotel = async () => {
    if (!logedUser) {
      setMessage("Por favor inicie sesion")
      return;
    }
    if (!checkIn || !checkOut) {
      setMessage("Por favor selecciona ambas fechas");
      return;
    }

    //Uses axios library to do the async functions
    try {
      const formattedCheckIn = checkIn.toISOString().split('T')[0];
      const formattedCheckOut = checkOut.toISOString().split('T')[0];
      const hotelIdInt = parseInt(hotelId);

      // GET request to check dates
      const getResponse = await fetch(`${URL}/dates?hotelId=${hotelIdInt}&checkIn=${formattedCheckIn}&checkOut=${formattedCheckOut}`);
      if (!getResponse.ok) {
        throw new Error('Failed to validate dates');
      }

      // POST request to make the reservation
      const postResponse = await fetch(`${URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotel: { id: hotelIdInt },
          user: { id: parseInt(logedUser.id) },
          checkIn: formattedCheckIn,
          checkOut: formattedCheckOut,
        }),
      });

      // Updates the bookedHotels
      let newHotelBooked = await fetchHotelDataById(parseInt(hotelId))

      let updatedHotels = [...bookedHotels, newHotelBooked]

      setBookedHotels(updatedHotels);

      const updatedUser = { ...logedUser, bookedHotels: updatedHotels };
      userContext.updateUser(updatedUser);
      userContext.setLogedUser(updatedUser);

      setMessage("¡Reserva confirmada!");
    } catch (error) {
      if (error.response?.status === 404) {
        setMessage("El hotel ya está reservado en esas fechas.");
      } else {
        setMessage("Ocurrió un error al procesar la reserva.");
      }
    }
  };

  return (
    <div className="hotelReservationContainer">
      <h2>Reservar Hotel</h2>

      <label htmlFor="checkIn">Fecha de ingreso</label>
      <DatePicker
        id="checkIn"
        selected={checkIn}
        onChange={date => {
          setCheckIn(date);
          if (checkOut && date >= checkOut) setCheckOut(null);
        }}
        yearDropdownItemNumber={3}
        scrollableYearDropdown showYearDropdown
        minDate={todayDate}
        maxDate={threeYearsTodayDate}
        selectsStart
        startDate={checkIn}
        endDate={checkOut}
        dateFormat="yyyy-MM-dd"
        className="dateInput"
        popperPlacement="bottom-start"
        withPortal
      />

      <label htmlFor="checkOut">Fecha de salida</label>
      <DatePicker
        id="checkOut"
        selected={checkOut}
        onChange={date => setCheckOut(date)}
        selectsEnd
        startDate={checkIn}
        endDate={checkOut}
        yearDropdownItemNumber={3}
        scrollableYearDropdown
        showYearDropdown
        minDate={checkIn}
        maxDate={threeYearsTodayDate}
        dateFormat="yyyy-MM-dd"
        className="dateInput"
        popperPlacement="bottom-start"
        withPortal
      />

      <button onClick={reserveHotel} className="submitButton">
        Reservar
      </button>

      {message && (
        <p className={`message ${message.includes("confirmada") ? "success" : ""}`}>{message}</p>
      )}
    </div>
  );
}
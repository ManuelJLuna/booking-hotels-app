import './searchZoneComponentStyles.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router';

export const SearchZoneComponent = () => {

    // Uses a state to manage the destination input
    // The destination is used to filter the hotels by country and city
    const [destination, setDestination] = useState('');
    const [arriveDate, setArriveDate] = useState('')
    const [leaveDate, setLeaveDate] = useState('')
    const minArriveDate = new Date();
    minArriveDate.setDate(minArriveDate.getDate());
    const minLeaveDate = new Date();
    minLeaveDate.setDate(minLeaveDate.getDate() + 1);
    const maxArriveDate = new Date();
    maxArriveDate.setDate(maxArriveDate.getDate() + 1095);
    const maxLeaveDate = new Date();
    maxLeaveDate.setDate(maxLeaveDate.getDate() + 1096);

    const navigate = useNavigate()

    //Handles the search
    const handleSearch = () => {
        const trimmedDestination = destination.trim();
        if (!trimmedDestination) return;

        let url = `/hotel/countrycity/${trimmedDestination}`;

        const params = new URLSearchParams();
        if (arriveDate instanceof Date && !isNaN(arriveDate)) {
            params.append('checkIn', arriveDate.toISOString().split('T')[0]);
        }
        if (leaveDate instanceof Date && !isNaN(leaveDate)) {
            params.append('checkOut', leaveDate.toISOString().split('T')[0]);
        }

        if (params.toString()) {
            url += `?${params.toString()}`;
        }

        navigate(url);
    };


    return (
        <div className='searchZone' >
            <h1>Busca los mejores hoteles para hospedarte</h1>
            <div className="searchControls">
                <input
                    className='searchInputHome'
                    type="text"
                    placeholder='Elija su destino'
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                />
                <DatePicker
                    selected={arriveDate}
                    onChange={(date) => setArriveDate(date)}
                    className="datePicker"
                    placeholderText="Fecha de llegada"
                    dateFormat="yyyy-MM-dd"
                    minDate={minArriveDate}
                    maxDate={maxArriveDate}
                    selectsStart
                    startDate={arriveDate}
                    endDate={leaveDate}
                    yearDropdownItemNumber={3}
                    scrollableYearDropdown
                    showYearDropdown
                    popperPlacement="bottom-start"
                    withPortal
                />
                <DatePicker
                    selected={leaveDate}
                    onChange={(date) => setLeaveDate(date)}
                    className="datePicker"
                    placeholderText="Fecha de salida"
                    dateFormat="yyyy-MM-dd"
                    minDate={minLeaveDate}
                    maxDate={maxLeaveDate}
                    selectsEnd
                    startDate={arriveDate}
                    endDate={leaveDate}
                    yearDropdownItemNumber={3}
                    scrollableYearDropdown
                    showYearDropdown
                    popperPlacement="bottom-start"
                    withPortal
                />

                <button className='sendSearchButton' onClick={handleSearch}>Buscar</button>
            </div>
        </div >
    );
}
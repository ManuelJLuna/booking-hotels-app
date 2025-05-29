import { NavLink } from 'react-router';
import './searchZoneComponentStyles.css';
import { useState } from 'react';

export const SearchZoneComponent = () => {

    // Uses a state to manage the destination input
    // The destination is used to filter the hotels by country and city
    const [destination, setDestination] = useState('');


    return (
        <div className='searchZone'>
            <h1>Busca los mejores hoteles para hospedarte</h1>
            <input className='searchInputHome' type="text" placeholder='Elija su destino' value={destination} onChange={(e) => setDestination(e.target.value)}/>
                <input className='searchInputHome' type="text" placeholder='Elija su fecha de llegada y de partida' />
                <NavLink to={`/hotel/countrycity/${destination.trim()}`}>
                <input type="button" value="Buscar" className='sendSearchButton searchInputHome' /></NavLink>
            </div>
    );
}
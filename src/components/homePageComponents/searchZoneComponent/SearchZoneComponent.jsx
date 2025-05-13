import './searchZoneComponentStyles.css';

export const SearchZoneComponent = () => {
    return (
        <div className='searchZone'>
                <h1>Busca los mejores hoteles para hospedarte</h1>
                <input className='searchInputHome' type="text" placeholder='Elija su destino' />
                <input className='searchInputHome' type="text" placeholder='Elija su fecha de llegada y de partida' />
                <input type="button" value="Buscar" className='sendSearchButton searchInputHome' />
            </div>
    );
}
import './homePageStyles.css';
import ShadowDom from 'react-shadow';

export const HomePage = () => {
    return (
        <>
            <div className='searchZone'>
                <h1>Busca los mejores hoteles para hospedarte</h1>
                <input className='searchInputHome' type="text" placeholder='Elija su destino'/>
                <input className='searchInputHome' type="text" placeholder='Elija su fecha de llegada y de partida'/>
                <input type="button" value="Buscar" className='sendSearchButton searchInputHome' />
            </div>
            <div className='hotelsCategories'>
                <h2>Buscar por tipo de alojamiento</h2>
            </div>
            <div className='hotelsSuggestions'>
                <h2>Recomendaciones</h2>
            </div>
        </>
    );
}
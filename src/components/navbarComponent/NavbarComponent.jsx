import { NavLink, useNavigate } from 'react-router';
import './navbarStyle.css'
import { UserContext } from '../../context/userContext/UserContext';
import { useContext } from 'react';

export const NavBarComponent = () => {

  // Imports the logedUser
  const { logedUser, setLogedUser } = useContext(UserContext);

  // Uses useNavigate
  const navigate = useNavigate();

  // Let's users unlog
  const unlog = () => {
    setLogedUser(null);
    navigate("/login");
  }

  return (
    <>
      {
        logedUser == null ?
          // Not loged user navbar
          <nav className="navbar">
            <div className="container-fluid">
              <div className="navbar-brand"><NavLink id='logo' to='/'><img src="../src/assets/icon.png" alt="" /><p className='lema'>Tu reserva ya hecha</p></NavLink></div>
              <div className="d-flex" role="search">
                <div className='collapsable'>
                  <NavLink className="btn callToActionButton" to='/login' >Iniciar sesion</NavLink>
                  <NavLink className="btn callToActionButton" to='/signup' >Crear cuenta</NavLink>
                </div>
                <button className='navbarToggler' onClick={() => {
                  const collapsable = document.querySelector('.collapsable');
                  collapsable.classList.toggle('inactive')
                }}>
                  <p className='bx bx-menu' />
                </button>
              </div>
            </div>
          </nav>
          :
          // Loged user navbar
          <nav className="navbar">
            <div className="container-fluid">
              <div className="navbar-brand"><NavLink id='logo' to='/'><img src="../src/assets/icon.png" alt="" /><p className='lema'>Tu reserva ya hecha</p></NavLink></div>
              <div className="d-flex" role="search">
                <div className='userNavBarButtonsContainer invisible'>
                  <NavLink className="btn callToActionButton" to='/account' >Mi cuenta</NavLink>
                  {logedUser.role == "admin" &&
                    <NavLink className="btn callToActionButton" to='/admin' onClick={() => {
                    document.querySelector('.userNavBarButtonsContainer').classList.toggle("invisible");
                    }} >Administracion</NavLink>}
                  {logedUser.role == "admin" &&
                    <NavLink className="btn callToActionButton" to='/register/hotel' onClick={() => {
                    document.querySelector('.userNavBarButtonsContainer').classList.toggle("invisible");
                    }} >Registrar hotel</NavLink>}
                  <button className="btn callToActionButton" onClick={() => {
                    unlog();
                    document.querySelector('.userNavBarButtonsContainer').classList.toggle("invisible");
                    }} >
                    Cerrar Sesion
                    </button>
                </div>
                <button className='btn callToActionButton userProfileNavBarButton' onClick={() => {
                  document.querySelector('.userNavBarButtonsContainer').classList.toggle("invisible");
                }}>
                  {logedUser.name.slice(0, 1) + logedUser.lastname.slice(0, 1)}
                </button>
              </div>
            </div>
          </nav>
      }
    </>)
}
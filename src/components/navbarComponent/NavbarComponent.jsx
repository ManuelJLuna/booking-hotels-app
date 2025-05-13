import './navbarStyle.css'

export const NavBarComponent = () => {

  return (
    <>
      <nav className="navbar">
        <div className="container-fluid">
          <div className="navbar-brand"><a id='logo' href='#'><img src="../src/assets/icon.png" alt="" /></a><p className='lema'>Lema de la empresa</p></div>
          <div className="d-flex" role="search">
            <div className='collapsable'>
              <button className="btn callToActionButton" type="submit">Iniciar sesion</button>
              <button className="btn callToActionButton" type="submit">Crear cuenta</button>
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
    </>)
}
import './footerComponentStyles.css'

export const FooterComponent = () => {
    return (
        <div className="footerContainer">
            <main>
        <footer className="footer">
            <div className="footerContainer">
                <p className="companyAllRightsReserved">©2025 ReservadoYa. Todos los derechos reservados.</p>
                    <ul className="social-media">
                        <li><a href="https://www.facebook.com" target="_blank"><i className='bx bxl-facebook' /></a></li>
                        <li><a href="https://www.twitter.com" target="_blank"><i className='bx bxl-twitter' /></a></li>
                        <li><a href="https://www.instagram.com" target="_blank"><i className='bx bxl-instagram' /></a></li>
                        <li><a href="https://www.linkedin.com" target="_blank"><i className='bx bxl-linkedin' /></a></li>
                    </ul>
            </div>
        </footer>
            </main>
        </div>
    )
}
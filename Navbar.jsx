import {Link} from 'react-router-dom';
import'./Navbar.css';
function Navbar(){
    return(
        <nav className='navbar'>
            <div className='navbar-container'>
                <link to="/" className="navbar-logo"><span className='logo-icono'>💳</span> CreditWeb</link>
                <ul className='navbar-menu'>
                    <li><Link to="/" className='navbar-link'>Inicio</Link></li>
                    <li><Link to="/simulador" className='navbar-link'>simulador</Link></li>
                    <li><Link to="/solicitar" className='navbar-link'>solicitar</Link></li>
                </ul>
            </div>
        </nav>
    )
}
export default Navbar;
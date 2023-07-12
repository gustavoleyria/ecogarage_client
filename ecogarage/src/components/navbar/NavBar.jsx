import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../components/utils/UserContext';
import '../../styles/navbar/NavBar.css';
import Logo from '../../assets/logo.jpg';

const NavBar = () => {
  const { isUserLoggedIn } = useContext(UserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null); // Referencia al menú

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Cerrar el menú si se hace clic fuera de él
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className="navbar data-color">
      <div className="navbar-left">
        <div className="navbar-toggle" onClick={toggleMenu}>
          <div className={isMenuOpen ? 'line line-open' : 'line'}></div>
          <div className={isMenuOpen ? 'line line-open' : 'line'}></div>
          <div className={isMenuOpen ? 'line line-open' : 'line'}></div>
        </div>
        {isMenuOpen && (
          <ul ref={menuRef} className="navbar-links show">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/vendedores">Vendedores</Link>
            </li>
            <li>
              <Link to="/products-unlocked">Productos</Link>
            </li>
            {!isUserLoggedIn && (
              <li>
                <Link to="/registro-login">Registro-Ingreso</Link>
              </li>
            )}
            {/* <li>
              <Link to="/publicidad">Publicite</Link>
            </li> */}
            <li>
              <Link to="/recomendaciones">Recomendaciones</Link>
            </li>
            {isUserLoggedIn && (
              <li>
                <Link to={`/panelControl`}>Panel-Control</Link>
              </li>
            )}
          </ul>
        )}
      </div>
      <div className="navbar-center">
        <h1 className="navbar-title">EcoGarage</h1>
      </div>
      <div className="navbar-right">
        <div className="navbar-logo">
          <img src={Logo} alt="Logo" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;


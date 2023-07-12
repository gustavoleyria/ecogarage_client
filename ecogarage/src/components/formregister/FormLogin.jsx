import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import '../../styles/form/Login.css';
const URLUSLU = process.env.REACT_APP_URLUSLU;
const URLUSRCPS = process.env.REACT_APP_URLUSRCPS;

const FormLogin = () => {
  //const { setIsUserLoggedIn } = useContext(UserContext); // Obtener el estado del usuario del contexto
  const {  setIsUserLoggedIn, setToken, setUserId  } = useContext(UserContext); // Obtener la función para actualizar el usuario del contexto
  const navigate = useNavigate(); // Obtener la función de navegación

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URLUSLU}`, {
        email,
        password,
      });

      console.log('Inicio de sesión exitoso:', response.data.message);
      console.log(response);
      const { token, id } = response.data; // Obtener el token y el ID de usuario de la respuesta
      setIsUserLoggedIn(true); // Establecer el estado del usuario como registrado
      setToken(token); // Actualizar el token en el contexto
      setUserId(id); // Actualizar el ID de usuario en el contexto
      
      // Resto del código...
      navigate('/products-unlocked');
      console.log('Estado isUserLoggedIn actualizado a true');
      console.log(id);
    } catch (error) {
      console.log('Error al iniciar sesión:', error);
      setError(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  const isEmailValid = (email) => {
    // Expresión regular para validar el formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const resetPassword = async (e) => {
    e.preventDefault();

    try {
      if(!email){
        return alert("Por favor llenar la casilla de email")
      }
      const mail = isEmailValid(email);
      if(!mail){
        return alert("No es una dirección de mail")
      }
      console.log(email)
      const response = await axios.put(`${URLUSRCPS}`, {
        email
      });

      console.log('Inicio de sesión exitoso:', response.data.message);
      console.log(response);
      
      // Resto del código...
      return alert(response.data.message)
    } catch (error) {
      console.log('Error al resetear password', error);
      alert(error.response.data.error);
    }
  };

  

  if (error) {
    alert(error);
  }

  return (
    <div className="login-form-container">
      <h2>Formulario de Inicio de Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label>Email:</label>
          <input
            className="login-form-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form-group">
          <label>Contraseña:</label>
          <input
            className="login-form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-form-button" type="submit">Iniciar Sesión</button>
        
      </form>
      <button className="login-form-buttonReset" onClick={resetPassword}>¿Olvidé Contraseña?</button>
    </div>
  );
};

export default FormLogin;

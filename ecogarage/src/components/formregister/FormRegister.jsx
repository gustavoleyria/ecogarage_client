import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../utils/UserContext';
import '../../styles/form/Register.css';
const URLUSRE = process.env.REACT_APP_URLUSRE;

const FormRegister = () => {
  const { setIsUserLoggedIn, setToken, setUserId  } = useContext(UserContext); // Obtener el estado del usuario del contexto
  const navigate = useNavigate(); // Obtener la función de navegación

  const [email, setEmail] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URLUSRE}`, {
        email,
        cellphone,
        password,
      });

      console.log('Usuario registrado correctamente:', response.data.message);
      const { token, userId } = response.data; // Obtener el token y el ID de usuario de la respuesta
      setIsUserLoggedIn(true); // Establecer el estado del usuario como registrado
      setToken(token); // Actualizar el token en el contexto
      setUserId(userId); // Actualizar el ID de usuario en el contexto
      // Redireccionar al usuario a la ruta "/recomendaciones"
      navigate('/recomendaciones');
      console.log('Estado isUserLoggedIn actualizado a true');
    } catch (error) {
      console.log('Error al registrar el usuario:', error.message);
      // Mostrar el mensaje de error en un alert
      setError(error.response.data.message);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="registro-formulario-contenedor">
      <h2>Formulario de Registro</h2>
      <form onSubmit={handleSubmit}>
        <div className="registro-formulario-grupo">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder='Ej: tucorreo@yo.com.ar'
            className="registro-formulario-input"
          />
        </div>
        <div className="registro-formulario-grupo">
          <label>Celular:</label>
          <input
            type="text"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            required
            placeholder='Ej: +549388xxxxxxx'
            className="registro-formulario-input"
          />
        </div>
        <div className="registro-formulario-grupo">
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder='min 5 max 10 num && a && A'
            className="registro-formulario-input"
          />
        </div>
        <button type="submit" className="registro-formulario-boton">Registrarse</button>
      </form>
    </div>
  );
};

export default FormRegister;

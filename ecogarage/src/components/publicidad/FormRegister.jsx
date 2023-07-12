import React, { useState } from "react";
import axios from "axios";
import '../../styles/publicidad/formRegister.css'; // Asegúrate de ajustar la ruta del archivo CSS

const URLADCSP = process.env.REACT_APP_URLADCSP;

const FormRegister = () => {
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [email, setEmail] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URLADCSP}`,
        {
          title,
          link,
          sponsor,
          email,
          cellphone,
          password,
        }
      );
      console.log(response.data);
      setSuccessMessage("Advertisement registered successfully");
      clearForm();
      setError("");
      setShowForm(false); // Oculta el formulario en caso de éxito
      alert("Advertisement registered successfully"); // Muestra el mensaje de éxito como un alert
    } catch (error) {
      console.error("Error:", error.response.data);
      setError(error.response.data.error);
      setSuccessMessage("");
      alert(error.response.data.error); // Muestra el mensaje de error como un alert
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const clearForm = () => {
    setTitle("");
    setLink("");
    setSponsor("");
    setEmail("");
    setCellphone("");
    setPassword("");
  };

  return (
    <div className="form-container-publi">
      <button onClick={toggleForm}>Registrar Sponsor</button>
      {showForm && (
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title">Título:</label>
          <input
            type="text"
            id="title"
            placeholder="Escribe el Título de tu video ej: Mi Video"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <label htmlFor="link">Enlace:</label>
          <input
            type="text"
            id="link"
            placeholder="Coloca el link de tu video ej: https://www.youtube.com/watch?v=S_oLr_np4S8"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <label htmlFor="sponsor">Patrocinador:</label>
          <input
            type="text"
            id="sponsor"
            placeholder="Coloca el nombre de tu marca ej: Mi Marca"
            value={sponsor}
            onChange={(e) => setSponsor(e.target.value)}
          />

          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            placeholder="Escribe tu mail ej: yo@yo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="cellphone">Celular:</label>
          <input
            type="tel"
            id="cellphone"
            placeholder="Coloca tu celular ej: +5495555555555"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
          />

          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            placeholder="Escribe tu contraseña mínimo 5 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Registrar</button>
        </form>
      )}
    </div>
  );
};

export default FormRegister;


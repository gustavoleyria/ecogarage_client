import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utils/UserContext";
import "../../styles/controlpanel/UserControl.css";

const URLUSRPBU = process.env.REACT_APP_URLUSRPBU;
const URLUSUCPN = process.env.REACT_APP_URLUSUCPN;
const URLUSUAVT = process.env.REACT_APP_URLUSUAVT;

const UserControl = () => {
  const { token } = useContext(UserContext);
  const [newPassword, setNewPassword] = useState("");
  const [newCellphone, setNewCellphone] = useState("");
  const [newImage, setNewImage] = useState(null);

  const handleResetPassword = async () => {
    try {
      const config = {
        headers: {
          Authorization: token
        }
      };

      const data = {
        password: newPassword
      };

      const response = await axios.put(`${URLUSRPBU}`, data, config);
      console.log(response.data);

      setNewPassword("");
      alert("Password actualizada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateCellphone = async () => {
    try {
      const config = {
        headers: {
          Authorization: token
        }
      };

      const data = {
        cellphone: newCellphone
      };

      const response = await axios.put(`${URLUSUCPN}`, data, config);
      console.log(response.data);

      setNewCellphone("");
      alert(response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateImage = async () => {
    try {
      const config = {
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      };

      const formData = new FormData();
      formData.append("file0", newImage);

      const response = await axios.put(`${URLUSUAVT}`, formData, config);
      console.log(response.data);

      setNewImage("");
      alert("Imagen de avatar actualizada correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleCellphoneChange = (e) => {
    setNewCellphone(e.target.value);
  };

  const handleImageChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  return (
    <div className="userControl">
      <Link to={`/panelControl`}>
        <button className="userControl-button">Panel de Control</button>
      </Link>
      <h2>Control de Usuario</h2>
      <div className="userControl-form">
        <h3>Cambiar Contraseña</h3>
        <input type="password" value={newPassword} onChange={handlePasswordChange} />
        <button onClick={handleResetPassword}>Cambiar Contraseña</button>
      </div>
      <div className="userControl-form">
        <h3>Cambiar Celular</h3>
        <input type="text" value={newCellphone} onChange={handleCellphoneChange} />
        <button onClick={handleUpdateCellphone}>Actualizar Celular</button>
      </div>
      <div className="userControl-form">
        <h3>Cambiar Imagen de Perfil</h3>
        <input type="file" name="file0" onChange={handleImageChange} />
        <button onClick={handleUpdateImage}>Actualizar Imagen</button>
      </div>
    </div>
  );
};

export default UserControl;


import React, { useContext, useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../components/utils/UserContext";
import axios from "axios";
import '../styles/controlpanel/PanelControl.css';

const URLUSGUI = process.env.REACT_APP_URLUSGUI;
const URLPRGPR = process.env.REACT_APP_URLPRGPR;
const URLCOMLCO = process.env.REACT_APP_URLCOMLCO;
const URLCONLCO = process.env.REACT_APP_URLCONLCO;
const URLUSGUIM = process.env.REACT_APP_URLUSGUIM;

const PanelControl = () => {
  const { isUserLoggedIn, userId, token } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [productCount, setProductCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [consultCount, setConsultCount] = useState(0);
  const [productConsultCount, setProductConsultCount] = useState(0);
  const [userImage, setUserImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener datos del usuario
        const userResponse = await axios.get(`${URLUSGUI}${userId}`);
        console.log(userResponse)
        setUserData(userResponse.data.user);

        // Obtener productos
        const productsResponse = await axios.get(`${URLPRGPR}`);
        console.log(productsResponse.data.data.products)
        const filteredProducts = productsResponse.data.data.products.filter((product) => product.userId === userId);
        setProductCount(filteredProducts.length);

        // Obtener comentarios realizados
        const commentsResponse = await axios.get(`${URLCOMLCO}`);
        console.log(commentsResponse.data.comments)
        const userComments = commentsResponse.data.comments.filter((comment) => comment.authorId === userId);
        setCommentCount(userComments.length);

        // Obtener comentarios recibidos
        const receivedComments = commentsResponse.data.comments.filter((comment) => comment.recipientId === userId);
        setConsultCount(receivedComments.length);

        // Obtener consultas realizadas
        const consultsResponse = await axios.get(`${URLCONLCO}`, {
          headers: {
            Authorization: token,
          },
        });
        console.log(consultsResponse.data.consults)
        const userConsults = consultsResponse.data.consults.filter((consult) => consult.authorId === userId);
        setConsultCount(userConsults.length);

        // Contar consultas recibidas por producto
        console.log(filteredProducts)
        console.log(consultsResponse)
        const productConsults = consultsResponse.data.consults.filter((consult) =>
          filteredProducts.some((product) => product._id === consult.productId)
        );
        setProductConsultCount(productConsults.length);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUserImage = async () => {
      try {
        const response = await axios.get(`${URLUSGUIM}${userId}`, {
          responseType: "blob",
        });
        setUserImage(URL.createObjectURL(response.data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
    fetchUserImage();
  }, [userId, token]);

  if (!isUserLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="generalPanel-container">
      <Link to={`/panelControl/${userId}`}>
        <button className="generalPanel-button">Panel de Productos</button>
      </Link>
      <Link to={`/userControl/${userId}`}>
        <button className="generalPanel-button">Panel de Usuario</button>
      </Link>

      {userData && (
        <div className="generalPanel-userData up">
          <h2>Datos de usuario:</h2>
          <p className="generalPanel-data">Email: {userData.email}</p>
          <p className="generalPanel-data">Celular: {userData.cellphone}</p>
          <p className="generalPanel-data">Fecha de alta: {userData.created_at}</p>
          <img src={userImage} alt="Avatar" />      
        </div>
      )}

      <h2 className="generalPanel-userData">Productos:</h2>
      <p className="generalPanel-data">Cantidad de productos: {productCount}</p>

      <h2 className="generalPanel-userData">Comentarios:</h2>
      <p className="generalPanel-data">Cantidad de comentarios realizados: {commentCount}</p>
      <p className="generalPanel-data">Cantidad de comentarios recibidos: {consultCount}</p>

      <h2 className="generalPanel-userData">Consultas:</h2>
      <p className="generalPanel-data">Cantidad de consultas realizadas: {consultCount}</p>
      <p className="generalPanel-data">Cantidad de consultas recibidas en productos propios: {productConsultCount}</p>
    </div>
  );
};

export default PanelControl;



